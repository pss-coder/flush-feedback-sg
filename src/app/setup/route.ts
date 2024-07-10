import { redirect } from 'next/navigation'

import { headers } from 'next/headers';

import { createClient } from '../../../utils/supabase/server'
import { Shop, addShop } from '../../../lib/shop/shopManager'
//import { sendviaTwilio } from '../../../lib/twilio/messeger'


export const dynamic = 'force-dynamic' // defaults to auto


export async function POST(req: Request) {
    const formData = await req.formData()

    // Extract Form data
    const name = formData.get('name') as string
    const address = formData.get('street-address') as string
    //const postal = formData.get('postal')//get address property
    const contact = formData.get("contact") as string

    const latitude = formData.get("latitude") as string
    const longitude = formData.get("longitude") as string

    console.log(name, address, contact, latitude, longitude)

    const shop: Shop = {name, contact: Number(contact), address: address, latitude: Number(latitude), longitude: Number(longitude)}

    // Add to DB
    const supabase = createClient();
    const {data, error} = await addShop(supabase, shop)
    // console.log(shop)

    if (error) { 
      // do something 
      console.log(error)
      return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }

    console.log("shop inserted success")
    const shopId = data![0].id

    const headersList = headers();
  
  //headersList.get('host'); // to get domain
  //headersList.get('next-url'); // to get url
    //console.log(headersList.get('host'))
    //console.log(headersList.get('next-url'))

    // send SMS
    // sendviaTwilio(`Welcome ${data![0].name}! Your shop toilet monitoring system has been setup! Feedback link:
    // http://${headersList.get('host')}/${shopId}

    // Opt our of SMS alerts by messaging UNSUBSCRIBE
    // `, contact)

    // pass shop id for confirmation
    redirect(`/setupconfirmation/${shopId}`)
    
  }