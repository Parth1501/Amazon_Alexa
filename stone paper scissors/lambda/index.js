// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const GAME= [
  "stone",
  "paper",
  "scissor"
]
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = "Lets see can you beat me in stone,paper or scissor";
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const letsPlayHandler = {
    canHandle(handlerInput)
    {
        return handlerInput.requestEnvelope.request.type==="IntentRequest"
        && handlerInput.requestEnvelope.request.intent.name==="letsPlay";
    },
    
    handle(handlerInput) {
        let a=handlerInput.requestEnvelope.request.intent.slots.variable.value;
        let b=GAME[Math.floor(Math.random()*(GAME.length))];
        if(a==="stone"||a==="rock")
            a=1;
        if(a==="paper")
            a=2;
        if(a==="scissor")
            a=3;
        if(b==="stone"||a==="rock")
            b=1;
        if(b==="paper")
            b=2;
        if(b==="scissor")
            b=3;  
        if(a===b) {
            let speech="You are copying me, it's a draw ";
            return handlerInput.responseBuilder
            .speak(speech)
            .reprompt(speech)
            .getResponse(); 
        }
        if(a===1) {
            if(b===2) {
            let speech="I played paper, ";
            speech+="Yeah I won";
            return handlerInput.responseBuilder
            .speak(speech)
            .reprompt(speech)
            .getResponse(); 
            }
            else {
             let speech="I played scissor, ";
            speech+="You won";
            return handlerInput.responseBuilder
            .speak(speech)
            .reprompt(speech)
            .getResponse(); 
            }
        }
        else if(a===2) {
            if(b===1) {
                 let speech="I played stone, ";
            speech+="You won";
            return handlerInput.responseBuilder
            .speak(speech)
            .reprompt(speech)
            .getResponse(); 
            }
            else {
                 let speech="I played scissor, ";
            speech+="Yeah I won";
            return handlerInput.responseBuilder
            .speak(speech)
            .reprompt(speech)
            .getResponse(); 
            }
        }
        else if(a===3) {
            if(b===1) {
                let speech="I played stone, ";
            speech+="Yeah I won";
            return handlerInput.responseBuilder
            .speak(speech)
            .reprompt(speech)
            .getResponse(); 
            }
            else {
                 let speech="I played paper, ";
            speech+="you won";
            return handlerInput.responseBuilder
            .speak(speech)
            .reprompt(speech)
            .getResponse(); 
            }
        }
        else {
            let speech="Sorry, I can not get you,Please try again";
            return handlerInput.responseBuilder
            .speak(speech)
            .reprompt(speech)
            .getResponse(); 
        }
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speechText = 'Lets begin!';
        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `Sorry, I couldn't understand what you said. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        letsPlayHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(
        ErrorHandler)
    .lambda();
