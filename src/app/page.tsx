import { headers } from "next/headers";

import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import { SecondaryFeatures } from "@/components/SecondaryFeatures";
import SetupForm from "@/components/SetupForm";
import { createClient } from "../../utils/supabase/client";
import { doesShopNameExist } from "../../lib/shop/shopManager";

export default function Home() {

  const headersList = headers();
  const host = headersList.get('host') as string

  console.log(host)


  return (
   <>
    <Hero url={host} />
    {/* <Features /> */}
    <SecondaryFeatures />
    {/* <div id='setup' className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <SetupForm />
    </div> */}
    <Contact />
   </>
  );
}
