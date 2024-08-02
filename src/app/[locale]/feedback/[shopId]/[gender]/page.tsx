import FeedbackButtons from "@/components/Feedback/FeedbackButtons";
import { createClient } from "../../../../../../utils/supabase/server";
import { getShop } from "../../../../../../lib/shop/shopManager";
import AnimatedFeedbackButtons from "@/components/Feedback/AnimatedFeedbackButtons";

export default async function Page({
    params,
  }: {
    params: { shopId: string, gender: string}
  }) 
  {
    const { shopId, gender } = params

    // get shop by Shop ID
  const supabase = createClient();
  const {data, error} = await getShop(supabase, Number(shopId)) as any


  return (
    <AnimatedFeedbackButtons shop={data} genderStr={gender} />
  )

  }