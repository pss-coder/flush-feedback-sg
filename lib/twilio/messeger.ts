import twilio from 'twilio';


const client = twilio(
    process.env.TWILLIO_ACCOUNT_SID!, 
    process.env.TWILLIO_AUTH_TOKEN!
);

export function sendviaTwilio(message: string, sgNumber: string) {
    client.messages
    .create({
        from: '+14706643694', // Twilio number
        body: message,
        to: `+65${sgNumber}`
    })
    .then(message => console.log(message.sid))
    .catch((error) => {
        console.log(error);
      });
    // .done();
}