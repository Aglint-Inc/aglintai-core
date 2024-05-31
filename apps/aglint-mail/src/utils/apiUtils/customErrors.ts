export class MailArgValidationError extends Error{
    constructor(message:string){
        super(message);
        this.name = 'MailArgValidationError'; 
    }
}



export class MailSenderError extends Error{
    constructor(message:string){
        super(message);
        this.name = 'MailSenderError'; 
    }
}


export class ClientError extends Error{
    public status;
    constructor(message:string, status:number){
        super(message);
        this.name = 'ClientError'; 
        this.status = status;
    }
}


export class ServerError extends Error{
    public status;
    constructor(message:string, status:number){
        super(message);
        this.name = 'ServerError'; 
        this.status = status;
    }
}
