import { Button, Link, Stack, TextField } from "@mui/material";
import NextLink from "next/link";

export default function Home() {
  return (
   <Stack spacing={2} className="w-full max-w-xs">
    <TextField label="email" variant="outlined" type="email"/>
    <TextField label="password" variant="outlined" type="password"/>
    <Button variant="contained">Login</Button>
    <Link component={NextLink} href="/auth/signup" className="selt-center">Don't have an account?</Link>
   </Stack>
  );
}
