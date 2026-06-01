import { useEffect, useState }
from "react";
import API
from "../services/api";

function UploadForm() {
  const requiredDocuments = [

    "Aadhaar Card",

    "PAN Card",

    "GST Certificate",

    "FSSAI License",

    "Hotel License"
  ];

  const [hotelName,
    setHotelName] =
      useState("");

  const [files,
    setFiles] =
      useState({});

  const [uploadedDocs,
    setUploadedDocs] =
      useState({});

  const [successMessage,
    setSuccessMessage] =
      useState("");

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

        const uploaded = {};

        response.data.forEach(
          (doc) => {

            uploaded[
              doc.documentType
            ] = true;

            if (
              doc.hotelName
            ) {

              setHotelName(
                doc.hotelName
              );
            }
          }
        );

        setUploadedDocs(
          uploaded
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchDocuments();

  }, []);
  const handleFileChange =
    (docType, file) => {

      setFiles({

        ...files,

        [docType]: file
      });
    };

  const uploadDocument =
    async (docType) => {

      try {

        if (!hotelName) {

          alert(
            "Enter restaurant name"
          );

          return;
        }

        if (
          !files[docType]
        ) {

          alert(
            "Choose file first"
          );

          return;
        }

        const formData =
          new FormData();

        formData.append(
          "title",
          docType
        );

        formData.append(
          "documentType",
          docType
        );

        formData.append(
          "hotelName",
          hotelName
        );

        formData.append(
          "document",
          files[docType]
        );

        const response =
          await API.post(

            "/documents/upload",

            formData,

            {
              headers: {

                Authorization:
                  `Bearer ${localStorage.getItem("token")}`,

                "Content-Type":
                  "multipart/form-data"
              }
            }
          );

        setSuccessMessage(
          response.data.message
        );

        setTimeout(() => {

          setSuccessMessage("");

        }, 3000);

        fetchDocuments();

      } catch (error) {

        console.log(error);

        alert(
          "Upload failed"
        );
      }
    };

  const uploadedCount =
    Object.keys(
      uploadedDocs
    ).length;

  return (

    <div className="bg-white p-8 rounded-3xl shadow-lg">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">

            Restaurant Verification

          </h1>

          <p className="text-gray-500 mt-2">

            Upload all required business documents

          </p>

        </div>

        <div className="bg-orange-100 text-orange-600 px-5 py-2 rounded-full font-semibold">

          {uploadedCount} / 5 Uploaded

        </div>

      </div>


      <div className="mb-8">

        <label className="block font-semibold mb-3 text-gray-700">

          Restaurant Name

        </label>

        <input
          type="text"

          placeholder="Enter restaurant name"

          value={hotelName}

          onChange={(e) =>
            setHotelName(
              e.target.value
            )
          }

          className="w-full border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-orange-500"
        />

      </div>
{successMessage && (

  <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-xl mb-5">

    {successMessage}

  </div>
)}
      <div className="space-y-5">

        {requiredDocuments.map(
          (docType) => (

          <div
            key={docType}

            className="border border-gray-200 rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition"
          >

            <div>

              <h2 className="text-xl font-semibold text-gray-800">

                {docType}

              </h2>

              <p className="text-sm mt-2">

                {uploadedDocs[
                  docType
                ]

                  ? (
                    <span className="text-green-600 font-semibold">

                      Uploaded ✅

                    </span>
                  )

                  : (
                    <span className="text-gray-500">

                      Pending Upload

                    </span>
                  )}
              </p>

            </div>

            <div className="flex items-center gap-4">

              <input
                type="file"

                onChange={(e) =>
                  handleFileChange(

                    docType,

                    e.target.files[0]
                  )
                }

                className="text-sm"
              />

              <button

                onClick={() =>
                  uploadDocument(
                    docType
                  )
                }

                className={`px-5 py-3 rounded-xl font-semibold text-white ${
                  uploadedDocs[
                    docType
                  ]

                    ? "bg-orange-500"

                    : "bg-blue-600"
                }`}
              >

                {uploadedDocs[
                  docType
                ]

                  ? "Update Document"

                  : "Upload"}

              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default UploadForm;