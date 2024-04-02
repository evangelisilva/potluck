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
    <p>You are cordially invited to join us for a delightful <b>{{name}}</b> hosted by {{host}}! We're gathering friends and family for a wonderful time filled with good food, great company, and memorable moments.</p>
    <p><strong>Event Details</strong>
        <ul>
        <li><strong>Date:</strong> {{date}}</li>
        <li><strong>Time:</strong> {{startTime}} - {{endTime}}</li>
        <li><strong>Location:</strong> {{streetAddress1}}, {{city}}, {{state}}, {{zipCode}}</li>
        </ul>
    </p>
    Your comfort and satisfaction are of utmost importance to us. If you have any dietary restrictions or special requests, please inform us when you RSVP or sign up to bring a dish, and we'll gladly accommodate your needs.</p>
    <p>We're excited to share this wonderful occasion with you, filled with laughter, joy, and culinary delights. Should you have any queries or require further information, please don't hesitate to reach out.</p>
    <p>Thank you!</p>
    <p style="text-align: center;"><a href="{{rsvpLink}}" style="background-color: #E8843C; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">RSVP Now</a></p>
`;



createTemplate('ICSI518-Potluck-InvitationTemplate', 'You\'re Invited to a Potluck Party!', emailHTML);