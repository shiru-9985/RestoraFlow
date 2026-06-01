import { useState } from "react";
import API from "../services/api";

function Login() {

  const [role, setRole] =
    useState("Client");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin =
    async (e) => {

      e.preventDefault();

      localStorage.clear();

      try {

        const response =
          await API.post(
            "/auth/login",
            {
              email,
              password
            }
          );

        const userRole =
          response.data.user.role;

        if (
          userRole !== role
        ) {

          alert(
            `This account belongs to ${userRole}`
          );

          return;
        }

        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
          "role",
          userRole
        );

        const mustChangePassword =
          response.data.user
            .mustChangePassword;

        if (
          mustChangePassword
        ) {

          window.location.href =
            "/change-password";

          return;
        }

        if (
          userRole === "Client"
        ) {

          window.location.href =
            "/client";
        }

        else if (
          userRole ===
          "Verifier"
        ) {

          window.location.href =
            "/verifier";
        }

        else if (
          userRole ===
          "Manager"
        ) {

          window.location.href =
            "/manager";
        }

        else if (
          userRole ===
          "Admin"
        ) {

          window.location.href =
            "/admin";
        }

        else if (
          userRole ===
          "Support"
        ) {

          window.location.href =
            "/support";
        }

      } catch (error) {

        console.log(error);

        alert(
          "Login Failed"
        );
      }
    };

  return (

    <div className="min-h-screen flex bg-[#f8f5f2]">

      {/* LEFT SECTION */}

      <div className="w-1/2 relative hidden lg:flex flex-col justify-center px-16 text-white overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop"
          alt="Restaurant"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/65"></div>

        <div className="relative z-10">

          <h1 className="text-6xl font-bold mb-4">

            RestoraFlow

          </h1>

          <p className="text-2xl font-semibold mb-8">

            Onboard. Verify. Grow.

          </p>

          <p className="text-lg leading-8 max-w-xl text-gray-200">

            A secure restaurant onboarding platform
            for document verification, approval workflows,
            and business activation.

          </p>

          <div className="mt-12 space-y-6">

            <div className="flex items-center gap-4">

              <div className="bg-orange-500 p-3 rounded-xl text-xl">

                ✅

              </div>

              <div>

                <h3 className="font-semibold text-lg">

                  Secure Verification

                </h3>

                <p className="text-gray-300">

                  Role-based approval workflow

                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="bg-orange-500 p-3 rounded-xl text-xl">

                📄

              </div>

              <div>

                <h3 className="font-semibold text-lg">

                  Cloud Document Storage

                </h3>

                <p className="text-gray-300">

                  AWS S3 powered storage system

                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="bg-orange-500 p-3 rounded-xl text-xl">

                📈

              </div>

              <div>

                <h3 className="font-semibold text-lg">

                  Business Growth

                </h3>

                <p className="text-gray-300">

                  Join the trusted restaurant network

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT LOGIN SECTION */}

      <div className="flex-1 flex items-center justify-center p-10">

        <form
          onSubmit={handleLogin}
          className="bg-white w-full max-w-lg rounded-[30px] shadow-2xl p-12"
        >

          <div className="text-center mb-10">

            <div className="text-5xl mb-4">

              🍽️

            </div>

            <h2 className="text-5xl font-bold text-gray-800">

              Welcome Back

            </h2>

            <p className="text-gray-500 mt-3 text-lg">

              Login to continue onboarding workflow

            </p>

          </div>

          <div className="space-y-6">

            <select
              className="w-full border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-orange-500"

              value={role}

              onChange={(e) =>
                setRole(
                  e.target.value
                )
              }
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
                Admin
              </option>

              <option>
                Support
              </option>

            </select>

            <input
              type="email"

              placeholder="Email Address"

              className="w-full border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-orange-500"

              value={email}

              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />

            <input
              type="password"

              placeholder="Password"

              className="w-full border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-orange-500"

              value={password}

              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />

            <button
              type="submit"

              className="w-full bg-orange-500 hover:bg-orange-600 transition text-white text-xl font-semibold py-4 rounded-2xl shadow-lg"
            >

              Login

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Login;