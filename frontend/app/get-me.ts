"use server";

import { get } from "@/app/utils/fetch";

export default async function getMe(){
    return get("users/me")
} 