"use client";

import styles from "@/app/page.module.css";
import axios from "axios";
import {useState} from "react";

export default function LoginPage() {
    const [formData, setFormData] = useState
    ({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:3000/auth/login',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            localStorage.setItem('token', response.data?.access_token);
            if (localStorage.getItem("token")) {
                window.location.href = "/middleware";
            }
        } catch (error) {
            console.log("Error al registrar:", error.response?.data || error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Correo:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Contraseña:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit">Login</button>
        </form>
    );
}