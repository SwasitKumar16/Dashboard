"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { REGISTER_USER_MUTATION } from "@/graphql/mutation/userMutation";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  // const [loading, setLoading] = React.useState(false);

  const [registerUser, { loading: registerLoading }] = useMutation(
    REGISTER_USER_MUTATION
  );
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser({
        variables: {
          input: {
            username: user.username,
            email: user.email,
            password: user.password,
            firstName: user.firstname,
            lastName: user.lastname,
          },
        },
      });
      if (data?.registerUser) {
        router.push("/dashboard");
      } else {
        throw new error("Failed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen py-2 bg-cover bg-center h-screen"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1518655048521-f130df041f66?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      <h1>{registerLoading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="firstname">username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="firstname"
        type="text"
        value={user.firstname}
        onChange={(e) => setUser({ ...user, firstname: e.target.value })}
        placeholder="Firstname"
      />
      <label htmlFor="username">lastname</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="lastname"
        type="text"
        value={user.lastname}
        onChange={(e) => setUser({ ...user, lastname: e.target.value })}
        placeholder="lastname"
      />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={handleSignUp}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? "No signup" : "Signup"}
      </button>
      <Link href="/login">Visit login page</Link>
    </div>
  );
}
