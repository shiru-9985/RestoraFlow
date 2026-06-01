const prisma = require("../config/prisma");

const uploadDocument =
  async (req, res) => {

    try {

      console.log(req.body);
      console.log(req.file);

      if (!req.file) {

        return res.status(400).json({
          message: "No file uploaded"
        });
      }

      const document =
        await prisma.document.create({

          data: {

            title:
              req.body.title || "Document",

            documentType:
              req.body.documentType || null,

            hotelName:
              req.body.hotelName || null,

            fileUrl:
              req.file.location,

            status:
              "Pending",

            userId:
              req.user.id
          }
      });

      res.status(201).json({

        message:
          "Uploaded successfully",

        document
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message
      });
    }
};

const getMyDocuments = async (
  req,
  res
) => {

  try {

    const documents =
      await prisma.document.findMany({

        where: {
          userId: req.user.id
        }
      });

    res.status(200).json(
      documents
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

const getPendingDocuments =
  async (req, res) => {

    try {

      const documents =
        await prisma.document.findMany({

          where: {
            status: "Pending"
          },

          include: {

            user: {

              select: {
                id: true,
                name: true,
                email: true,
                role: true
              }
            }
          }
        });

      res.status(200).json(
        documents
      );

    } catch (error) {

      res.status(500).json({
        message: error.message
      });
    }
};

const updateDocumentStatus =
  async (req, res) => {

    try {

      const {
        status,
        remarks
      } = req.body;

      let updatedStatus =
        status;

      if (
        status === "Approved"
      ) {

        updatedStatus =
          "VerifierApproved";
      }

      const document =
        await prisma.document.update({

          where: {
            id: req.params.id
          },

          data: {
            status:
              updatedStatus,

            remarks
          }
        });

      res.status(200).json({

        message:
          "Document updated successfully",

        document
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });
    }
};

const getManagerPendingDocuments =
  async (req, res) => {

    try {

      const documents =
        await prisma.document.findMany({

          include: {

            user: {

              select: {
                id: true,
                name: true,
                email: true
              }
            }
          },

          orderBy: {
            createdAt: "desc"
          }
        });

      res.status(200).json(
        documents
      );

    } catch (error) {

      res.status(500).json({
        message: error.message
      });
    }
};
const managerApproveDocument =
  async (req, res) => {

    try {

      const document =
        await prisma.document.update({

          where: {
            id: req.params.id
          },

          data: {
            status:
              "ManagerApproved"
          }
        });

      res.status(200).json({

        message:
          "Manager approved document",

        document
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });
    }
};

module.exports = {

  uploadDocument,

  getMyDocuments,

  getPendingDocuments,

  updateDocumentStatus,

  getManagerPendingDocuments,

  managerApproveDocument
};