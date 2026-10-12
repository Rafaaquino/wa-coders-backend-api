// Envia UM e-mail de teste pelo mesmo caminho do formulário do site (SendEmailsController + Resend).
// Uso (PowerShell), com a chave só na sessão do terminal:
//   $env:RESEND_API_KEY="re_xxx"; $env:RESEND_TO="voce@exemplo.com"; node scripts/test-resend.js
// Com domínio verificado: defina também $env:RESEND_FROM="WA Coders <site@wacoders.com>"
// Sem domínio verificado: RESEND_FROM padrão (onboarding@resend.dev) só entrega para o e-mail dono da conta Resend.
const config = require("../src/app/config/config");
const SendEmailsController = require("../src/app/controllers/emails/SendEmailsController");

if (!config.RESEND_API_KEY) {
  console.error("Defina RESEND_API_KEY no ambiente (sem ela o envio cairia no SMTP).");
  process.exit(1);
}

const req = {
  body: {
    name: "Teste WA Coders",
    email: "teste@example.com",
    subject: "Teste de integração Resend",
    text: "Mensagem de teste do formulário.",
    message: "Se você recebeu este e-mail, a integração com o Resend está funcionando.",
    fields: [{ label: "Origem", value: "scripts/test-resend.js" }],
    meta: { lang: "pt-BR", page: "local" },
  },
};
const res = {
  status(code) { this.code = code; return this; },
  json(body) { console.log(`HTTP ${this.code}`, body); process.exit(this.code === 200 ? 0 : 1); },
};

console.log(`from: ${config.RESEND_FROM}\nto:   ${config.RESEND_TO}`);
SendEmailsController.send(req, res);
