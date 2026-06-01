const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAnalytics = async (req, res) => {

  try {

    const totalUsers =
      await prisma.user.count();

    const totalDocuments =
      await prisma.document.count();

    const approvedDocuments =
      await prisma.document.count({
        where: {
          status: "Approved"
        }
      });

    const rejectedDocuments =
      await prisma.document.count({
        where: {
          status: "Rejected"
        }
      });

    const pendingDocuments =
      await prisma.document.count({
        where: {
          status: "Pending"
        }
      });

    res.json({
      totalUsers,
      totalDocuments,
      approvedDocuments,
      rejectedDocuments,
      pendingDocuments
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getAnalytics
};