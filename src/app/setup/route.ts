import { redirect } from 'next/navigation'
import { createClient } from '../../../utils/supabase/server'
import { Shop, addShop } from '../../../lib/shop/shopManager'
import { sendviaTwilio } from '../../../lib/twilio/messeger'


export const dynamic = 'force-dynamic' // defaults to auto


export async function POST(req: Request) {
    const formData = await req.formData()

    // Extract Form data
    const name = formData.get('name') as string
    const address = formData.get('street-address') as string
    //const postal = formData.get('postal')//get address property
    const contact = formData.get("contact") as string

    //console.log(name, address, contact)

    const shop: Shop = {name, contact: Number(contact), address: address}

    // Add to DB
    const supabase = createClient();
    const {data, error} = await addShop(supabase, shop)
    // console.log(shop)

    if (error) { 
      // do something 
    }

    console.log("shop inserted success")
    const shopId = data![0].id

    // send SMS
    sendviaTwilio(`Welcome ${data![0].name}! Your shop toilet monitoring system has been setup! Feedback link:
    http://www.localhost:3000/${shopId}

    Opt our of SMS alerts by messaging UNSUBSCRIBE
    `)

    // pass shop id for confirmation
    redirect(`/setupconfirmation/${shopId}`)
    
  }