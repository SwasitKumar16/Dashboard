"use client";
// import Link from "next/link";
import React, { useEffect } from "react";
// import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { REGISTER_ADMIN_MUTATION } from "@/graphql/mutation/userMutation";

export default function SignupPage() {
  const [admin, setAdmin] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    username: "",
    userId: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [registerAdmin, { loading: registerLoading }] = useMutation(
    REGISTER_ADMIN_MUTATION
  );
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerAdmin({
        variables: {
          input: {
            username: admin.username,
            email: admin.email,
            password: admin.password,
            firstName: admin.firstname,
            lastName: admin.lastname,
            userId: parseInt(admin.userId, 10),
          },
        },
      });
      if (data?.registerAdmin) {
        console.log(registerAdmin);
        window.location.reload();
      } else {
        throw new Error("Failed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (
      admin.email.length > 0 &&
      admin.password.length > 0 &&
      admin.username.length > 0 &&
      admin.userId > 0
    ) {
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
      <h1>{registerLoading ? "Processing" : "Create New Admin"}</h1>
      <hr />
      <label htmlFor="firstname">username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="firstname"
        type="text"
        value={admin.firstname}
        onChange={(e) => setAdmin({ ...admin, firstname: e.target.value })}
        placeholder="Firstname"
      />
      <label htmlFor="username">lastname</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="lastname"
        type="text"
        value={admin.lastname}
        onChange={(e) => setAdmin({ ...admin, lastname: e.target.value })}
        placeholder="lastname"
      />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="username"
        type="text"
        value={admin.username}
        onChange={(e) => setAdmin({ ...admin, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={admin.email}
        onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={admin.password}
        onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
        placeholder="password"
      />
      <label htmlFor="userId">userId</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="userId"
        type="text"
        value={admin.userId}
        onChange={(e) => setAdmin({ ...admin, userId: e.target.value })}
        placeholder="userId"
      />

      <button
        onClick={buttonDisabled ? null : handleSignUp}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? "No signup" : "Signup"}
      </button>
      {/* <Link href="/login">Visit login page</Link> */}
    </div>
  );
}
