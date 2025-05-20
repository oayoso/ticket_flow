"use client";

import styles from "@/app/page.module.css";
import axios from "axios";
import {useState} from "react";

export default function RegisterPage() {
    const [formData, setFormData] = useState
    ({
        name: "",
        email: "",
        password: "",
        role: "admin",
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
                 'http://localhost:3000/auth/register',
                 formData,
                 {
                     headers: {
                         'Content-Type': 'application/json',
                     },
                 }
             );
             console.log("Usuario registrado:", response.data);
             window.location.href = "/";
         } catch (error) {
             console.log("Error al registrar:", error.response?.data || error.message);
         }
     }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

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

            <div>
                <label>Rol:</label>
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
            </div>

            <button type="submit">Registrar</button>
        </form>
    );
}