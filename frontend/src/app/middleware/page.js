"use client";

import styles from "@/app/page.module.css";
import axios from "axios";
import Link from "next/link";
import {useState} from "react";

export default function MiddlewarePage() {
    return (
        <div className={styles.page}>
            <Link
                href="/comment">
                    Comentarios
            </Link>

            <Link
                    href="/ticket">
                    Ticket
            </Link>
        </div>
    );
}