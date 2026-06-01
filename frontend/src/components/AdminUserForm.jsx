import { useState }
from "react";

import API
from "../services/api";

function AdminUserForm() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [role, setRole] =
    useState("Client");

  const createUser =
    async (e) => {

      e.preventDefault();

      try {

        const response =
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

          `Temporary Password: ${response.data.temporaryPassword}`
        );

        setName("");
        setEmail("");
        setRole("Client");

      } catch (error) {

        console.log(error);

        alert("User creation failed");
      }
    };

  return (

    <form
      onSubmit={createUser}

      className="bg-white p-8 rounded-xl shadow"
    >

      <h1 className="text-3xl font-bold mb-6 text-red-600">

        Create User

      </h1>

      <div className="grid grid-cols-3 gap-4">

        <input
          type="text"

          placeholder="Name"

          className="border p-3 rounded"

          value={name}

          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"

          placeholder="Email"

          className="border p-3 rounded"

          value={email}

          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <select
          className="border p-3 rounded"

          value={role}

          onChange={(e) =>
            setRole(e.target.value)
          }
        >

          <option>Client</option>
          <option>Verifier</option>
          <option>Manager</option>
          <option>Admin</option>
          <option>Auditor</option>
          <option>Support</option>

        </select>

      </div>

      <button
        type="submit"

        className="mt-6 bg-red-600 text-white px-6 py-3 rounded"
      >

        Create User

      </button>

    </form>
  );
}

export default AdminUserForm;