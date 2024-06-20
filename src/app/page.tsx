import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import { SecondaryFeatures } from "@/components/SecondaryFeatures";
import SetupForm from "@/components/SetupForm";

export default function Home() {
  return (
   <>
    <Hero />
    {/* <Features /> */}
    <SecondaryFeatures />
    {/* <div id='setup' className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <SetupForm />
    </div> */}
    <Contact />
   </>
  );
}
