"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
// Importe a API do Mailjet
const Mailjet = require("node-mailjet");
const nodeMailer = require("nodemailer");
const API_KEY = process.env.EMAIL_API_KEY;
const API_KEY_SECRET = process.env.EMAIL_KEY_SECRET;
console.log(API_KEY);
console.log(typeof API_KEY);
console.log(API_KEY_SECRET);
console.log(typeof API_KEY_SECRET);
const transport = new nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "andrey.panegalli@gmail.com",
        pass: "sbzryvqeepusodqj",
    },
});
const sendEmail = (emailProps) => {
    console.log(emailProps);
    const nome = emailProps.nome;
    const email = emailProps.email;
    const assunto = emailProps.assunto;
    const mensagem = emailProps.mensagem;
    // Crie um objeto e-mail
    const emailObject = {
        from: "Andrey Panegalli Site - <andrey.panegalli@gmail.com>",
        to: "andrey.panegalli@gmail.com",
        subject: "Teste de e-mail da api com envio de email nodemailer",
        HTMLPart: "<h1>Teste de envio de e-mail </h1>",
        TextPart: "Teste de envio de e-mail",
    };
    transport.sendMail(emailObject).then(() => {
        console.log(emailObject);
    });
};
exports.sendEmail = sendEmail;
