"use client";

import createUser from "./create-user";
import { Button, Link, Stack, TextField } from "@mui/material";
import NextLink from "next/link";
import { useActionState } from "react";

export default function Signup() {
  const [state, formAction] = useActionState(createUser, { error: "" })
  return (
    <form action={formAction}>
      <Stack spacing={2} className="w-full max-w-xs">
        <TextField
          name="email"
          label="email"
          variant="outlined"
          type="email"
          helperText={state.error}
          error={!!state.error}
        />

        <TextField
          name="password"
          label="password"
          variant="outlined"
          type="password"
          helperText={state.error}
          error={!!state.error}
        />
        <Button type="submit" variant="contained">Signup</Button>
        <Link component={NextLink} href="/auth/login" className="selt-center">You have an account? Login</Link>
      </Stack>
    </form>

  );
}
