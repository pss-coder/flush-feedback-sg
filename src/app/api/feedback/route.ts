import { createClient } from '../../../../utils/supabase/server'
import { addFeedback, Feedback } from '../../../../lib/feedback/feedbackManager'
import { getShop } from '../../../../lib/shop/shopManager'

export const dynamic = 'force-dynamic' // defaults to auto


export async function POST(req: Request) {
  // Get feedback data
  const res = await req.json()
  console.log(res)

  const feedbacks = res.feedback
  const shopId = res.shopid
  const gender = res.gender

  console.log(feedbacks)

  const feedback: Feedback = {
    shop_id: shopId,
    gender: gender,
    
    bin_full: feedbacks.bin_full,
    dirty_basin: feedbacks.dirty_basin,
    dirty_toilet_bowl: feedbacks.dirty_toilet_bowl,
    dirty_mirror: feedbacks.dirty_mirror,
    no_more_soap: feedbacks.no_more_soap,
    no_more_toilet_paper: feedbacks.no_more_toilet_paper,
    toilet_clogged: feedbacks.toilet_clogged,
    wet_dirty_floor: feedbacks.wet_dirty_floor
  } 

  // insert to db
  const supabase = createClient();
  const {data, error} = await addFeedback(supabase, feedback )

  if (error) { 
    // do something
    console.log(error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }

  console.log("feedback inserted success")

  // Get Shop Information
  const shop = await getShop(supabase, shopId) as any
  console.log(shop.data as any)

  // send success response
  return new Response('Success!', { status: 200})

  }
