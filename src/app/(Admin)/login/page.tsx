"use client";
import React from "react";
import dynamic from "next/dynamic";
import LoginForm from "./LoginForm";
export default function Login() {
  return (
    <div className="h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
