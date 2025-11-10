import { createContext, useState } from "react";

// Context erstellen
export const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  // ==========================================
  // STATE
  // ==========================================
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ==========================================
  // FUNKTIONEN
  // ==========================================
  /**
    Login Funktion (aktuell noch Fake)
    Wird in Block 04A durch echten API Call ersetzt!
  */
  const login = (username, password) => {
    setIsLoading(true);

    // TODO: Später durch echten API Call ersetzen
    setTimeout(() => {
      if (username && password) {
        // Fake user erstellen
        const fakeUSer = {
          id: 1,
          username: username,
          email: `${username}@example.com`,
          role: username === "admin" ? "ADMIN" : "PLAYER",
        };

        // Fake Token erstellen
        const fakeToken = "fake-jwt-token-" + Date.now();

        setUser({ fakeUSer });
        setToken(fakeToken);
        console.log("Fake Login erfolgreich:", fakeUSer, fakeToken);
      } else {
        console.log("Login fehlgeschlagen: Ungültige Anmeldedaten");
      }
      setIsLoading(false);
    }, 1000);
  };

  /**
   * Logout Funktion
   * Setzt den User und Token auf null
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    console.log("User ausgeloggt");
  };

  /**
   * Überprüft, ob der User authentifiziert ist
   */
  const isAuthenticated = user !== null;

  // ==========================================
  // CONTEXT VALUE
  // ==========================================
  const value = {
    // state
    user,
    token,
    isLoading,
    isAuthenticated,
    // funktionen
    login,
    logout,
  };

  // ==========================================
  // PROVIDER
  // ==========================================
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
