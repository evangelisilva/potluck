const { SESClient, CreateTemplateCommand } = require('@aws-sdk/client-ses');
require('dotenv').config();

const ses = new SESClient({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
    region: process.env.REGION
});

const createTemplate = async (name, subject, htmlMessage) => {
    const params = {
        Template: {
            TemplateName: name,
            SubjectPart: subject,
            HtmlPart: htmlMessage 
        }
    };

    try {
        const response = await ses.send(new CreateTemplateCommand(params));
        console.log('Template created:', response);
    } catch (error) {
        console.error('Error creating template:', error);
    }
}

const emailHTML = `
    <p>Hello,</p>
    <p>We regret to inform you that the upcoming potluck event, <b>{{name}}</b>, hosted by {{host}}, has been <u>canceled</u>. We understand the inconvenience this may cause and sincerely apologize for any disruption to your plans.</p>
    <p>We appreciate your understanding and cooperation in this matter. Your support is invaluable to us, and we want to express our gratitude for your enthusiasm and participation in our potluck community.</p>
    <p>Once again, we apologize for any inconvenience caused and thank you for your understanding.</p>
    <p>Best regards,</p>
    <p>{{host}}<br>
`;

createTemplate('ICSI518-Potluck-CancelEventTemplate', 'Potluck Event Cancellation Notification', emailHTML);