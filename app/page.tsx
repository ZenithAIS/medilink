import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import ProblemSolution from "./components/ProblemSolution";
import Products from "./components/Products";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import Stats from "./components/Stats";
import Commitments from "./components/Commitments";
import Faq from "./components/Faq";
import FinalCta from "./components/FinalCta";
import LatestPosts from "./components/LatestPosts";

export const revalidate = 300;

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <ProblemSolution />
      <Products />
      <Services />
      <HowItWorks />
      <Stats />
      <Commitments />
      <LatestPosts />
      <Faq />
      <FinalCta />
    </main>
  );
}
