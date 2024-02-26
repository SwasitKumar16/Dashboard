"use client";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout,
  MdDomain,
  MdGridOn,
} from "react-icons/md";
// import { FaUserEdit } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BiMessageSquareDots } from "react-icons/bi";
import { useRouter } from "next/navigation";
import Layout from "@/app/dashboard/page";

function AdminNavbar() {
  const router = useRouter();
  const onLogout = () => {
    try {
      router.push("/adminlogin");
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const onProfile = () => {
    try {
      router.push("/dashboard_admin/profile");
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return (
    <div>
      <Disclosure as="nav">
        <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu
            className="block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>
        <div className="p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
            <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
              User Dashboard
            </h1>
            <div className=" my-4 border-b border-gray-100 pb-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <button className="flex items-center gap-2 focus:outline-none">
                  <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Dashboard
                  </h3>
                </button>
              </div>
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <button
                  className="flex items-center gap-2 focus:outline-none"
                  onClick={onProfile}
                >
                  <CgProfile className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Profile
                  </h3>
                </button>
              </div>
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <button className="flex items-center gap-2 focus:outline-none ">
                  <MdGridOn className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Branches
                  </h3>
                </button>
              </div>
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <button className="flex items-center gap-2 focus:outline-none">
                  <MdDomain className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Company
                  </h3>
                </button>
              </div>
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <button className="flex items-center gap-2 focus:outline-none">
                  <BiMessageSquareDots className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Messages
                  </h3>
                </button>
              </div>
            </div>

            <div className=" my-4 border-b border-gray-100 pb-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <button className="flex items-center gap-2 focus:outline-none">
                  <MdOutlineSettings className="text-2xl text-gray-600 group-hover:text-white" />
                  <span className="text-base text-gray-800 group-hover:text-white font-semibold">
                    Settings
                  </span>
                </button>
              </div>
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <button className="flex items-center gap-2 focus:outline-none">
                  <MdOutlineMoreHoriz className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    More
                  </h3>
                </button>
              </div>
            </div>

            <div className=" my-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <button
                  className="flex items-center gap-2 focus:outline-none"
                  onClick={onLogout}
                >
                  <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white" />
                  <span className="text-base text-gray-800 group-hover:text-white font-semibold">
                    Logout
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

export default AdminNavbar;
