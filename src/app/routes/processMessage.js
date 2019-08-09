const fetch = require('node-fetch');

const projectId = 'chatbot-clfetc';
const sessionId = '123456';
const languageCode = 'en-US';

const dialogflow = require('dialogflow');

const config = {
    credentials: {
        private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
        client_email: process.env.DIALOGFLOW_CLIENT_EMAIL
    }
};

const sessionClient = new dialogflow.SessionsClient(config);

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const { FACEBOOK_ACCESS_TOKEN } = process.env;

const sendTextMessage = (userId, text) => {
    return fetch(
        `https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                messaging_type: 'RESPONSE',
                recipient: {
                    id: userId,
                },
                message: {
                    text,
                },
            }),
        }
    );
}

var processMessage = (event) => {
    
    console.log('process message funcion')
    const userId = event.sender.id;
    const message = event.message.text;

    // //send greating
    // try {
    //     sendTextMessage(userId,'Chào bạn, Cường có thể giúp gì cho bạn ko ạ <3')
    // } catch (er) {
    //     console.log(er)
    // }
    

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: languageCode,
            },
        },
    };

    sessionClient
        .detectIntent(request)
        .then(responses => {
            const result = responses[0].queryResult;
            return sendTextMessage(userId, result.fulfillmentText);
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
}

module.exports = processMessage;