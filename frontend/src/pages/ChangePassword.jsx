import { useState } from "react";

import { useNavigate }
from "react-router-dom";

import API from "../services/api";

function ChangePassword() {

  const [newPassword,
    setNewPassword] =
      useState("");

  const navigate =
    useNavigate();

  const handleChangePassword =
    async (e) => {

      e.preventDefault();

      try {

        await API.put(

          "/admin/change-password",

          {
            newPassword
          },

          {
            headers: {

              Authorization:
                `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        alert(
          "Password changed successfully"
        );

        const role =
          localStorage.getItem("role");

        if (role === "Client") {
          navigate("/client");
        }

        else if (
          role === "Verifier"
        ) {
          navigate("/verifier");
        }

        else if (
          role === "Manager"
        ) {
          navigate("/manager");
        }

        else if (
          role === "Admin"
        ) {
          navigate("/admin");
        }

        else {
          navigate("/");
        }

      } catch (error) {

        console.log(error);

        alert("Password change failed");
      }
    };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={
          handleChangePassword
        }

        className="bg-white p-10 rounded-xl shadow-lg w-[400px]"
      >

        <h1 className="text-3xl font-bold text-blue-600 mb-6">

          Change Password

        </h1>

        <input
          type="password"

          placeholder="New Password"

          className="w-full border p-3 rounded mb-4"

          value={newPassword}

          onChange={(e) =>
            setNewPassword(
              e.target.value
            )
          }
        />

        <button
          type="submit"

          className="w-full bg-blue-600 text-white p-3 rounded"
        >

          Update Password

        </button>

      </form>

    </div>
  );
}

export default ChangePassword;