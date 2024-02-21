"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const login = () => {
    router.push("/login");
  };
  const signup = () => {
    router.push("/signup");
  };
  return (
    <div
      className="bg-cover bg-center h-screen flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      <p className=" text-white font-bold text-7xl absolute top-48">WELCOME</p>
      <div className="flex flex-row items-center justify-center  min-h-screen gap-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 text-4xl"
          onClick={login}
        >
          Login
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 text-4xl"
          onClick={signup}
        >
          Signup
        </button>
      </div>
    </div>
  );
}
