"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailFormContato = void 0;
// Importe a API do Mailjet
const nodeMailer = require("nodemailer");
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
const sendEmailFormContatoGreats = async (emailProps) => {
    console.log(emailProps);
    const nome = emailProps.nome;
    const email = emailProps.email;
    const assunto = emailProps.assunto;
    const mensagem = emailProps.mensagem;
    const mensagemEmail = `<h1>Olá ${nome}</h1>
    <p>Agradeço o contato. Entrarei em contato o mais breve possível no e-mail que você anexou no formulário.</p>
    <p>Até mais</p>
    <p>Atenciosamente,<br />
    Andrey Panegalli</p>`;
    // Crie um objeto e-mail
    const emailObject = {
        from: "Andrey Panegalli Site - <andrey.panegalli@gmail.com>",
        to: email,
        subject: "Agradeço o contato, entrarei em contato o mais breve possível",
        html: mensagemEmail,
        text: `Olá ${nome}, agradeço o contato. \n\n Entrarei em contato o mais breve possível no e-mail que você anexou no formulário. Até mais\n\n Atte, \n Andrey Panegalli.`,
    };
    const retorno = await transport
        .sendMail(emailObject)
        .then(() => {
        console.log("deu boa para enviar o e-mail");
    })
        .catch((err) => {
        console.log("erro ao enviaro e-mail", err);
    });
};
const sendEmailFormContato = async (emailProps) => {
    const nome = emailProps.nome;
    const email = emailProps.email;
    const assunto = emailProps.assunto;
    const mensagem = emailProps.mensagem;
    await sendEmailFormContatoGreats(emailProps);
    const mensagemEmail = `<h1>Você tem uma nova mensagem! </h1>
  <p>${nome} quer conversar sobre o seguinte assunto: ${assunto}</p> 
  <p>O e-mail para contato é: ${email}.</p>
  <p>E a mensagem que deixou foi a seguinte: ${mensagem}</p>`;
    // Crie um objeto e-mail
    const emailObject = {
        from: "Andrey Panegalli Site - <andrey.panegalli@gmail.com>",
        to: "andrey.panegalli@gmail.com",
        subject: `Entrar em contato com ${nome}`,
        html: mensagemEmail,
        text: `Você tem uma nova mensagem! \n ${nome} quer conversar sobre o seguinte assunto: ${assunto} \n\n O e-mail para contato é: ${email}. \n\n E a mensagem foi a seguinte: ${mensagem}`,
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
exports.sendEmailFormContato = sendEmailFormContato;
