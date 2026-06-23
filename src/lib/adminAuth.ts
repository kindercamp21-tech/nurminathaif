// Simple auth constants — in production, use a proper auth system
export const ADMIN_EMAIL = 'kindercamp21@gmail.com';
export const ADMIN_PASSWORD = 'minaTHAIF123';
export const AUTH_KEY = 'nurmina_admin_auth';

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  const val = localStorage.getItem(AUTH_KEY);
  return val === 'true';
}

export function login(email: string, password: string): boolean {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}
