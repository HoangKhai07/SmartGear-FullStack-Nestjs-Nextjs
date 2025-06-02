import { Box } from "@mui/material"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Box className="h-screen bg-gray-900 flex items-center justify-center">
            {children}
        </Box>
    )
}