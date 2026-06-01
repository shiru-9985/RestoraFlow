import { useEffect, useState }
from "react";

import API
from "../services/api";

function VerifierDashboard() {

  const [documents,
    setDocuments] =
      useState([]);

  const fetchDocuments =
    async () => {

      try {

        const response =
          await API.get(

            "/documents/pending",

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

  const groupedDocuments =
    documents.reduce(

      (acc, doc) => {

        const hotel =
          doc.hotelName ||
          "Unknown Restaurant";

        if (!acc[hotel]) {

          acc[hotel] = [];
        }

        acc[hotel].push(doc);

        return acc;

      },

      {}
    );

  const totalRestaurants =
    Object.keys(
      groupedDocuments
    ).length;

  const totalDocuments =
    documents.length;

  return (

    <div className="min-h-screen bg-[#f4f7fb] p-8">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-800">

          Verifier Dashboard

        </h1>

        <p className="text-gray-500 mt-2 text-lg">

          Review and verify restaurant onboarding documents

        </p>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-3xl shadow-md">

          <p className="text-gray-500">

            Pending Restaurants

          </p>

          <h2 className="text-4xl font-bold text-orange-500 mt-3">

            {totalRestaurants}

          </h2>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow-md">

          <p className="text-gray-500">

            Pending Documents

          </p>

          <h2 className="text-4xl font-bold text-blue-600 mt-3">

            {totalDocuments}

          </h2>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow-md">

          <p className="text-gray-500">

            Verification Queue

          </p>

          <h2 className="text-2xl font-bold text-red-500 mt-3">

            Active

          </h2>

        </div>

      </div>

      {/* RESTAURANT GROUPS */}

      <div className="space-y-6">

        {Object.entries(
          groupedDocuments
        ).length === 0 ? (

          <div className="bg-white rounded-3xl p-10 shadow-md text-center">

            <h2 className="text-2xl font-bold text-gray-700">

              No Pending Documents

            </h2>

            <p className="text-gray-500 mt-3">

              All restaurant documents are verified.

            </p>

          </div>

        ) : (

          Object.entries(
            groupedDocuments
          ).map(

            ([hotelName, docs]) => (

              <details
                key={hotelName}

                className="bg-white rounded-3xl shadow-lg p-6"
              >

                <summary className="list-none cursor-pointer">

                  <div className="flex items-center justify-between">

                    <div>

                      <h2 className="text-2xl font-bold text-gray-800">

                        {hotelName}

                      </h2>

                      <p className="text-gray-500 mt-1">

                        {docs.length} Documents Submitted

                      </p>

                    </div>

                    <div className="bg-orange-100 text-orange-600 px-5 py-2 rounded-full font-semibold">

                      Pending Review

                    </div>

                  </div>

                </summary>

                <div className="mt-6 space-y-4">

                  {docs.map((doc) => (

                    <div
                      key={doc.id}

                      className="border border-gray-200 rounded-2xl p-5 flex items-center justify-between"
                    >

                      <div>

                        <h3 className="text-xl font-semibold text-gray-800">

                          {doc.documentType}

                        </h3>

                        <p className="text-gray-500 mt-1">

                          Uploaded by:
                          {" "}
                          {doc.user?.name}

                        </p>

                      </div>

                      <div className="flex items-center gap-3">

                        <a
                          href={doc.fileUrl}

                          target="_blank"

                          rel="noreferrer"

                          className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold"
                        >

                          View

                        </a>

                        <button

                          onClick={() =>
                            updateStatus(
                              doc.id,
                              "Approved"
                            )
                          }

                          className="bg-green-600 text-white px-5 py-3 rounded-xl font-semibold"
                        >

                          Approve

                        </button>

                        <button

                          onClick={() =>
                            updateStatus(
                              doc.id,
                              "Rejected"
                            )
                          }

                          className="bg-red-600 text-white px-5 py-3 rounded-xl font-semibold"
                        >

                          Reject

                        </button>

                      </div>

                    </div>
                  ))}

                </div>

              </details>
            )
          )
        )}

      </div>

    </div>
  );
}

export default VerifierDashboard;