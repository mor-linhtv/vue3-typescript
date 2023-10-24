
export function getCookie(name: string): string | null {
  const cookies = document.cookie.split(";");
  for (const element of cookies) {
    const cookie = element.trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

export function setCookie(name: string, value: string, expire_in: number): void {
  const date = new Date();
  date.setTime(date.getTime() + expire_in * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export function deleteCookie(name: string): void {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export function setAuthInfo(token: string, expire_in: number): void {
  setCookie("jwt", token, expire_in );
}

export function getToken(): string | null {
  if (isAuthenticated()) {
    return getCookie("jwt");
  }
  return null;
}

export function removeToken(): void {
  deleteCookie("jwt");
}
function isAuthenticated() {
  return !!getCookie("jwt");
}
