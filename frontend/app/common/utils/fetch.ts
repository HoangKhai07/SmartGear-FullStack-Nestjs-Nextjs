import API_URL from "@/app/common/constants/api";
import { getErrorMessage } from "@/app/common/utils/errors";
import { cookies } from "next/headers";

const getHeaders = async () => {
    const cookiesStore = await cookies();
    return {
      Cookie: cookiesStore.toString()
    };
  }

export const post = async (path: string, formData: FormData) => {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/${path}`, {
        method: "POST",
        headers: { 
            ...headers,
            "Content-Type": "application/json" },
            credentials: 'include',
        body: JSON.stringify(Object.fromEntries(formData)),
    })
    const parsedRes = await res.json();
    if (!res.ok) {
        return { error: getErrorMessage(parsedRes) }
    }
    return { error: "" }
}

export const get = async (path: string) => {
    try {
        const headers = await getHeaders()
        const res = await fetch(`${API_URL}/${path}`, {
            // headers: {...getHeaders()},
            headers,
            credentials: 'include',
        });

        if (!res.ok) {
            return { error: `Error: ${res.status}` };
        }

        const text = await res.text()
        if (!text) {
            return { error: "Empty response" }
        }

        try {
            return JSON.parse(text);
        } catch (e) {
            return { error: "Invalid JSON response" };
        }
    } catch (error) {
        return {error: String(error)}
    }
}
