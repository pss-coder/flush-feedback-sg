import { createClient } from "../../../../utils/supabase/client";
import { ShopDB, getShop } from "../../../../lib/shop/shopManager";
import QRURLClipboard from "@/components/QRURLClipboard";
import { headers } from "next/headers";

  
export default async function Page({
  params,
}: {
  params: { shopId: string}
}) {

  const { shopId } = params

  // get Shop Data
  // get shop by Shop ID
  const supabase = createClient();
  const {data, error} = await getShop(supabase, Number(shopId)) as any

  const headersList = headers();
  const host = headersList.get('host') as string
  
  // if (error) { return <>Error</>}

  return (
    <QRURLClipboard url={host} shop={data} />
  );
    
    
}