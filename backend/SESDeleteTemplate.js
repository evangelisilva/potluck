const { SESClient, DeleteTemplateCommand } = require('@aws-sdk/client-ses');
require('dotenv').config();

const ses = new SESClient({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
    region: process.env.REGION
});

const deleteTemplate = async (templateName) => {
    const params = {
        TemplateName: templateName
    };

    try {
        const response = await ses.send(new DeleteTemplateCommand(params));
        console.log('Template deleted:', response);
        return response; // Optionally return the response for further processing
    } catch (error) {
        console.error('Error deleting template:', error);
        throw error; // Optionally throw the error for handling at a higher level
    }
}

// Example usage:
const templateName = 'ICSI518-Potluck-InvitationTemplate';

deleteTemplate(templateName)
    .then(() => console.log('Email template deleted successfully'))
    .catch(error => console.error('Failed to delete email template:', error));
