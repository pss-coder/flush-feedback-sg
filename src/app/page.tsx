import Hero from "@/components/Hero";
import Setup from "@/components/Setup";
import SetupForm from "@/components/SetupForm";

export default function Home() {
  return (
   <>
    <Hero />
    {/* <Setup /> */}
    <div id='setup' className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <SetupForm />
    </div>
   </>
  );
}
