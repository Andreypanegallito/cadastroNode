import * as rjwt from "react-jwt";

export function isTokenValid(token: string) {
  try {
    const decodedToken = rjwt.decodeToken(token);
    return decodedToken !== null;
  } catch {
    return false;
  }
}
