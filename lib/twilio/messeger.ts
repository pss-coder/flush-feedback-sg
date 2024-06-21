import twilio from 'twilio';


const client = twilio(
    process.env.TWILLIO_ACCOUNT_SID!, 
    process.env.TWILLIO_AUTH_TOKEN!
);

export function sendviaTwilio(message: string, sgNumber: string) {
    client.messages
    .create({
        from: '+12036978715', // Twilio number
        body: message,
        to: `+6580336612`
        // to: `+65${sgNumber}`
        // 80336612
    })
    .then(message => {
        console.log("SMS sent")
        console.log(message.sid)
    })
    .catch((error) => {
        console.log(error);
      });
    // .done();
}