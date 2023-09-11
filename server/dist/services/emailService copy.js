"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
// Importe a API do Mailjet
const Mailjet = require("node-mailjet");
const API_KEY = process.env.EMAIL_API_KEY;
const API_KEY_SECRET = process.env.EMAIL_KEY_SECRET;
console.log(API_KEY);
console.log(typeof API_KEY);
console.log(API_KEY_SECRET);
console.log(typeof API_KEY_SECRET);
// Crie uma instância da API
const client = new Mailjet({
    apiKey: API_KEY,
    apiSecret: API_KEY_SECRET,
});
const sendEmail = (emailProps) => {
    const request = client.post("send", { version: "v3.1" });
    console.log(emailProps);
    const nome = emailProps.nome;
    const email = emailProps.email;
    const assunto = emailProps.assunto;
    const mensagem = emailProps.mensagem;
    // Crie um objeto e-mail
    const emailObject = {
        From: {
            Email: "andrey.panegalli@gmail.com",
            Name: "Andrey Panegalli",
        },
        To: [
            {
                Email: "andreigd20@gmail.com",
                Name: "Recipient Name",
            },
        ],
        Subject: "This is a test email",
        TextPart: "This is the body of the email",
        HTMLPart: "<h3>This is the HTML body of the email</h3>",
    };
    request
        .request(emailObject)
        .then((response) => {
        console.log(response.body);
        return response.statusCode;
    })
        .catch((err) => {
        console.log(err.statusCode);
        return err.statusCode;
    });
};
exports.sendEmail = sendEmail;
