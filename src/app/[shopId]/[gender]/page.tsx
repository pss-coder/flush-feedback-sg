import FeedbackButtons from "@/components/FeedbackButtons";
import { createClient } from "../../../../utils/supabase/server";
import { getShop } from "../../../../lib/shop/shopManager";

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