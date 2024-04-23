const { SESClient, SendTemplatedEmailCommand } = require('@aws-sdk/client-ses');
const AWS = require('aws-sdk');
const nodeMailer = require('nodemailer');

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

const sendEmail1 = async (to, templateName, templateData) => {

  const html = `<div>Hello World!!!</div>`

  const transporter = nodeMailer.createTransport({
    host: "email-smtp.eu-north-1.amazonaws.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "AKIA47CR2VDM5QQWFYKT",
      pass: "BCwL1qqU3pq17FHP9T/TIxpsUZqrecSWDzBbUoFi6uCB",
    },
  });
  
  const mailOptions = ({
      from: '', // sender address
      to: to, // list of receivers
      subject: templateName, // Subject line
      text: templateName, // plain text body
      html: templateData, // html body
  })

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.log('Error occurred: ' + error.message);
        return error
    } else {
        console.log('Email sent: ' + info.response);
        return info.response
    }
  })
}

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

module.exports = { sendEmail, sendEmail1 }; 
