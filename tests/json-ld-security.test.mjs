// Regression: JSON-LD / inline-link injection (found in the collaborator audit of origin/main f5643ed).
// Runs with `node --test tests/` — TypeScript sources are transpiled in-process (same loader style as the app repo's tests).
import test from 'node:test';
import assert from 'node:assert/strict';
import loose from 'node:assert'; // cross-realm objects (vm context) differ only by Object.prototype identity
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {createRequire} from 'node:module';
import ts from 'typescript';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

const require = createRequire(import.meta.url);
function load(file, dependencies = {}) {
  const m = {exports: {}};
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), {compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022}}).outputText;
  vm.runInNewContext(js, {exports: m.exports, require: (n) => dependencies[n] ?? require(n), URL, console});
  return m.exports;
}

const {serializeJsonLd, jsonLdScriptProps} = load('app/lib/json-ld.ts');
const {pageSchema} = load('app/lib/page-schema.ts', {'./site': {siteUrl: 'https://medilinkapp.online'}});
const {articleSchema, classifyHref, safeImageSrc} = load('app/lib/blog-markup.ts');

const PAYLOAD = '</script><script>alert(document.domain)</script><!--';
const render = (data) => renderToStaticMarkup(React.createElement('script', jsonLdScriptProps(data)));
const count = (s, re) => (s.match(re) || []).length;

function assertSingleInertScript(html, originalData) {
  assert.equal(count(html, /<script/gi), 1, 'exactly one <script> start tag');
  assert.equal(count(html, /<\/script>/gi), 1, 'exactly one </script> end tag');
  assert.ok(html.endsWith('</script>'), 'the only end tag is the last thing in the output');
  const inner = html.slice(html.indexOf('>') + 1, html.lastIndexOf('</script>'));
  assert.ok(!inner.includes('<'), 'no raw "<" inside the script body');
  assert.ok(!/<!--|-->/.test(inner), 'no HTML comment delimiters inside the script body');
  loose.deepEqual(JSON.parse(inner), originalData, 'the escaped JSON still parses back to the exact original value');
}

test('control: plain JSON.stringify IS injectable (proves the regression test is meaningful)', () => {
  const naive = renderToStaticMarkup(React.createElement('script', {type: 'application/ld+json', dangerouslySetInnerHTML: {__html: JSON.stringify({a: PAYLOAD})}}));
  assert.equal(count(naive, /<script/gi), 2, 'the naive serialization lets the payload open a second <script>');
});

test('serializeJsonLd escapes <, >, &, U+2028 and U+2029 and stays valid, lossless JSON', () => {
  const data = {t: PAYLOAD, amp: 'a&b', gt: 'x>y', ls: 'a\u2028b\u2029c', nested: [{k: '<b>'}]};
  const out = serializeJsonLd(data);
  assert.ok(!/[<>&\u2028\u2029]/.test(out));
  loose.deepEqual(JSON.parse(out), data);
  assert.equal(serializeJsonLd(undefined), 'null');
});

test('blog article JSON-LD: malicious title/excerpt/cover/body/FAQ cannot create a second executable script element', () => {
  const post = {
    slug: 'x', title: PAYLOAD, excerpt: 'e ' + PAYLOAD, category: 'c', date: '', readingTime: '',
    cover: 'https://x.test/a.png?q=' + PAYLOAD,
    body: ['## سوالات متداول', '### ' + PAYLOAD + ' ؟', 'پاسخ [لینک](https://a.test/' + encodeURIComponent('x') + ') ' + PAYLOAD + ' **bold**'],
  };
  const schema = articleSchema(post);
  assert.ok(schema['@graph'].some((n) => n['@type'] === 'FAQPage'), 'FAQ extraction still works');
  assertSingleInertScript(render(schema), schema);
});

test('page breadcrumb JSON-LD: an attacker-chosen URL path (reflected) cannot break out of the script', () => {
  for (const p of [
    '/%3C%2Fscript%3E%3Cscript%3Ealert(1)%3C%2Fscript%3E',
    '/blog/%3C%2Fscript%3E%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E',
    '/%E0%A4%A',            // malformed percent-encoding must not throw
    '/constructor/__proto__',
    '/' + '%3C'.repeat(500),
  ]) {
    const schema = pageSchema(p);
    assertSingleInertScript(render(schema), schema);
  }
  const names = pageSchema('/constructor')['@graph'][0].name;
  assert.equal(typeof names, 'string');
});

test('classifyHref / safeImageSrc: only same-site paths and https; everything else is dropped', () => {
  const bad = ['javascript:alert(1)', 'JaVaScRiPt:alert(1)', 'data:text/html,<script>', 'vbscript:x', '//evil.test/x', '/\\evil.test', 'http://medilinkapp.online/x',
    'https://user:pw@medilinkapp.online/x', 'ftp://x.test', '', 'not a url', '/a\u0000b', '/a\\b'];
  for (const href of bad) { assert.equal(classifyHref(href), null, href); assert.equal(safeImageSrc(href), null, href); }
  loose.deepEqual(classifyHref('/blog/x'), {local: true, href: '/blog/x'});
  loose.deepEqual(classifyHref('https://medilinkapp.online/blog/x?y=1#z'), {local: true, href: '/blog/x?y=1#z'});
  loose.deepEqual(classifyHref('https://medilinkapp.online'), {local: true, href: '/'});
  assert.equal(classifyHref('https://medilinkapp.online.evil.test/x').local, false, 'look-alike host is NOT treated as the site');
  assert.equal(classifyHref('https://example.org/a b'.replace(' ', '%20')).local, false);
  assert.equal(safeImageSrc('/blog-images/a.webp'), '/blog-images/a.webp');
});

test('source guard: no component may feed raw JSON.stringify to dangerouslySetInnerHTML; only json-ld.ts and the constant GTM snippet use it', () => {
  const files = [];
  (function walk(dir) { for (const e of fs.readdirSync(dir, {withFileTypes: true})) { const p = path.join(dir, e.name); if (e.isDirectory()) walk(p); else if (/\.(tsx?|jsx?)$/.test(e.name)) files.push(p); } })('app');
  const users = [];
  for (const f of files) {
    const src = fs.readFileSync(f, 'utf8');
    if (!src.includes('dangerouslySetInnerHTML')) continue;
    users.push(f.replace(/\\/g, '/'));
    assert.ok(!/dangerouslySetInnerHTML\s*=\s*\{\{[^}]*JSON\.stringify/.test(src), `${f}: raw JSON.stringify inside dangerouslySetInnerHTML`);
  }
  loose.deepEqual(users.sort(), ['app/layout.tsx', 'app/lib/json-ld.ts']);
  const layout = fs.readFileSync('app/layout.tsx', 'utf8');
  assert.equal(count(layout, /dangerouslySetInnerHTML/g), 1);
  assert.ok(/dangerouslySetInnerHTML=\{\{ __html: GTM_HEAD_SNIPPET \}\}/.test(layout), 'the only remaining use is the constant GTM snippet');
});
