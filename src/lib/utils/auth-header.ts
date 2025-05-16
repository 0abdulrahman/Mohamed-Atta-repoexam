import "server-only";

import { cookies } from "next/headers";
import { decode, JWT } from "next-auth/jwt";
import { AUTH_COOKIE } from "../constants/api.constants";

export async function getAuthHeader() {
  const tokenCookie = cookies().get(AUTH_COOKIE)?.value;
  let JWT: JWT | null = null;

  try {
    JWT = await decode({
      token: tokenCookie,

      secret: process.env.NEXTAUTH_SECRET!,
    });
  } catch (error) {
    void error;
  }

  return {
    token: JWT?.token || "",
  };
}
