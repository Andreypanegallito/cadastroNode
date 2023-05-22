// import user from "./services/user/user";

const express = require("express");

const PORT = process.env.PORT || 3001;

let user = require("./services/user/user.ts");

const app = express();
app.use(express.json());

app.get("/api", (res) => {
  res.json({ message: "servidor tá on" });
});

app.get("/consultarUsuario", async (req, res) => {
  const idUsuario = req.query.idUsuario;

  const retorno = await user.ConsultarUsuario(idUsuario);
  res.json({ status: "ok", retorno: retorno });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
