const ExecuteSql = require("../../models/database");

const ConsultarUsuario = async (idUsuario) => {
  // const idUsuario = idUsuario;

  if (idUsuario === undefined || idUsuario === "") {
    let retorno = {
      status: "Error",
      message: "Id de usuário não existe",
    };
    return retorno;
  }

  const result = await ExecuteSql(
    `select * from usuarios where idUsuario = {idUsuario}`
  );

  if (result) {
    console.log(result, "nao é nulo");
    return result[0];
  }
  return { status: "Error", message: "Erro ferrado " };
};

module.exports = {
  ConsultarUsuario,
};
