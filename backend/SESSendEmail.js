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
        Source: process.env.SENDER_EMAIL,
        Template: templateName,
        TemplateData: templateData
    };

    try {
        // Split the to string by commas to get an array of email addresses
        const toAddresses = to.split(',').map(email => email.trim());
        
        // Iterate over each email address and send the email individually
        for (const email of toAddresses) {
            const emailParams = {
                ...params,
                Destination: {
                    ToAddresses: [email]
                }
            };

            const response = await ses.send(new SendTemplatedEmailCommand(emailParams));
            console.log('Email sent to', email, ':', response);
        }
    } catch (error) {
        console.error('Error sending email to', to, ':', error.message);
        throw error; 
    }
}

module.exports = { sendEmail }; 