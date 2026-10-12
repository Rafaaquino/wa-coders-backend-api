// Validação e template HTML do e-mail do formulário de contato do site.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Remove quebras de linha de campos que vão para cabeçalhos (evita header injection).
const oneLine = (value) => String(value ?? "").replace(/[\r\n]+/g, " ").trim();

/**
 * Valida e normaliza o corpo de POST /emails/send-email.
 * Aceita o formato antigo { name, email, subject, text } e o novo, que adiciona
 * { message, fields: [{label, value}], meta: { lang, page } } para o e-mail ficar organizado.
 */
function parseContactBody(body = {}) {
  const errors = [];
  const name = oneLine(body.name);
  const email = oneLine(body.email);
  const subject = oneLine(body.subject);
  const text = String(body.text ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || name.length > 120) errors.push("name");
  if (!EMAIL_RE.test(email) || email.length > 200) errors.push("email");
  if (!subject || subject.length > 200) errors.push("subject");
  if (!(message || text) || (message || text).length > 5000 || text.length > 8000) errors.push("text");

  const fields = Array.isArray(body.fields)
    ? body.fields
        .slice(0, 20)
        .map((f) => ({ label: oneLine(f?.label).slice(0, 80), value: String(f?.value ?? "").trim().slice(0, 500) }))
        .filter((f) => f.label && f.value)
    : [];

  const meta = {
    lang: oneLine(body.meta?.lang).slice(0, 20),
    page: oneLine(body.meta?.page).slice(0, 300),
  };

  return { errors, data: { name, email, subject, text, message, fields, meta } };
}

function buildText({ name, email, text, message, fields }) {
  if (text) return text;
  const lines = [`Name: ${name}`, `Email: ${email}`, ...fields.map((f) => `${f.label}: ${f.value}`)];
  if (message) lines.push("", message);
  return lines.join("\n");
}

function buildHtml({ name, email, subject, text, message, fields, meta }) {
  const rows = [
    { label: "Nome", value: name },
    { label: "E-mail", value: email, href: `mailto:${email}` },
    ...fields,
  ];
  // Formato antigo (sem message/fields): mostra o texto completo preservando quebras de linha.
  const body = message || (fields.length ? "" : text);

  const rowsHtml = rows
    .map(
      (r) => `<tr>
        <td style="padding:8px 12px;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top;border-bottom:1px solid #eee">${escapeHtml(r.label)}</td>
        <td style="padding:8px 12px;font-size:14px;color:#0e1726;border-bottom:1px solid #eee">${
          r.href ? `<a href="${escapeHtml(r.href)}" style="color:#a85a00">${escapeHtml(r.value)}</a>` : escapeHtml(r.value)
        }</td>
      </tr>`
    )
    .join("");

  const metaLine = [meta.lang && `Idioma: ${meta.lang}`, meta.page && `Página: ${meta.page}`].filter(Boolean).join(" · ");

  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f7f5f9;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:620px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e6e1ea">
    <div style="background:#0e1726;padding:18px 24px">
      <div style="color:#f09105;font-size:12px;letter-spacing:.08em;text-transform:uppercase">Novo contato pelo site</div>
      <div style="color:#fff;font-size:20px;font-weight:700;margin-top:4px">${escapeHtml(subject)}</div>
    </div>
    <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;margin:8px 0">${rowsHtml}</table>
    ${
      body
        ? `<div style="padding:8px 24px 20px">
      <div style="color:#6b7280;font-size:13px;margin-bottom:6px">Mensagem</div>
      <div style="font-size:15px;line-height:1.55;color:#0e1726;white-space:pre-wrap">${escapeHtml(body)}</div>
    </div>`
        : ""
    }
    <div style="padding:14px 24px;background:#f7f5f9;color:#6b7280;font-size:12px">
      Responda este e-mail para falar direto com ${escapeHtml(name)}.${metaLine ? `<br>${escapeHtml(metaLine)}` : ""}
    </div>
  </div>
</body></html>`;
}

module.exports = { parseContactBody, buildHtml, buildText, escapeHtml };
