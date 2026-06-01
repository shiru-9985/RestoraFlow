import { useEffect, useState } from "react";
import API from "../services/api";

function PendingDocuments() {

  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {

    try {

      const response = await API.get(
        "/documents/pending",
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setDocuments(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

const updateStatus =
  async (
    id,
    status
  ) => {

    try {

      await API.put(

        `/documents/${id}/status`,

        {
          status
        },

        {
          headers: {

            Authorization:
              `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      fetchDocuments();

    } catch (error) {

      console.log(error);
    }
};

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold text-green-600 mb-6">
        Pending Documents
      </h1>

      <div className="space-y-4">

        {documents.map((doc) => (

          <div
            key={doc.id}
            className="bg-white p-6 rounded-xl shadow"
          >

            <h2 className="text-xl font-bold">
              {doc.title}
            </h2>

            <p className="text-gray-600">
              Uploaded by: {doc.user.name}
            </p>

            <a
              href={doc.fileUrl}
              target="_blank"
              className="text-blue-600 underline"
            >
              View Document
            </a>

            <div className="mt-4 flex gap-4">

              <button
                onClick={() =>
                  updateStatus(doc.id, "Approved")
                }
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Approve
              </button>

              <button
                onClick={() =>
                  updateStatus(doc.id, "Rejected")
                }
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Reject
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default PendingDocuments;