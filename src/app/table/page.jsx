"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries/userQuery";

function ProfilePage() {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Retrieve user ID from local storage
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { getUserId: userId },
    skip: !userId,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching user data!</div>;
  const user = data?.getUser;

  const { firstName, lastName, username, email } = user || {};

  return (
    <div>
      <h1>User Profile</h1>
      <p>First Name: {firstName}</p>
      <p>Last Name: {lastName}</p>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
    </div>
  );
}

export default ProfilePage;
