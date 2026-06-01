import { useEffect, useState } from "react";

import API from "../services/api";

function AdminDashboard() {

  const [users, setUsers] =
    useState([]);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [role, setRole] =
    useState("Client");

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers =
    async () => {

      try {

        const response =
          await API.get(

            "/admin/users",

            {
              headers: {

                Authorization:
                  `Bearer ${localStorage.getItem("token")}`
              }
            }
          );

        setUsers(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  const createUser =
    async () => {

      try {

        await API.post(

          "/admin/create-user",

          {
            name,
            email,
            role
          },

          {
            headers: {

              Authorization:
                `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        alert(
          "User created successfully use password Temp@123"
        );

        setName("");
        setEmail("");
        setRole("Client");

        fetchUsers();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to create user"
        );
      }
    };

  const deleteUser = async (id) => {

  try {

    await API.delete(

      `/admin/users/${id}`,

      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    alert("User deleted");

    fetchUsers();

  } catch (error) {

    console.log(error);

    alert("Delete failed");
  }
};
  const clientCount =
    users.filter(
      (u) =>
        u.role === "Client"
    ).length;

  const verifierCount =
    users.filter(
      (u) =>
        u.role === "Verifier"
    ).length;

  const managerCount =
    users.filter(
      (u) =>
        u.role === "Manager"
    ).length;

  const supportCount =
    users.filter(
      (u) =>
        u.role === "Support"
    ).length;

  return (

    <div className="min-h-screen bg-[#f4f7fb] p-8">

      {/* TOP HEADER */}

      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 rounded-3xl p-10 text-white shadow-2xl mb-10">

        <h1 className="text-5xl font-bold">

          Admin Control Center

        </h1>

        <p className="mt-4 text-lg text-red-100">

          Manage platform users, onboarding workflows and organization activity

        </p>

      </div>

      {/* ANALYTICS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-white rounded-3xl p-6 shadow-lg">

          <p className="text-gray-500 text-lg">

            Total Users

          </p>

          <h2 className="text-5xl font-bold text-blue-600 mt-4">

            {users.length}

          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">

          <p className="text-gray-500 text-lg">

            Clients

          </p>

          <h2 className="text-5xl font-bold text-green-500 mt-4">

            {clientCount}

          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">

          <p className="text-gray-500 text-lg">

            Verifiers

          </p>

          <h2 className="text-5xl font-bold text-purple-500 mt-4">

            {verifierCount}

          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">

          <p className="text-gray-500 text-lg">

            Managers

          </p>

          <h2 className="text-5xl font-bold text-orange-500 mt-4">

            {managerCount}

          </h2>

        </div>

      </div>

      {/* CREATE USER */}

      <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">

        <div className="mb-8">

          <h2 className="text-3xl font-bold text-gray-800">

            Create New User

          </h2>

          <p className="text-gray-500 mt-2">

            Add platform users and assign organizational roles

          </p>

        </div>

        <div className="grid md:grid-cols-4 gap-5">

          <input
            type="text"

            placeholder="Enter Name"

            value={name}

            onChange={(e) =>
              setName(
                e.target.value
              )
            }

            className="border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-red-400"
          />

          <input
            type="email"

            placeholder="Enter Email"

            value={email}

            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }

            className="border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-red-400"
          />

          <select

            value={role}

            onChange={(e) =>
              setRole(
                e.target.value
              )
            }

            className="border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-red-400"
          >

            <option>
              Client
            </option>

            <option>
              Verifier
            </option>

            <option>
              Manager
            </option>

            <option>
              Support
            </option>

          </select>

          <button

            onClick={createUser}

            className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-2xl hover:scale-105 transition"
          >

            Create User

          </button>

        </div>

      </div>

      {/* USER MANAGEMENT */}

      <div className="bg-white rounded-3xl shadow-xl p-8">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h2 className="text-3xl font-bold text-gray-800">

              Organization Users

            </h2>

            <p className="text-gray-500 mt-2">

              Manage all users and organizational access

            </p>

          </div>

          <div className="bg-red-100 text-red-600 px-5 py-3 rounded-2xl font-semibold">

            Support Users:
            {" "}
            {supportCount}

          </div>

        </div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

  {users
    .filter((user) => user.name && user.email)
    .map((user) => (

    <div
      key={user.id}

      className="bg-white rounded-3xl p-6 flex items-center justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
    >

      {/* LEFT */}

      <div>

        <h3 className="text-xl font-semibold text-gray-800">

          {user.name}

        </h3>

        <p className="text-gray-500 mt-1 text-sm">

          {user.email}

        </p>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-4">

        <span
  className={`px-5 py-2 rounded-full text-sm font-bold shadow-sm

  ${user.role === "Admin"
    ? "bg-gradient-to-r from-red-500 to-pink-500 text-white"

    : user.role === "Verifier"
    ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"

    : user.role === "Manager"
    ? "bg-gradient-to-r from-orange-400 to-orange-500 text-white"

    : user.role === "Support"
    ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white"

    : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
  }`}
>
  {user.role}
</span>

        <button

          onClick={() =>
            deleteUser(user.id)
          }

          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-2xl font-semibold shadow-md hover:scale-105 transition-all duration-200"
        >

          Delete

        </button>

      </div>

    </div>
  ))}

</div>

      </div>

    </div>
  );
}

export default AdminDashboard;
