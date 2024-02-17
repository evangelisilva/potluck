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
    <p>Dear {{invitee}},</p>
    <p>You are cordially invited to join us for a delightful potluck party! We're gathering friends and family for a wonderful time filled with good food, great company, and memorable moments.</p>
    <p><strong>Event Details</strong>
    <ul>
    <li><strong>Date:</strong> {{date}}</li>
    <li><strong>Time:</strong> {{time}}</li>
    <li><strong>Location:</strong> {{address}}</li>
    <li><strong>Theme:</strong> {{theme}}</li>
    </ul></p>
    <p><strong>RSVP</strong><br/>
    We're eagerly anticipating a diverse spread of dishes, ranging from savory appetizers to mouthwatering desserts. Your culinary contribution, whether it be a signature dish or an experimental creation, will surely add to the charm of our potluck. Kindly confirm your attendance and indicate any guests you'll be bringing along by {{rsvpDeadline}}. Click <a href="{{rsvpLink}}">here</a>  to RSVP and let us know what delectable dish you plan to bring.</p>
    <p><strong>Special Requests</strong><br/>
    Your comfort and satisfaction are of utmost importance to us. If you have any dietary restrictions or special requests, please inform us when you RSVP or sign up to bring a dish, and we'll gladly accommodate your needs.</p>
    <p>We're excited to share this wonderful occasion with you, filled with laughter, joy, and culinary delights. Should you have any queries or require further information, please don't hesitate to reach out.</p>
    <p>Warm regards,<br>{{host}}</p>
`;

createTemplate('ICSI518-Potluck-InvitationTemplate', 'You\'re Invited to a Potluck Party!', emailHTML);