import {
  Link,
  useNavigate
} from "react-router-dom";

function Sidebar() {

  const navigate =
    useNavigate();

  const role =
    localStorage.getItem("role");

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");
  };

  return (

    <div className="w-[250px] bg-gray-900 text-white p-6 min-h-screen">

      <h1 className="text-3xl font-bold text-blue-400 mb-10">

        VerifyFlow

      </h1>

      <div className="mb-10">

        <p className="text-gray-400">

          Logged in as

        </p>

        <h2 className="text-xl font-bold">

          {role}

        </h2>

      </div>

      <div className="flex flex-col gap-4">

        {role === "Admin" && (

          <Link
            to="/admin"

            className="hover:text-blue-400"
          >

            Admin Dashboard

          </Link>
        )}

        {role === "Manager" && (

          <Link
            to="/manager"

            className="hover:text-blue-400"
          >

            Manager Dashboard

          </Link>
        )}

        {role === "Verifier" && (

          <Link
            to="/verifier"

            className="hover:text-blue-400"
          >

            Verifier Dashboard

          </Link>
        )}

        {role === "Client" && (

          <Link
            to="/client"

            className="hover:text-blue-400"
          >

            Client Dashboard

          </Link>
        )}

      </div>

      <button
        onClick={logout}

        className="mt-10 bg-red-600 w-full py-3 rounded"
      >

        Logout

      </button>

    </div>
  );
}

export default Sidebar;