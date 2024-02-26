"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { LOGIN_ADMIN_MUTATION } from "@/graphql/mutation/userMutation";

export default function LoginPage() {
  const router = useRouter();
  const [admin, setAdmin] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loginAdmin, { loading: loginLoading }] =
    useMutation(LOGIN_ADMIN_MUTATION);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginAdmin({
        variables: {
          input: {
            email: admin.email,
            password: admin.password,
          },
        },
      });
      if (data?.loginAdmin.status) {
        console.log(data.loginAdmin.admin_id);
        localStorage.setItem("adminId", data.loginAdmin.admin_id);
        router.push("/dashboard_admin");
      } else {
        throw new Error(data?.loginAdmin.message || "Login failed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (admin.email.length > 0 && admin.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [admin]);
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen py-2 bg-cover bg-center h-screen"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1518655048521-f130df041f66?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      <h1 className=" text-3xl">{loginLoading ? "Processing.." : "Login"}</h1>
      <hr />
      <label htmlFor="username">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="email"
        type="email"
        value={admin.email}
        onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
        placeholder="email"
      />

      <label htmlFor="username">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        type="password"
        value={admin.password}
        onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={buttonDisabled ? null : handleLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none  focus:border-gray-600"
      >
        {buttonDisabled ? "No login" : "Login"}
      </button>
    </div>
  );
}
