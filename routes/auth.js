const express = require("express");
const router = express.Router();
var multer = require("multer");
const voucherController = require("../controller/voucher");
const perchasesController = require("../controller/perchases");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// vocuher routes
router.post("/voucher/create", voucherController.createVoucher);
router.post("/voucher/getVoucher", voucherController.getVoucher);
router.post("/voucher/getAllVoucher", voucherController.getAllVoucher);
router.post("/voucher/update", voucherController.updateVoucher);
router.post("/voucher/delete", voucherController.deleteVoucher);
router.post(
  "/voucher/upload",
  upload.single('file'),
  voucherController.createVoucherByExcelSheet
);

//perchases route
router.post("/perchases/create", perchasesController.createPerchases);
router.post("/perchases/getPerchases", perchasesController.getPerchases);
router.post("/perchases/getAllPerchases", perchasesController.getAllPerchases);
router.post("/perchases/update", perchasesController.updatePerchases);
router.post("/perchases/delete", perchasesController.deletePerchases);



module.exports = router;
