function getEmailHTML(authCode, userName) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Recuperação de Senha</title>
      </head>
      <body>
        <h1>Recuperação de Senha</h1>
        <p>Olá, ${userName}</p>
        <p>
          Você solicitou a recuperação de senha. Use o seguinte código para alterar
          sua senha:
        </p>
        <h2>${authCode}</h2>
        <p>
          Se você não solicitou esta recuperação de senha, pode ignorar este e-mail.
        </p>
        <p>Atenciosamente,</p>
        <p>Sua equipe</p>
      </body>
    </html>
  `;
}

module.exports = getEmailHTML;
