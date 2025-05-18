import {jwtDecode} from "jwt-decode";

interface TokenPayload{
    username : string;
}

export function getDetailsfromToken():string | null{
    const token = typeof window !== "undefined" ? localStorage.getItem("userToken") : null;
  if (!token) return null;

  try {
    const decoded: TokenPayload = jwtDecode(token);
    return decoded.username;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
