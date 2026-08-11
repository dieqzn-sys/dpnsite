import { Benefits } from "@/components/Benefits";
import { FAQ } from "@/components/FAQ";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { LeadForm } from "@/components/LeadForm";
import { Support } from "@/components/Support";
import { Tariffs } from "@/components/Tariffs";
import { TrustSignals } from "@/components/TrustSignals";
import { WhyDepkov } from "@/components/WhyDepkov";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <HowItWorks />
        <TrustSignals />
        <Tariffs />
        <WhyDepkov />
        <LeadForm />
        <FAQ />
        <Support />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
