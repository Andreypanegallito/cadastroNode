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

export const sendEmail = (nome: string) => {
  const request = client.post("send", { version: "v3.1" });

  // Crie um objeto e-mail
  const email = {
    From: {
      Email: "your@email.com",
      Name: "Your Name",
    },
    To: [
      {
        Email: "recipient@email.com",
        Name: "Recipient Name",
      },
    ],
    Subject: "This is a test email",
    TextPart: "This is the body of the email",
    HTMLPart: "<h3>This is the HTML body of the email</h3>",
  };

  request
    .request(email)
    .then((response) => {
      console.log(response.body);
      return response.statusCode;
    })
    .catch((err) => {
      console.log(err.statusCode);
      return err.statusCode;
    });

  return 500;
};
