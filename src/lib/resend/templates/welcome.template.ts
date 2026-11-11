interface WelcomeParams {
  name: string;
  email: string;
  actionUrl: string;
  appName: string;
  supportEmail: string;
  devSite: string;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Aceita apenas http(s) para evitar links como javascript: dentro do href.
// Como os links são obrigatórios, um valor inválido lança erro em vez de sumir do e-mail.
const requireUrl = (url: string, field: string): URL => {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error(`welcomeTemplate: "${field}" não é uma URL válida: ${url}`);
  }
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    throw new Error(
      `welcomeTemplate: "${field}" precisa usar http ou https: ${url}`,
    );
  }
  return parsed;
};

const requireEmail = (email: string, field: string): string => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error(
      `welcomeTemplate: "${field}" não é um e-mail válido: ${email}`,
    );
  }
  return email;
};

const FONT = "'Segoe UI', Helvetica, Arial, sans-serif";

const buildSteps = (): string[] => [
  'Acesse a página de login clicando no botão acima.',
  'Clique na opção “Primeiro acesso”.',
  'Siga as etapas para definir a sua senha.',
  'Volte para a página de login.',
  'Entre com o seu e-mail e a senha que você criou.',
  'Pronto, agora é só usar o sistema.',
];

function renderButton(url: string, label: string): string {
  return `
    <tr>
      <td align="center" style="padding:28px 16px 8px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center" bgcolor="#F26B1D" style="background-color:#F26B1D;border-radius:6px;">
              <a href="${url}" target="_blank"
                 style="display:inline-block;padding:15px 34px;font-family:${FONT};font-size:16px;font-weight:700;line-height:1;color:#FFFFFF;text-decoration:none;border-radius:6px;">
                ${escapeHtml(label)}
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

function renderSteps(steps: string[]): string {
  const rows = steps
    .map(
      (step, index) => `
        <tr>
          <td width="40" valign="top" style="width:40px;padding:0 0 16px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td class="step-number" width="28" height="28" align="center" valign="middle"
                    style="width:28px;height:28px;background-color:#000000;border-radius:14px;font-family:${FONT};font-size:13px;font-weight:700;color:#F26B1D;">
                  ${index + 1}
                </td>
              </tr>
            </table>
          </td>
          <td class="text-main" valign="top" style="padding:4px 0 16px;font-family:${FONT};font-size:15px;line-height:1.5;color:#3A3A3A;">
            ${escapeHtml(step)}
          </td>
        </tr>`,
    )
    .join('');

  return `
    <tr>
      <td class="card px" style="background-color:#F5F5F4;padding:32px 40px 0;">
        <h2 class="text-main" style="margin:0 0 18px;font-family:${FONT};font-size:18px;line-height:1.3;font-weight:700;color:#141414;">
          Como fazer o seu primeiro acesso
        </h2>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>
      </td>
    </tr>`;
}

export function welcomeTemplate({
  name,
  email,
  actionUrl,
  appName,
  supportEmail,
  devSite,
}: WelcomeParams): string {
  const loginUrl = requireUrl(actionUrl, 'actionUrl');
  const devUrl = requireUrl(devSite, 'devSite');
  requireEmail(supportEmail, 'supportEmail');

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeApp = escapeHtml(appName);
  const safeSupport = escapeHtml(supportEmail);
  const safeLoginUrl = escapeHtml(loginUrl.toString());
  const safeDevUrl = escapeHtml(devUrl.toString());
  const safeDevHost = escapeHtml(devUrl.hostname.replace(/^www\./, ''));

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Boas-vindas ao ${safeApp}</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .px { padding-left: 24px !important; padding-right: 24px !important; }
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
    Sua conta foi criada. Veja como fazer o primeiro acesso.
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
                Bem-vindo, ${safeName}!
              </h1>
              <p class="text-main" style="margin:0 0 28px;font-family:${FONT};font-size:16px;line-height:1.6;color:#3A3A3A;">
                Um administrador criou uma conta para você. Antes de entrar pela primeira vez, você deve definir a sua própria senha.
              </p>
            </td>
          </tr>

          <!-- Destaque da conta -->
          <tr>
            <td class="card px" style="background-color:#F5F5F4;padding:0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#000000;border-radius:10px;">
                <tr>
                  <td align="center" style="padding:28px 16px 0;font-family:${FONT};font-size:13px;line-height:1.5;color:#9A9A9A;">
                    Este é o e-mail cadastrado:
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:6px 16px 0;font-family:${FONT};font-size:20px;font-weight:700;line-height:1.4;color:#FFFFFF;word-break:break-all;">
                    ${safeEmail}
                  </td>
                </tr>
                ${renderButton(safeLoginUrl, 'Ir para o app')}
                <tr><td style="height:26px;font-size:0;line-height:0;">&nbsp;</td></tr>
              </table>
            </td>
          </tr>

          ${renderSteps(buildSteps())}

          <!-- Aviso de segurança -->
          <tr>
            <td class="card px" style="background-color:#F5F5F4;padding:12px 40px 40px;border-radius:0 0 12px 12px;">
              <table role="presentation" class="notice" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#E8E8E6;border-left:3px solid #F26B1D;border-radius:0 6px 6px 0;">
                <tr>
                  <td class="text-soft" style="padding:16px 18px;font-family:${FONT};font-size:14px;line-height:1.6;color:#555555;">
                    <strong class="text-main" style="color:#141414;">Não esperava esta conta?</strong> Ela pode ter sido criada com o seu e-mail por engano.
                    Fale com a gente em <a href="mailto:${safeSupport}" style="color:#F26B1D;font-weight:700;text-decoration:none;">${safeSupport}</a>.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Rodapé -->
          <tr>
            <td align="center" style="padding:24px 20px 0;font-family:${FONT};font-size:12px;line-height:1.6;color:#7A7A7A;">
              Você recebeu este e-mail porque um administrador criou uma conta para você.<br>
              Desenvolvido por <a href="${safeDevUrl}" target="_blank" style="color:#7A7A7A;text-decoration:underline;">${safeDevHost}</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
