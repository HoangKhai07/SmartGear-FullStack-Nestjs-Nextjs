"use server";

import { get } from "@/app/common/utils/fetch";

export default async function getMe(){
    return get("users/me")
} 