import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getUserProfile = createAsyncThunk(
    "profile/getUserProfile",
    async () => {
        try {
            const response = await axios.get(`/api/auth/profile`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)