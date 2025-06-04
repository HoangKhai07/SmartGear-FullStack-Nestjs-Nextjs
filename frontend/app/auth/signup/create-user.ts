"use server"

import { FormError } from "@/app/common/form-errorr.interface";
import { post } from "@/app/utils/fetch";
import { redirect } from "next/navigation";

export default async function createUser(_prevState: FormError, formData: FormData) {
    const { error } = await post("users", formData);
    if(error){
        return { error }
    }
    redirect("/")
}