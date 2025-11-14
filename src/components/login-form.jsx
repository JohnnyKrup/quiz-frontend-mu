import { useState } from "react";
import Button from "./button";

const LoginForm = ({ onLogin }) => {
  // ==========================================
  // STATES: Formular-Daten
  // ==========================================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ==========================================
  // STATES: Fehler-Messages
  // ==========================================
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // ==========================================
  // STATE: Loading
  // ==========================================
  const [isLoading, setIsLoading] = useState(false);

  // ==========================================
  // VALIDATION FUNKTIONEN
  // ==========================================

  /**
   * Email validieren
   * Regeln: Nicht leer, muss @ enthalten
   */
  const validateEmail = (value) => {
    // Regel 1: Darf nicht leer sein
    if (!value.trim()) {
      setEmailError("Email ist erforderlich");
      return false;
    }

    // Regel 2: Muss @ enthalten
    if (!value.includes("@")) {
      setEmailError("Email muss @ enthalten");
      return false;
    }

    // Regel 3: Muss . nach @ enthalten
    const atIndex = value.indexOf("@");
    const dotAfterAt = value.indexOf(".", atIndex);
    if (dotAfterAt === -1) {
      setEmailError("Email muss einen Punkt nach dem @ enthalten");
      return false;
    }

    // Regel 4: Muss 2-3 Zeichen nach dem letzten Punkt haben
    const charsAfterDot = value.length - dotAfterAt - 1;
    if (charsAfterDot < 2 || charsAfterDot > 3) {
      setEmailError(
        "Email muss 2-3 Zeichen nach dem Punkt haben (z.B. .ch, .com)"
      );
      return false;
    }

    setEmailError("");
    return true;
  };

  /**
   * Password validieren
   */
  const validatePassword = (value) => {
    if (!value) {
      setPasswordError("Passwort ist erforderlich");
      return false;
    }

    if (value.length < 6) {
      setPasswordError("Passwort muss mindestens 6 Zeichen haben");
      return false;
    }

    setPasswordError("");
    return true;
  };

  // ==========================================
  // HANDLER: onChange
  // ==========================================

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) validateEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordError) validatePassword(value);
  };

  // ==========================================
  // HANDLER: Submit
  // ==========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    // Alle Felder validieren
    const emailOk = validateEmail(email);
    const passwordOk = validatePassword(password);

    // Bei Fehler abbrechen
    if (!emailOk || !passwordOk) {
      return;
    }

    setIsLoading(true);

    // Login-Daten an Parent weitergeben
    const loginData = {
      email: email,
      password: password,
    };

    // Parent-Funktion aufrufen (kommt später von AuthContext)
    if (onLogin) {
      onLogin(loginData);
    }

    setIsLoading(false);
  };

  // ==========================================
  // HELPER: CSS Klasse für Input
  // ==========================================

  const getInputClassName = (hasError, hasValue) => {
    let className = "form-input";
    if (!hasValue) return className;
    if (hasError) return `${className} form-input--error`;
    return `${className} form-input--success`;
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login</h2>

      {/* EMAIL INPUT */}
      <div className="form-group">
        <label htmlFor="email">
          Email <span className="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="deine@email.ch"
          className={getInputClassName(emailError, email)}
          disabled={isLoading}
        />
        {emailError && <span className="error-message">{emailError}</span>}
      </div>

      {/* PASSWORD INPUT */}
      <div className="form-group">
        <label htmlFor="password">
          Passwort <span className="required">*</span>
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Mindestens 6 Zeichen"
          className={getInputClassName(passwordError, password)}
          disabled={isLoading}
        />
        {passwordError && (
          <span className="error-message">{passwordError}</span>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <div className="form-submit">
        <Button
          text={isLoading ? "🔄 Lädt..." : "Einloggen"}
          onAnswerClick={handleSubmit}
          disabled={isLoading}
          className="submit-button"
        />
      </div>
    </form>
  );
};

export default LoginForm;
