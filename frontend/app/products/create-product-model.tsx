"use client";

import { FormResponse } from "@/app/common/interfaces/form-response.interface";
import CreateProduct from "@/app/products/create-product";
import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import { useState } from "react";

const styles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

interface CreateProductProps {
    open: boolean;
    handleClose: () => void;
}

export default function CreateProductModal({ open, handleClose }: CreateProductProps) {
    const [ response, setResponse ] = useState<FormResponse>();

    const onClose = () => {
        setResponse(undefined);
        handleClose();
    }
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={styles}>
                <form className="w-full max-w-xs" action={async (formData) => {
                    const response = await CreateProduct(formData);
                    setResponse(response);
                    if(!response) {
                        onClose();
                    }
                }}>
                    <Stack spacing={2}>
                    <TextField
                        name="name"
                        label="name"
                        variant="outlined"
                        required
                        helperText={response?.error}
                        error={!!response?.error}
                    />

                    <TextField
                        name="description"
                        label="description"
                        variant="outlined"
                        required
                        helperText={response?.error}
                        error={!!response?.error}
                    />

                    <TextField
                        name="price"
                        label="price"
                        variant="outlined"
                        required
                        helperText={response?.error}
                        error={!!response?.error}
                    />
                    <Button type="submit" variant="contained">Submit</Button>
                    </Stack>
                </form> 
            </Box>
        </Modal>
    )
}