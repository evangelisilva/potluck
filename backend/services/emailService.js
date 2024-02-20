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
    console.log(templateData);

    const params = {
        Source: process.env.SENDER_EMAIL,
        Destination: {
            ToAddresses: [to]
        },
        Template: templateName,
        TemplateData: JSON.stringify(templateData),
    };

    try {
        const response = await ses.send(new SendTemplatedEmailCommand(params));
        console.log('Email sent to', to, ':', response);
        return response;
    } catch (error) {
        console.error('Error sending email to', to, ':', error.message);
        throw error; 
    }
}

module.exports = { sendEmail }; 
