interface PasswordResetParams {
  email: string;
  name: string;
  code: string;
  expiresInMinutes?: number;
  appName?: string;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const FONT = "'Segoe UI', Helvetica, Arial, sans-serif";

function renderCode(code: string): string {
  const safe = escapeHtml(code);

  if (code.length > 8) {
    return `
      <td align="center" style="font-family:${FONT};font-size:22px;font-weight:700;letter-spacing:2px;color:#FFFFFF;word-break:break-all;padding:4px 0;">
        ${safe}
      </td>`;
  }

  const cells = code
    .split('')
    .map(
      (char) => `
        <td class="code-cell" width="46" height="58" align="center" valign="middle"
            style="width:46px;height:58px;background-color:#262626;border-bottom:3px solid #F26B1D;border-radius:6px 6px 0 0;font-family:${FONT};font-size:30px;font-weight:700;color:#FFFFFF;">
          ${escapeHtml(char)}
        </td>`,
    )
    .join(
      '<td class="code-gap" width="8" style="width:8px;font-size:0;line-height:0;">&nbsp;</td>',
    );

  return `
    <td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>${cells}</tr></table>
    </td>`;
}

export function emailVerificationTokenTemplate({
  email,
  name,
  code,
  expiresInMinutes = 15,
  appName = 'Meu App',
}: PasswordResetParams): string {
  const safeEmail = escapeHtml(email);
  const safeName = escapeHtml(name);
  const safeApp = escapeHtml(appName);

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Verificação de e-mail</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .px { padding-left: 24px !important; padding-right: 24px !important; }
      .code-cell { width: 38px !important; height: 50px !important; font-size: 24px !important; }
      .code-gap { width: 5px !important; }
      .title { font-size: 20px !important; }
    }
    @media (prefers-color-scheme: dark) {
      .page { background-color: #1C1C1C !important; }
      .card { background-color: #2A2A2A !important; }
      .text-main { color: #F2F2F2 !important; }
      .text-soft { color: #B5B5B5 !important; }
      .notice { background-color: #333333 !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#D9D9D6;">
  <!-- Pré-visualização exibida na caixa de entrada -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    Use o código ${escapeHtml(code)} para confirmar a verificação deste e-mail. Ele expira em ${expiresInMinutes} minutos.
  </div>

  <table role="presentation" class="page" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#D9D9D6;">
    <tr>
      <td align="center" style="padding:40px 12px;">
        <table role="presentation" class="container" width="560" cellpadding="0" cellspacing="0" border="0" style="width:560px;max-width:560px;">

          <!-- Cabeçalho -->
          <tr>
            <td class="px" style="background-color:#000000;padding:22px 40px;border-radius:12px 12px 0 0;font-family:${FONT};font-size:18px;font-weight:700;color:#FFFFFF;">
              ${safeApp}
            </td>
          </tr>
          <tr><td style="background-color:#F26B1D;height:4px;font-size:0;line-height:0;">&nbsp;</td></tr>

          <!-- Corpo -->
          <tr>
            <td class="card px" style="background-color:#F5F5F4;padding:40px 40px 12px;">
              <h1 class="title text-main" style="margin:0 0 20px;font-family:${FONT};font-size:28px;line-height:1.2;font-weight:700;color:#141414;">
                Verifique seu e-mail, ${safeName}
              </h1>
              <p class="text-main" style="margin:0 0 12px;font-family:${FONT};font-size:16px;line-height:1.6;color:#3A3A3A;">
                ${safeEmail}
              </p>
              <p class="text-main" style="margin:0 0 28px;font-family:${FONT};font-size:16px;line-height:1.6;color:#3A3A3A;">
                Recebemos uma solicitação de verificação para o e-mail: ${safeEmail}. Digite o código abaixo na tela de verificação para continuar.
              </p>
            </td>
          </tr>

          <!-- Código -->
          <tr>
            <td class="card px" style="background-color:#F5F5F4;padding:0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#000000;border-radius:10px;">
                <tr><td style="padding:28px 16px 0;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>${renderCode(code)}</tr></table>
                </td></tr>
                <tr>
                  <td align="center" style="padding:18px 16px 26px;font-family:${FONT};font-size:13px;line-height:1.5;color:#9A9A9A;">
                    Expira em <span style="color:#F26B1D;font-weight:700;">${expiresInMinutes} minutos</span> e só pode ser usado uma vez.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Aviso de segurança -->
          <tr>
            <td class="card px" style="background-color:#F5F5F4;padding:28px 40px 40px;border-radius:0 0 12px 12px;">
              <table role="presentation" class="notice" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#E8E8E6;border-left:3px solid #F26B1D;border-radius:0 6px 6px 0;">
                <tr>
                  <td class="text-soft" style="padding:16px 18px;font-family:${FONT};font-size:14px;line-height:1.6;color:#555555;">
                    <strong class="text-main" style="color:#141414;">Não foi você?</strong> Ignore este e-mail.
                    Nunca pedimos esse código por telefone ou mensagem.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Rodapé -->
          <tr>
            <td align="center" style="padding:24px 20px 0;font-family:${FONT};font-size:12px;line-height:1.6;color:#7A7A7A;">
              Este é um e-mail automático de ${safeApp}. Não é preciso responder.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
