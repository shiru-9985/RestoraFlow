import {
  useEffect,
  useState
} from "react";

import API
from "../services/api";

function ManagerApprovalTable() {

  const [documents,
    setDocuments] =
      useState([]);

  const fetchDocuments =
    async () => {

      try {

        const response =
          await API.get(

            "/documents/manager-pending",

            {
              headers: {

                Authorization:
                  `Bearer ${localStorage.getItem("token")}`
              }
            }
          );

        setDocuments(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchDocuments();

  }, []);

  const approveDocument =
    async (id) => {

      try {

        await API.put(

          `/documents/manager-approve/${id}`,

          {},

          {
            headers: {

              Authorization:
                `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        alert(
          "Manager approved document"
        );

        fetchDocuments();

      } catch (error) {

        console.log(error);

        alert(
          "Approval failed"
        );
      }
    };

  return (

    <div className="bg-white p-8 rounded-xl shadow">

      <h1 className="text-3xl font-bold text-blue-600 mb-6">

        Final Approval Queue

      </h1>

      <table className="w-full">

        <thead>

          <tr className="border-b text-left">

            <th className="py-3">
              Client
            </th>

            <th>
              Document
            </th>

            <th>
              Status
            </th>

            <th>
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {documents.map(
            (doc) => (

            <tr
              key={doc.id}

              className="border-b"
            >

              <td className="py-4">

                {doc.user.name}

              </td>

              <td>
                {doc.title}
              </td>

              <td>

                {doc.status}

              </td>

              <td>

                <button
                  onClick={() =>
                    approveDocument(
                      doc.id
                    )
                  }

                  className="bg-green-600 text-white px-4 py-2 rounded"
                >

                  Final Approve

                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default
ManagerApprovalTable;