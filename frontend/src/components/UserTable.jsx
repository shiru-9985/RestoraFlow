import {
  useEffect,
  useState
} from "react";

import API
from "../services/api";

function UserTable() {

  const [users, setUsers] =
    useState([]);

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

        setUsers(response.data);

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchUsers();

  }, []);

  const deleteUser =
    async (id) => {

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

        fetchUsers();

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <div className="bg-white p-8 rounded-xl shadow">

      <h1 className="text-3xl font-bold mb-6 text-red-600">

        Organization Users

      </h1>

      <table className="w-full">

        <thead>

          <tr className="text-left border-b">

            <th className="py-3">
              Name
            </th>

            <th>
              Email
            </th>

            <th>
              Role
            </th>

            <th>
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr
              key={user.id}

              className="border-b"
            >

              <td className="py-4">
                {user.name}
              </td>

              <td>
                {user.email}
              </td>

              <td>
                {user.role}
              </td>

              <td>

                <button
                  onClick={() =>
                    deleteUser(user.id)
                  }

                  className="bg-red-600 text-white px-4 py-2 rounded"
                >

                  Delete

                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default UserTable;