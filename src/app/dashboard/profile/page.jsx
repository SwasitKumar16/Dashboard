"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries/userQuery";

function ProfilePage() {
  const [userId, setUserId] = useState("");
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { getUserId: userId },
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  if (loading && !data) return <div>Loading...</div>; // Show loading indicator
  if (error) return <div>Error fetching user data!</div>; // Show error message

  const user = data?.getUser;

  return (
    <div className="flex flex-col items-center justify-center h-screen ml-16">
      <table className="min-w-1/2 divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              First Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Username
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {user ? (
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">{user.firstName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.lastName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan="4" className="px-6 py-4 whitespace-nowrap">
                No user data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex flex-row gap-3">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          EDIT
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          DELETE
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
