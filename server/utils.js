const mysql = require('mysql2');
const Config = require("./DBconfig")
const AWS = require('aws-sdk');
const { promisify } = require('util');

const mysqlPool = mysql.createPool(Config);

const syncQuery = promisify(mysqlPool.query).bind(mysqlPool);

AWS.config.update({
    region: 'ap-south-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const ses = new AWS.SES({
    apiVersion: '2010-12-01',
});

const sendMail = (recipent, subject, text) => {
    const params = {
        Destination: {
            ToAddresses: [recipent]
        },
        Message: {
            Body: {
                Text: {
                    Data: text
                }
            },
            Subject: {
                Data: subject
            }
        },
        Source: 'sdnedake@gmail.com'
    };

    ses.sendEmail(params, (err, data) => {
        if (err) {
            console.error('Error sending email:', err);
        }
    });
}

const generateRSVPUrls = (eventid, guestid) => {
    return "\n\nAccept Invitation: " + process.env.UI_URL + "/_api/events/rsvp/" + eventid + "/" + guestid + "/1" + "\n" +
        "Decline Invitation: " + process.env.UI_URL + "/_api/events/rsvp/" + eventid + "/" + guestid + "/2";
}

module.exports = {
    mysqlPool,
    syncQuery,
    sendMail,
    generateRSVPUrls
};