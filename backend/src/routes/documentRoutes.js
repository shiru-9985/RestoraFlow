const express =
  require("express");

const protect =
  require("../middleware/authMiddleware");

const authorizeRoles =
  require("../middleware/roleMiddleware");

const upload =
  require("../middleware/uploadMiddleware");

const {
  uploadDocument,
  getMyDocuments,
  getPendingDocuments,
  updateDocumentStatus,
  getManagerPendingDocuments
} = require("../controllers/documentController");

const router =
  express.Router();

router.post(

  "/upload",

  protect,

  authorizeRoles("Client"),

  upload.single("document"),

  uploadDocument
);
router.get(
  "/manager/pending",
  protect,
  authorizeRoles("Manager"),
  getManagerPendingDocuments
);
router.get(

  "/my-documents",

  protect,

  authorizeRoles("Client"),

  getMyDocuments
);

router.get(

  "/pending",

  protect,

  authorizeRoles("Verifier"),

  getPendingDocuments
);

router.put(

  "/:id/status",

  protect,

  authorizeRoles("Verifier"),

  updateDocumentStatus
);

router.get(

  "/manager-pending",

  protect,

  authorizeRoles("Manager"),

  getManagerPendingDocuments
);

module.exports = router;