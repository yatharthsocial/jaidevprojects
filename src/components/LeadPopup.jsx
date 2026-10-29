"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import "./LeadPopup.css";

// ---------------------------------------------------------------------------
// Settings: change these to suit.
// Any endpoint that accepts a JSON POST works, e.g. your own API route or
// Formspree ("https://formspree.io/f/<your-form-id>").
const ENDPOINT = "https://formspree.io/f/your-form-id";
const SHOW_AFTER_MS = 5000;
const HIDE_FOR_DAYS = 7;
const CLOSE_AFTER_SUCCESS_MS = 3500;
// ---------------------------------------------------------------------------

const STORAGE_KEY = "leadPopupDismissedAt";
const ANIM_MS = 250;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s-]{10,16}$/;

// localStorage can be unavailable (private mode, blocked storage), so every
// access is guarded and the popup still works without it.
function recentlyDismissed() {
  try {
    const at = Number(localStorage.getItem(STORAGE_KEY));
    return at > 0 && Date.now() - at < HIDE_FOR_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function rememberDismissal() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // Ignore: the popup will simply show again next visit.
  }
}

function validate({ name, email, phone }) {
  const errors = {};
  if (name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email.trim())) errors.email = "Please enter a valid email address.";
  const digits = phone.replace(/\D/g, "");
  if (!PHONE_RE.test(phone.trim()) || digits.length < 10 || digits.length > 13) {
    errors.phone = "Please enter a valid phone number.";
  }
  return errors;
}

export default function LeadPopup() {
  const [mounted, setMounted] = useState(false); // in the DOM
  const [visible, setVisible] = useState(false); // animated in
  const [values, setValues] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);
  const lastFocusRef = useRef(null);
  const ids = useId();
  const titleId = `${ids}-title`;
  const descId = `${ids}-desc`;

  // Show once, a few seconds after landing, unless dismissed recently.
  useEffect(() => {
    if (recentlyDismissed()) return;
    const t = setTimeout(() => {
      lastFocusRef.current = document.activeElement;
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    }, SHOW_AFTER_MS);
    return () => clearTimeout(t);
  }, []);

  const close = useCallback(() => {
    rememberDismissal();
    setVisible(false);
    setTimeout(() => {
      setMounted(false);
      lastFocusRef.current?.focus?.();
    }, ANIM_MS);
  }, []);

  // While open: lock page scroll, focus the first field, trap Tab, Esc closes.
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    firstFieldRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      // Always unlock: the hero's intro lock may have ended while this was
      // open, and restoring a stale "hidden" would freeze the page.
      root.style.overflow = "";
    };
  }, [mounted, close]);

  // Close a few seconds after a successful submit.
  useEffect(() => {
    if (status !== "success") return;
    const t = setTimeout(close, CLOSE_AFTER_SUCCESS_MS);
    return () => clearTimeout(t);
  }, [status, close]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      dialogRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          source: "Lead popup",
          page: window.location.href,
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      rememberDismissal();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (!mounted) return null;

  return (
    <div
      className={`lead-popup-overlay${visible ? " is-visible" : ""}`}
      onMouseDown={(e) => {
        // Only a press that starts on the overlay itself closes it, so a text
        // selection dragged out of the box does not.
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={dialogRef}
        className="lead-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        <button type="button" className="lead-popup-close" onClick={close} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>

        {status === "success" ? (
          <div className="lead-popup-success" role="status">
            <div className="lead-popup-check" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </div>
            <h2 id={titleId} className="lead-popup-title">
              Thank you!
            </h2>
            <p id={descId} className="lead-popup-subtitle">
              We have received your details and will be in touch shortly.
            </p>
          </div>
        ) : (
          <>
            <h2 id={titleId} className="lead-popup-title">
              Get a Free Consultation
            </h2>
            <p id={descId} className="lead-popup-subtitle">
              Share your details and our team will call you back with availability, pricing and a
              time to visit.
            </p>

            <form className="lead-popup-form" onSubmit={onSubmit} noValidate>
              <Field
                id={`${ids}-name`}
                label="Name"
                error={errors.name}
                inputProps={{
                  ref: firstFieldRef,
                  name: "name",
                  type: "text",
                  autoComplete: "name",
                  value: values.name,
                  onChange,
                }}
              />
              <Field
                id={`${ids}-email`}
                label="Email"
                error={errors.email}
                inputProps={{
                  name: "email",
                  type: "email",
                  inputMode: "email",
                  autoComplete: "email",
                  value: values.email,
                  onChange,
                }}
              />
              <Field
                id={`${ids}-phone`}
                label="Phone number"
                error={errors.phone}
                inputProps={{
                  name: "phone",
                  type: "tel",
                  inputMode: "tel",
                  autoComplete: "tel",
                  value: values.phone,
                  onChange,
                }}
              />

              {status === "error" && (
                <p className="lead-popup-form-error" role="alert">
                  Something went wrong. Please try again.
                </p>
              )}

              <button type="submit" className="lead-popup-submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Get Started"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ id, label, error, inputProps }) {
  const errorId = `${id}-error`;
  return (
    <div className="lead-popup-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        required
        aria-required="true"
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className="lead-popup-error">
          {error}
        </p>
      )}
    </div>
  );
}
