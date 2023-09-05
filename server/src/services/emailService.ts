// Importe a API do Mailjet
const Mailjet = require("mailjet");

// Crie uma instância da API
const client = new Mailjet({
  apiKey: "YOUR_API_KEY",
  apiSecret: "YOUR_API_SECRET",
});

export const sendEmail = (nome: string) => {
  // Crie um objeto e-mail
  const email = {
    from: {
      name: "Your Name",
      email: "your@email.com",
    },
    to: [
      {
        name: "Recipient Name",
        email: "recipient@email.com",
      },
    ],
    subject: "This is a test email",
    text: "This is the body of the email",
  };

  // Envie o e-mail
  client
    .sendEmail({
      body: email,
    })
    .then((response) => {
      console.log("E-mail enviado!");
      return "Ok";
    })
    .catch((error) => {
      console.log(error);
      return error;
    });

  return "Error";
};
