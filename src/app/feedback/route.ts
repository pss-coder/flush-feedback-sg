import { redirect } from 'next/navigation'
import { createClient } from '../../../utils/supabase/server'
import { Feedback, addFeedback } from '../../../lib/feedback/feedbackManager'
import { sendviaTwilio } from '../../../lib/twilio/messeger'


export const dynamic = 'force-dynamic' // defaults to auto


export async function POST(req: Request) {
  // Get feedback data
  const res = await req.json()
  console.log(res)

  const feedbacks = res.feedback
  const shopId = res.shopid

  console.log(feedbacks)

  const feedback: Feedback = {
    shop_id: shopId,
    gender: 'male', // TODO
    
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
  }

  console.log("feedback inserted success")

  // send SMS
  // send SMS
  sendviaTwilio(`Hi! Toilet Feedback was just sent.
  
  Opt our of SMS alerts by messaging UNSUBSCRIBE
  `)

  // send success response
  return new Response('Success!', { status: 200})

  }