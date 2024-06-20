import FeedbackButtons from "@/components/FeedbackButtons";
import { getShop } from "../../../lib/shop/shopManager";
import { createClient } from "../../../utils/supabase/server";

export default async function Page({
  params,
}: {
  params: { shopId: string}
}) {

  const { shopId } = params
  console.log(shopId)

  // get shop by Shop ID
  const supabase = createClient();
  const {data, error} = await getShop(supabase, Number(shopId)) as any

  // pass details to display

  // have male/female toggle

  if (data) {
    
    return (
      <>
      <FeedbackButtons shop={data} />
      </>
    )
  }
}
  