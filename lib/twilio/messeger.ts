import twilio from 'twilio';


const client = twilio(
    process.env.TWILLIO_ACCOUNT_SID!, 
    process.env.TWILLIO_AUTH_TOKEN!
);

export function sendviaTwilio(message: string) {
    client.messages
    .create({
        from: '+14706643694',
        body: message,
        to: '+6590622448'
    })
    .then(message => console.log(message.sid))
    .catch((error) => {
        console.log(error);
      });
    // .done();
}