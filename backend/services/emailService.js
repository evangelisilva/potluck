const { SESClient, SendTemplatedEmailCommand } = require('@aws-sdk/client-ses');
const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
  });

// const ses = new SESClient({ 
//     credentials: {
//         accessKeyId: process.env.ACCESS_KEY_ID,
//         secretAccessKey: process.env.SECRET_ACCESS_KEY,
//     }, 
//     region: process.env.REGION
// });

const ses = new AWS.SES();

const sendEmail = (to, templateName, templateData) => {
    const params = {
        Source: process.env.SENDER_EMAIL,
        Destination: {
            ToAddresses: [to]
        },
        // Template: templateName,
        // TemplateData: JSON.stringify(templateData),
        Message: {
            Body: {
                Text: {
                  Data: templateName // Plain text body
                }
              },
              Subject: {
                Data: JSON.stringify(templateData) // Email subject
              }
        }
    };

    console.log(params)

    try {
        ses.sendEmail(params, (err, data) => {
            if (err) {
                console.log('Error sending email:', err);
              } else {
                console.log('Email sent successfully:', data);
                return data;
              }
        });
    } catch (error) {
        console.error('Error sending email to', to, ':', error.message);
        throw error; 
    }
}

module.exports = { sendEmail }; 
