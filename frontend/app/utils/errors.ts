export const getErrorMessage = (response: any) => {
    if(response.message) {
        if(Array.isArray(response.message)) {
            return formatErrorMessages(response.message[0])
        }
        return formatErrorMessages(response.message)
    }
    return "Unknown error occured."
}

const formatErrorMessages = (message: string) => {
    return message.charAt(0).toUpperCase() + message.slice(1)
}