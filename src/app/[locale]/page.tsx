import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SetupForm from "@/components/Setup/SetupForm";
import { headers } from "next/headers";

export default function Home() {

  const headersList = headers();
  const host = headersList.get('host') as string

  return (
    <>
        <Hero url={host} />
        <Features />
        <SetupForm />
        <Footer />
    </>
  );
}
