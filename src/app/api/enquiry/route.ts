// Receives every enquiry on the site (contact form and popup) and forwards it
// to the sales team.
//
// Set ENQUIRY_ENDPOINT to any URL that accepts a JSON POST and emails or
// stores it, e.g. a Formspree form ("https://formspree.io/f/<id>") whose
// notifications go to the sales inbox. Until it is set, this returns 503 and
// the forms offer WhatsApp instead, so no enquiry is silently lost.

const PHONE_RE = /^\+?[0-9\s-]{10,16}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clean = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  // Hidden field that only bots fill in. Pretend it worked.
  if (clean(body.company)) return Response.json({ ok: true });

  const enquiry = {
    name: clean(body.name, 100),
    phone: clean(body.phone, 20),
    email: clean(body.email, 120),
    interest: clean(body.interest, 60),
    message: clean(body.message, 2000),
    source: clean(body.source, 60),
  };

  const phoneDigits = enquiry.phone.replace(/\D/g, "");
  if (
    enquiry.name.length < 2 ||
    !PHONE_RE.test(enquiry.phone) ||
    phoneDigits.length < 10 ||
    phoneDigits.length > 13 ||
    (enquiry.email && !EMAIL_RE.test(enquiry.email))
  ) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const endpoint = process.env.ENQUIRY_ENDPOINT;
  if (!endpoint) {
    console.error("[enquiry] ENQUIRY_ENDPOINT is not set; enquiry not delivered", enquiry.source);
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...enquiry,
        _subject: `New enquiry: ${enquiry.interest || "K-Indrali Business Square"} (${enquiry.name})`,
        received: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error(`Upstream ${res.status}`);
  } catch (err) {
    console.error("[enquiry] delivery failed", err);
    return Response.json({ error: "delivery_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
