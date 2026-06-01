import { useEffect, useState }
from "react";

import API
from "../services/api";

import UploadForm
from "../components/UploadForm";

function ClientDashboard() {

  const [documents,
    setDocuments] =
      useState([]);

  const [hotelName,
    setHotelName] =
      useState("");

  useEffect(() => {

    fetchDocuments();

  }, []);

  const fetchDocuments =
    async () => {

      try {

        const response =
          await API.get(

            "/documents/my-documents",

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

        if (
          response.data.length > 0
        ) {

          setHotelName(

            response.data[0]
              .hotelName || ""
          );
        }

      } catch (error) {

        console.log(error);
      }
    };

const uniqueDocuments =
  [...new Set(

    documents.map(
      (doc) =>
        doc.documentType
    )
  )];
  

const uploadedCount =
  uniqueDocuments.length;

  const completion =
    Math.round(
      (uploadedCount / 5) * 100
    );
const hasRejected =
  documents.some(
    (doc) =>
      doc.status ===
      "Rejected"
  );

const allApproved =
  documents.length > 0 &&
  documents.every(
    (doc) =>
      doc.status ===
      "VerifierApproved"
  );

let overallStatus =
  "Pending";

if (hasRejected) {

  overallStatus =
    "Rejected";
}

else if (allApproved) {

  overallStatus =
    "Approved";
}

else {

  overallStatus =
    "Under Review";
}
  return (

    <div className="min-h-screen bg-[#f4f7fb] p-8">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-800">

          Restaurant Dashboard

        </h1>

        <p className="text-gray-500 mt-2 text-lg">

          Manage your onboarding and verification process

        </p>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-6 rounded-3xl shadow-md">

          <p className="text-gray-500">

            Uploaded Documents

          </p>

          <h2 className="text-4xl font-bold text-blue-600 mt-3">

            {uploadedCount}/5

          </h2>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow-md">

          <p className="text-gray-500">

            Verification Status

          </p>

          <h2 className="text-2xl font-bold text-orange-500 mt-3">

           {overallStatus}

          </h2>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow-md">

          <p className="text-gray-500">

            Restaurant Name

          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-3">

            {hotelName || "Not Added"}

          </h2>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow-md">

          <p className="text-gray-500">

            Completion

          </p>

          <h2 className="text-4xl font-bold text-green-500 mt-3">

            {completion}%

          </h2>

        </div>

      </div>

      {/* MAIN GRID */}

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT */}

        <div className="lg:col-span-2">

          <UploadForm />

        </div>

        {/* RIGHT */}

        <div className="space-y-6">

          {/* RECENT ACTIVITY */}

          <div className="bg-white p-6 rounded-3xl shadow-md">

            <h2 className="text-2xl font-bold mb-5">

              Recent Activity

            </h2>

            <div className="space-y-4">

              {documents.length === 0 ? (

                <p className="text-gray-500">

                  No uploads yet

                </p>

              ) : (

                documents
  .slice(0, 7)
  .map((doc) => (

                  <div
                    key={doc.id}

                    className="border-l-4 border-green-500 pl-4"
                  >

                    <p className="font-semibold">

                      {doc.documentType}

                    </p>

<p
  className={`text-sm font-semibold mt-1 ${
    doc.status === "VerifierApproved"

      ? "text-green-600"

      : doc.status === "Rejected"

      ? "text-red-600"

      : "text-orange-500"
  }`}
>

  {doc.status === "Pending"

    ? "Pending Review ⏳"

    : doc.status === "VerifierApproved"

    ? "Approved by Verifier ✅"

    : doc.status === "Rejected"

    ? "Rejected ❌"

    : "Processing"}

</p>

                  </div>
                ))
              )}

            </div>

          </div>

          {/* SUPPORT */}

          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-3xl shadow-lg text-white">

            <h2 className="text-2xl font-bold mb-3">

              Need Help?

            </h2>

            <p className="mb-5 text-orange-100">

              Contact onboarding support team for assistance.

            </p>

            <button className="bg-white text-orange-600 font-semibold px-5 py-3 rounded-xl">

              Contact Support

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ClientDashboard;