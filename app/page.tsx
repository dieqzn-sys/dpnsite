import { Benefits } from "@/components/Benefits";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { LeadForm } from "@/components/LeadForm";
import { Support } from "@/components/Support";
import { Tariffs } from "@/components/Tariffs";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Tariffs />
        <HowItWorks />
        <LeadForm />
        <FAQ />
        <Support />
      </main>
      <Footer />
    </>
  );
}

