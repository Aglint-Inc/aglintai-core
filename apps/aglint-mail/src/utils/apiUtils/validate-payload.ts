import { MailArgValidationError, ServerError } from "./customErrors";


// simple top level 2 objects comparision
export const validatePayload = (prev:any, reqPayload:any)=>{
    if(!prev)  throw new ServerError("email template type is not exported",500);
    if(!reqPayload || typeof reqPayload !== 'object'){
        throw new MailArgValidationError(`payload empty, payload should be of type ${JSON.stringify(prev)}`)
    };

    const keys = Object.keys(prev);
    for(const key of keys){
        if(!(key in reqPayload)){
            throw new MailArgValidationError(`attribute ${key} not found in payload, payload should be of type ${JSON.stringify(prev)}`)
        }
    }

    
}