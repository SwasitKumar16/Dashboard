import React from "react";
import { useMutation } from "@apollo/client";
import { EDIT_USER_MUTATION } from "@/graphql/mutation/userMutation";

function EditModal({ isVisible, onClose }) {
  const [user, setUser] = React.useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
  });
  const [editUser, { loading: editLoading }] = useMutation(EDIT_USER_MUTATION);
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await editUser({
        variables: {
          input: {
            firstName: user.firstname,
            lastName: user.lastname,
            username: user.username,
            email: user.email,
          },
        },
      });
      if (data?.editUser.status) {
        console.log(data.editUser);
        setUser({
          firstname: "",
          lastname: "",
          username: "",
          email: "",
        });
      } else {
        throw new Error(data?.loginUser.message || "Login failed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[400px]  ">
        <div className="bg-white p-2">
          <div className="flex flex-col items-center justify-center h-[500px]  py-2 bg-cover bg-center ">
            <h1 className=" text-3xl">
              {editLoading ? "Processing..." : "Edit User"}
            </h1>
            <hr />
            <label htmlFor="firstname">FirstName</label>
            <input
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
              id="firstname"
              type="text"
              value={user.firstname}
              onChange={(e) => setUser({ ...user, firstname: e.target.value })}
              placeholder="Firstname"
            />
            <label htmlFor="username">Lastname</label>
            <input
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
              id="lastname"
              type="text"
              value={user.lastname}
              onChange={(e) => setUser({ ...user, lastname: e.target.value })}
              placeholder="lastname"
            />
            <label htmlFor="username">Username</label>
            <input
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
              id="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="username"
            />
            <label htmlFor="email">Email</label>
            <input
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
              id="email"
              type="text"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="email"
            />
            <div className="flex flex-row gap-3">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleEdit}
              >
                EDIT
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => onClose()}
              >
                BACK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
