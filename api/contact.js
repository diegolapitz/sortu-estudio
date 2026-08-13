const CONTACT_TO = 'hola@sortuestudio.com';

const text = (value, maxLength) => (typeof value === 'string' ? value.trim().slice(0, maxLength) : '');
const escapeHtml = (value) => value.replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
}[character]));

function json(response, body, status = 200) {
  response.setHeader('Cache-Control', 'no-store');
  return response.status(status).json(body);
}

export default async function handler(request, response) {
  if (request.method !== 'POST') return json(response, { error: 'Método no permitido.' }, 405);

  let payload;
  try {
    payload = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
  } catch {
    return json(response, { error: 'No pudimos procesar la consulta.' }, 400);
  }
  if (!payload || typeof payload !== 'object') return json(response, { error: 'No pudimos procesar la consulta.' }, 400);

  const nombre = text(payload.nombre, 120);
  const empresa = text(payload.empresa, 160);
  const email = text(payload.email, 180).toLowerCase();
  const telefono = text(payload.telefono, 80);
  const mensaje = text(payload.mensaje, 5000);
  const website = text(payload.website, 200);
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Honeypot silencioso: las personas no ven este campo, los bots sí.
  if (website) return json(response, { ok: true });
  if (!nombre || !validEmail || !mensaje) {
    return json(response, { error: 'Completá tu nombre, email y mensaje para continuar.' }, 400);
  }
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM) {
    console.error('Missing Resend environment variables.');
    return json(response, { error: 'El formulario está temporalmente no disponible. Probá nuevamente más tarde.' }, 503);
  }

  const plainText = [
    'Nueva consulta desde sortuestudio.com',
    '',
    `Nombre: ${nombre}`,
    `Empresa o marca: ${empresa || '—'}`,
    `Email: ${email}`,
    `Teléfono: ${telefono || '—'}`,
    '',
    'Mensaje:',
    mensaje,
  ].join('\n');

  const html = `
    <h2>Nueva consulta desde sortuestudio.com</h2>
    <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
    <p><strong>Empresa o marca:</strong> ${escapeHtml(empresa || '—')}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Teléfono:</strong> ${escapeHtml(telefono || '—')}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${escapeHtml(mensaje).replace(/\n/g, '<br />')}</p>
  `;

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM,
        to: [CONTACT_TO],
        reply_to: email,
        subject: `Nueva consulta web — ${nombre}`,
        text: plainText,
        html,
      }),
    });

    if (!resendResponse.ok) {
      console.error('Resend request failed.', resendResponse.status);
      return json(response, { error: 'No pudimos enviar el mensaje. Probá nuevamente en unos minutos.' }, 502);
    }
  } catch (error) {
    console.error('Contact form delivery failed.', error instanceof Error ? error.message : 'Unknown error');
    return json(response, { error: 'No pudimos enviar el mensaje. Revisá tu conexión e intentá otra vez.' }, 502);
  }

  return json(response, { ok: true });
}
