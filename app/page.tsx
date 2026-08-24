import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import ProblemSolution from "./components/ProblemSolution";
import Products from "./components/Products";
import HowItWorks from "./components/HowItWorks";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import FinalCta from "./components/FinalCta";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <ProblemSolution />
      <Products />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <Faq />
      <FinalCta />
    </main>
  );
}
