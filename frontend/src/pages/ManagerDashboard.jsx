import { useEffect, useState }
from "react";

import API
from "../services/api";

function ManagerDashboard() {

  const [documents,
    setDocuments] =
      useState([]);

  useEffect(() => {

    fetchDocuments();

  }, []);

  const fetchDocuments =
    async () => {

      try {

        const response =
          await API.get(

            "/documents/manager/pending",

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

  const groupedRestaurants =
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

  const restaurantCount =
    Object.keys(
      groupedRestaurants
    ).length;
const approvedRestaurants =
  [...new Set(

    documents

      .filter(

        (doc) =>

          doc.status === "Approved" ||

          doc.status === "VerifierApproved"
      )

      .map(
        (doc) =>
          doc.hotelName
      )
  )].length;

const rejectedRestaurants =
  [...new Set(

    documents

      .filter(
        (doc) =>
          doc.status ===
          "Rejected"
      )

      .map(
        (doc) =>
          doc.hotelName
      )
  )].length;

const verifierCount = 1;

return (

    <div className="min-h-screen bg-[#f4f7fb] p-8">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-indigo-700">

          Manager Dashboard

        </h1>

        <p className="text-gray-500 mt-2 text-lg">

          Monitor restaurant onboarding and verification activity

        </p>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-6 rounded-3xl shadow-md">

          <p className="text-gray-500">

            Total Verifiers

          </p>

          <h2 className="text-4xl font-bold text-indigo-600 mt-3">

            1

          </h2>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow-md">

          <p className="text-gray-500">

            Restaurants Onboarded

          </p>

          <h2 className="text-4xl font-bold text-blue-600 mt-3">

            {restaurantCount}

          </h2>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow-md">

          <p className="text-gray-500">

            Approved Restaurants

          </p>

          <h2 className="text-4xl font-bold text-green-600 mt-3">

            {approvedRestaurants}

          </h2>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow-md">

          <p className="text-gray-500">

            Rejected Restaurants

          </p>

          <h2 className="text-4xl font-bold text-red-600 mt-3">

            {rejectedRestaurants}

          </h2>

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT SIDE */}

        <div className="lg:col-span-2 space-y-6">

          {Object.entries(
            groupedRestaurants
          ).length === 0 ? (

            <div className="bg-white p-10 rounded-3xl shadow-md text-center">

              <h2 className="text-2xl font-bold text-gray-700">

                No Restaurants Found

              </h2>

              <p className="text-gray-500 mt-3">

                No onboarding activity available.

              </p>

            </div>

          ) : (

            Object.entries(
              groupedRestaurants
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

                          {docs.length} Documents Uploaded

                        </p>

                      </div>

                      <div>

                        {docs.some(
                          (doc) =>
                            doc.status ===
                            "Rejected"
                        ) ? (

                          <span className="bg-red-100 text-red-600 px-5 py-2 rounded-full font-semibold">

                            Rejected

                          </span>

                        ) : (

                          <span className="bg-green-100 text-green-600 px-5 py-2 rounded-full font-semibold">

                            Approved

                          </span>

                        )}

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

                        <div className="flex items-center gap-4">

                          <span
                            className={`font-semibold ${
                              doc.status ===
                              "Rejected"

                                ? "text-red-600"

                                : "text-green-600"
                            }`}
                          >

{doc.status ===
"Rejected"

  ? "Rejected"

  : doc.status === "Approved" ||

    doc.status === "VerifierApproved"

  ? "Approved"

  : "Pending"}
                          </span>

                          <a
                            href={doc.fileUrl}

                            target="_blank"

                            rel="noreferrer"

                            className="bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold"
                          >

                            View

                          </a>

                        </div>

                      </div>
                    ))}

                  </div>

                </details>
              )
            )
          )}

        </div>

        {/* RIGHT SIDE */}

        <div className="space-y-6">

          <div className="bg-white p-6 rounded-3xl shadow-md">

            <h2 className="text-2xl font-bold mb-5">

              Platform Insights

            </h2>

            <div className="space-y-5">

              <div>

                <p className="text-gray-500">

                  Approval Rate

                </p>

                <h3 className="text-3xl font-bold text-green-600 mt-1">

                  {restaurantCount === 0

                    ? "0%"

                    : `${Math.round(
                        (approvedRestaurants /
                          restaurantCount) *
                          100
                      )}%`}
                </h3>

              </div>

              <div>

                <p className="text-gray-500">

                  Pending Reviews

                </p>

  <h3 className="text-3xl font-bold text-orange-500 mt-1">

  {restaurantCount -
    approvedRestaurants -
    rejectedRestaurants}

</h3>

              </div>

            </div>

          </div>

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-3xl shadow-lg text-white">

            <h2 className="text-2xl font-bold mb-3">

              System Monitoring

            </h2>

            <p className="text-indigo-100 mb-5">

              Track onboarding activity and restaurant verification performance.

            </p>

<button

  onClick={() => {

    const reportText = `

Restaurant Onboarding Report

Generated At:
${new Date().toLocaleString()}

-----------------------------------

Total Verifiers:
${verifierCount}

Restaurants Onboarded:
${restaurantCount}

Approved Restaurants:
${approvedRestaurants}

Rejected Restaurants:
${rejectedRestaurants}

-----------------------------------

Restaurant Details

${Object.values(groupedRestaurants)

  .map((docs) => `

Restaurant:
${docs[0].hotelName}

Total Documents:
${docs.length}

Documents:

${docs.map((doc) => `

- ${doc.documentType}
  Status: ${doc.status}

`).join("")}

-----------------------------------
`).join("")}

`;

    const blob =
      new Blob(

        [reportText],

        {
          type:
            "text/plain"
        }
      );

    const url =
      URL.createObjectURL(
        blob
      );

    const a =
      document.createElement(
        "a"
      );

    a.href = url;

    a.download =
      "manager-report.txt";

    a.click();

  }}

  className="bg-white text-purple-600 font-semibold px-5 py-3 rounded-xl"
>

  Generate Report

</button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ManagerDashboard;