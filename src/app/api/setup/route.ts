import { redirect } from 'next/navigation'
import { headers } from 'next/headers';
import { createClient } from '../../../../utils/supabase/server';
import { addShop, Shop } from '../../../../lib/shop/shopManager';
import { getLocale } from 'next-intl/server';

export const dynamic = 'force-dynamic' // defaults to auto

export async function POST(req: Request) {
    const formData = await req.formData()

    // Extract Form data
    const name = formData.get('name') as string
    const address = formData.get('street-address') as string
    const contact = '00000000'
    //formData.get("contact") as string


    const latitude = formData.get("latitude") as string
    const longitude = formData.get("longitude") as string

    console.log(name, address, contact, latitude, longitude)

    const shop: Shop = {name, contact: Number(contact), address: address, latitude: Number(latitude), longitude: Number(longitude)}

    // Add to DB
    const supabase = createClient();
    const {data, error} = await addShop(supabase, shop)

    if (error) { 
      // do something 
      console.log(error)
      return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }

    console.log("shop inserted success")
    const shopId = data![0].id

    const {searchParams} = new URL(req.url);
    const locale = searchParams.get('locale');
    console.log(locale)

    // pass shop id for confirmation
    redirect(`/${locale}/feedback/${shopId}`)
    
  }