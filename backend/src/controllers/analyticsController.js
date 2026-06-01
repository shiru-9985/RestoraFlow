const prisma = require("../config/prisma");

const getDashboardStats = async (req, res) => {
  try {

    const totalUsers = await prisma.user.count();

    const totalDocuments = await prisma.document.count();

    const approvedDocuments = await prisma.document.count({
      where: {
        status: "Approved"
      }
    });

    const pendingDocuments = await prisma.document.count({
      where: {
        status: "Pending"
      }
    });

    const rejectedDocuments = await prisma.document.count({
      where: {
        status: "Rejected"
      }
    });

    res.status(200).json({
      totalUsers,
      totalDocuments,
      approvedDocuments,
      pendingDocuments,
      rejectedDocuments
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getDashboardStats
};