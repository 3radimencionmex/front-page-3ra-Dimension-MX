"use client";

import { useState, type FormEvent } from "react";

interface FormData {
  nombre: string;
  email: string;
  tipo: string;
  mensaje: string;
}

interface FormErrors {
  nombre?: string;
  email?: string;
  tipo?: string;
  mensaje?: string;
}

const PROJECT_TYPES = [
  "Prototipo rápido",
  "Pieza funcional / industrial",
  "Modelo de resina",
  "Diseño CAD",
  "Producción en serie",
  "Otro",
];

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.nombre.trim()) errors.nombre = "// nombre requerido";
  if (!data.email.trim()) {
    errors.email = "// email requerido";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "// email inválido";
  }
  if (!data.tipo) errors.tipo = "// selecciona un tipo de proyecto";
  if (!data.mensaje.trim()) errors.mensaje = "// mensaje requerido";
  else if (data.mensaje.trim().length < 10)
    errors.mensaje = "// mínimo 10 caracteres";
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    nombre: "",
    email: "",
    tipo: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      style={{
        background: "var(--color-base)",
        borderTop: "1px solid var(--color-border)",
        padding: "96px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "start",
        }}
        className="contact-grid"
      >
        {/* Left — Info */}
        <div>
          <p className="section-label">// Contacto</p>
          <h2 className="section-title">Cotiza tu proyecto</h2>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.875rem",
              color: "var(--color-muted)",
              lineHeight: 1.7,
              marginBottom: "48px",
              maxWidth: "400px",
            }}
          >
            Cuéntanos tu proyecto y te enviamos una cotización en menos de 24 h.
            Trabajamos con empresas, diseñadores, artistas e ingenieros.
          </p>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/525500000000?text=Hola%2C%20me%20interesa%20cotizar%20un%20proyecto%20de%20impresi%C3%B3n%203D"
            target="_blank"
            rel="noopener noreferrer"
            className="nothing-btn nothing-btn--accent"
            style={{ marginBottom: "48px", display: "inline-flex" }}
            aria-label="Escríbenos en WhatsApp"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Escríbenos en WhatsApp
          </a>

          {/* ASCII coordinate block */}
          <pre
            aria-label="Ubicación: Ciudad de México"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--color-muted)",
              lineHeight: 1.8,
              border: "1px solid var(--color-border)",
              padding: "20px",
              background: "var(--color-surface)",
            }}
          >
            {`┌─ 3RADIMENSION MEXICO ────────┐
│                              │
│  LAT:  19°26'02" N           │
│  LONG: 99°08'02" W           │
│  ALT:  2,250 msnm            │
│                              │
│  Ciudad de México, MX        │
│  contacto@3radimension.mx    │
│                              │
└──────────────────────────────┘`}
          </pre>
        </div>

        {/* Right — Form */}
        <div>
          {submitted ? (
            <div
              role="status"
              style={{
                border: "1px solid var(--color-border)",
                padding: "48px 32px",
                background: "var(--color-surface)",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.5rem",
                  color: "var(--color-accent)",
                  marginBottom: "16px",
                  textShadow: "0 0 16px var(--color-accent-glow)",
                }}
              >
                [OK]
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.875rem",
                  color: "var(--color-muted)",
                }}
              >
                Mensaje enviado. Te contactamos en menos de 24 h.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              style={{ display: "flex", flexDirection: "column", gap: "32px" }}
            >
              {/* Nombre */}
              <div className="field">
                <label
                  htmlFor="nombre"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--color-muted)",
                  }}
                >
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  autoComplete="name"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  aria-describedby={errors.nombre ? "nombre-err" : undefined}
                  aria-invalid={!!errors.nombre}
                  className={`field-input${errors.nombre ? " error" : ""}`}
                />
                {errors.nombre && (
                  <span id="nombre-err" role="alert" className="field-error">
                    {errors.nombre}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="field">
                <label
                  htmlFor="email"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--color-muted)",
                  }}
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  aria-describedby={errors.email ? "email-err" : undefined}
                  aria-invalid={!!errors.email}
                  className={`field-input${errors.email ? " error" : ""}`}
                />
                {errors.email && (
                  <span id="email-err" role="alert" className="field-error">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Tipo de proyecto */}
              <div className="field">
                <label
                  htmlFor="tipo"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--color-muted)",
                  }}
                >
                  Tipo de Proyecto
                </label>
                <select
                  id="tipo"
                  name="tipo"
                  value={form.tipo}
                  onChange={handleChange}
                  aria-describedby={errors.tipo ? "tipo-err" : undefined}
                  aria-invalid={!!errors.tipo}
                  className={`field-input${errors.tipo ? " error" : ""}`}
                  style={{ cursor: "pointer" }}
                >
                  <option value="" disabled>
                    Selecciona...
                  </option>
                  {PROJECT_TYPES.map((t) => (
                    <option
                      key={t}
                      value={t}
                      style={{
                        background: "var(--color-surface)",
                        color: "var(--color-text)",
                      }}
                    >
                      {t}
                    </option>
                  ))}
                </select>
                {errors.tipo && (
                  <span id="tipo-err" role="alert" className="field-error">
                    {errors.tipo}
                  </span>
                )}
              </div>

              {/* Mensaje */}
              <div className="field">
                <label
                  htmlFor="mensaje"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--color-muted)",
                  }}
                >
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={5}
                  value={form.mensaje}
                  onChange={handleChange}
                  placeholder="Describe tu proyecto, dimensiones, material preferido, cantidad..."
                  aria-describedby={errors.mensaje ? "mensaje-err" : undefined}
                  aria-invalid={!!errors.mensaje}
                  className={`field-input${errors.mensaje ? " error" : ""}`}
                  style={{ resize: "vertical" }}
                />
                {errors.mensaje && (
                  <span id="mensaje-err" role="alert" className="field-error">
                    {errors.mensaje}
                  </span>
                )}
              </div>

              <button type="submit" className="nothing-btn" style={{ alignSelf: "flex-start" }}>
                Enviar Cotización →
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "80px auto 0",
          paddingTop: "40px",
          borderTop: "1px solid var(--color-border)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          color: "var(--color-muted)",
        }}
      >
        <span>© 2025 3radimension Mexico. Todos los derechos reservados.</span>
        <span>Donde el diseño se vuelve tangible.</span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
