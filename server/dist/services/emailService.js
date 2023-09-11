"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
// Importe a API do Mailjet
const Mailjet = require("node-mailjet");
const nodeMailer = require("nodemailer");
const API_KEY = process.env.EMAIL_API_KEY;
const API_KEY_SECRET = process.env.EMAIL_KEY_SECRET;
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = parseInt(process.env.EMAIL_PORT);
const EMAIL_ISSECURE = process.env.EMAIL_ISSECURE === "true";
const EMAIL_AUTH_USER = process.env.EMAIL_AUTH_USER;
const EMAIL_AUTH_PASS = process.env.EMAIL_AUTH_PASS;
const transport = new nodeMailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_ISSECURE,
    auth: {
        user: EMAIL_AUTH_USER,
        pass: EMAIL_AUTH_PASS,
    },
});
const sendEmail = async (emailProps) => {
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
        html: "<h1>Teste de envio de e-mail com a api nodemailer </h1>",
        text: "Teste de envio de e-mail",
    };
    const retorno = await transport
        .sendMail(emailObject)
        .then(() => {
        console.log("deu boa");
        return "Ok";
    })
        .catch((err) => {
        console.log("erro ao enviaro e-mail", err);
        return "erro";
    });
    return retorno;
};
exports.sendEmail = sendEmail;
