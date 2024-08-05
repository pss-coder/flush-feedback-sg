import FeedbackButtons from "@/components/Feedback/FeedbackButtons";
import { getShop } from "../../../../../../../lib/shop/shopManager";
import { createClient } from "../../../../../../../utils/supabase/server";

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
    <FeedbackButtons shop={data} genderStr={gender} />
  )

  }