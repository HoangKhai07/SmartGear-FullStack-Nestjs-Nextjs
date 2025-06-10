import { AUTHENTICATION_COOKIE } from "@/app/auth/auth-cookie";
import { cookies } from "next/headers";

export default async function authenticated() {
    return !!(await cookies()).get(AUTHENTICATION_COOKIE)?.value;
}