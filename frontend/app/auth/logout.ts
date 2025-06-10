"use server";

import { AUTHENTICATION_COOKIE } from "@/app/auth/auth-cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logout() {
    (await cookies()).delete(AUTHENTICATION_COOKIE);
    redirect("/auth/login");
}