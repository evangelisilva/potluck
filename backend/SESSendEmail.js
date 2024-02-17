const { SESClient, SendTemplatedEmailCommand } = require('@aws-sdk/client-ses');
require('dotenv').config();

const ses = new SESClient({ 
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    }, 
    region: process.env.REGION
});

const sendEmail = async (to, templateName, templateData) => {
    const params = {
        Destination: {
            ToAddresses: [to]
        },
        Source: process.env.SENDER_EMAIL,
        Template: templateName,
        TemplateData: templateData
    };

    try {
        const response = await ses.send(new SendTemplatedEmailCommand(params));
        console.log('Email sent:', response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; 
    }
}

module.exports = { sendEmail }; 