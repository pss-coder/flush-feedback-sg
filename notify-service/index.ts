// // Setup type definitions for built-in Supabase Runtime APIs
// import "https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts"
// import * as base64 from "https://denopkg.com/chiefbiiko/base64/mod.ts";
// import { createClient } from "jsr:@supabase/supabase-js@2";

// // Twilio Keys
// const accountSid: string | undefined = Deno.env.get("TWILIO_ACCOUNT_SID");
// const authToken: string | undefined = Deno.env.get("TWILIO_AUTH_TOKEN");

// const sendTextMessage = async (
//   message: string,
//   accountSid: string | undefined,
//   authToken: string | undefined,
//   fromNumber: string,
//   toNumber: string,
// ): Promise<any> => {
//   if (!accountSid || !authToken) {
//     console.log(
//       "Your Twilio account credentials are missing. Please add them.",
//     );
//     return;
//   }
//   const url: string =
//     `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

//   const encodedCredentials: string = base64.fromUint8Array(
//     new TextEncoder().encode(`${accountSid}:${authToken}`),
//   );

//   // BUG: passing message straight to body won't result in message being sent to Whatsapp
//     // WORKAROUND: adding another string variable literal as below
//   // TODO: LEARN WHY ONLY THIS WAY CAM
//   const messageHere = ` ${message} `

//   const body: URLSearchParams = new URLSearchParams({
//     To: "whatsapp:+6590622448",
//     From: "whatsapp:+14155238886",
//     Body: messageHere,
//   });

//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       "Authorization": `Basic ${encodedCredentials}`,
//     },
//     body,
//   });
//   return response.json();
// };

// const getShopName = async (supabase: any, shop_id: any) => {
//   const { data ,error } = await supabase.from('shop').select('name')
//       .eq('id', shop_id)
  
//   // console.log(data[0].name)
//   return data[0]
// }

// const is_third_feedback_added = async (supabase: any, shop_id: any): Promise<any> =>  {

//   // Check how many feedbacks the user has submitted today
//   const today = new Date();
//   today.setHours(0, 0, 0, 0); // Reset the time to midnight for date comparison
//   const today_string = today.toISOString().split('T')[0]
//   try {
//     // query
    
//     const { count ,error } = await supabase.from('feedback').select('*', { count: "exact", head:true })
//       .eq('shop_id', shop_id)
//       .eq('created_date', today_string);

//     console.log(`number of items shop ${shop_id} has recieved of count in total TODAY is: ${count} for : ${JSON.stringify({})}`)
//     //const count = 0;
//     // check if it is every 3rd? - multiples of 3
//     if (count % 3 == 0) {
//     return {is_fifth: true, count}
//     } else {
//     return {is_fifth: false, count}
//     }
//   } catch(err) { // incase of error
//     throw err;
//   }
// }


// const get_ranked_shop_feeback_today = async (supabase: any, shop_id: any) => {
//   // Check how many feedbacks the user has submitted today
//   const today = new Date();
//   today.setHours(0, 0, 0, 0); // Reset the time to midnight for date comparison
//   const today_string = today.toISOString().split('T')[0]

//   try {
//     // Query to count the number of feedbacks per category for the day
//     const { data, error } = await supabase.from('feedback')
//     // retrieve number of counts for each columns 
//     // NOTE: toilet_clogged - REFERING TO flush not working
//     .select(`
//       bin_full,
//       dirty_basin,
//       no_more_soap,
//       no_more_toilet_paper,
//       toilet_clogged,
//       wet_dirty_floor
//       `)
//     .eq('shop_id', shop_id)
//     .eq('created_date', today_string);

//     // console.log(`Getting ranked shop for shop ${shop_id} - ${JSON.stringify(data)}`)

//     if (error) { throw error; }

//     if (data) {

//       // Initialize the count for each feedback item
//     const counts = {
//       bin_full: 0,
//       dirty_basin: 0,
//       no_more_soap: 0,
//       no_more_toilet_paper: 0,
//       toilet_clogged: 0,
//       wet_dirty_floor: 0
//     };

//     // Loop through each feedback object
//     data.forEach(feedback => {
//       // Increment the count if the value is true
//       if (feedback.bin_full) counts.bin_full++;
//       if (feedback.dirty_basin) counts.dirty_basin++;
//       if (feedback.no_more_soap) counts.no_more_soap++;
//       if (feedback.no_more_toilet_paper) counts.no_more_toilet_paper++;
//       if (feedback.toilet_clogged) counts.toilet_clogged++;
//       if (feedback.wet_dirty_floor) counts.wet_dirty_floor++;
//     });

//       // Convert the counts object into an array of [key, value] pairs
//       const sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1]);

//       // String mapping
//       const feedbackMappings: { [key: string]: string } = {
//         bin_full: "Rubbish Bin Full",
//         dirty_basin: "Dirty Sink",
//         no_more_soap: "No More Soap",
//         no_more_toilet_paper: "No More Toilet Paper",
//         toilet_clogged: "Flush Not Working",
//         wet_dirty_floor: "Wet Floor"
//       };

//       // Build the message with the ranked feedback items
//       let message = 'Feedback Ranking from Highest to Lowest:\n';
  
//       sortedCounts.forEach(([feedbackItem, count], index) => {
//         message += `${index + 1}. ${feedbackMappings[feedbackItem]}: ${count}\n`;
//       });

//       return message
//     }

//     return ""

//   } catch(err) {
//     // return new Response(String("get_ranked_shop_feeback_today fn call: " + err?.message ?? err), { status: 500 }) // terminate with error
//     throw err;
//   }
// }

// Deno.serve(async (req) => {
//   // console.log("TURNED OFF")
//   // return new Response(`TURNED OFF`, {
//   //   headers: { 'Content-Type': 'application/json' },
//   //   status: 200,
//   // })

//   const { record } = await req.json()
//   const {shop_id} = record
  
//   try {
//     const supabase = createClient(
//       Deno.env.get('SUPABASE_URL') ?? '',
//       Deno.env.get('SUPABASE_ANON_KEY') ?? '', 
//       { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
//     )

//     // get shop name
//     const {name} = await getShopName(supabase, shop_id)
//     // console.log(name)

//     //check in db whether is this the 5th item added
//     const { is_fifth, count } = await is_third_feedback_added(supabase, shop_id)
//     console.log(is_fifth, count)

//     //TODO: UNCOMMENT ONCE CONFIRMED WITH TEAM
//     // TODO: update variable name, instead pass as variable for the update
//     if( !is_fifth ) { return new Response("OK, not fifth item for shop"), { status: 500 }} // guard case
//     const rankedFeedbackMessage = await get_ranked_shop_feeback_today(supabase, shop_id)

//     // Construct Message
//     let message = `Hi, ${name}.\nYou've received ${count} feedbacks today.\n\n`;
//     message += rankedFeedbackMessage

//     // Create a Date object
//     const date = new Date();

//     // Use Intl.DateTimeFormat to format the date for Singapore (UTC+8)
//     const options: any = {
//         timeZone: 'Asia/Singapore',
//         year: 'numeric',
//         month: '2-digit',
//         day: '2-digit',
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit',
//         hour12: true // 24-hour format
//     };

//     const formatter = new Intl.DateTimeFormat('en-SG', options);
//     const formattedDate = formatter.format(date);
    
//     message += `\n As of ${formattedDate} `

//     const twillio_response = await sendTextMessage(message, accountSid, authToken, "", "")
//     console.log(twillio_response)
    
//   } catch(error) {
//     console.log(error)
//     return new Response(String("Message sent failed: " + error?.message ?? error), { status: 500 })
//   }

//     return new Response(`Whatsapp message sent to shop id: ${shop_id}`, {
//       headers: { 'Content-Type': 'application/json' },
//       status: 200,
//     })

// })


// // TODO: 
// /**
//  - set to 
//  - Reduce calls if possible
//  */


