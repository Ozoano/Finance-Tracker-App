import express from "express";
const router = express.Router();
const {
  getFinanceByUserID,
  DeleteFinance,
  UpdateFinance,
  CreateFinance,
  GetAllFinance,
} = require("../controllers/financialControllers");

/**
 * GET /
 * Get all finance
 */
router.get("/", GetAllFinance);

/**
 * GET /:ID
 * Get a finance
 */

router.get("/:userId", getFinanceByUserID);

/**
 * POST /:ID
 * create a finance
 */

router.post("/", CreateFinance);

/**
 * PUT /:ID
 * update a finance
 */

router.put("/:id", UpdateFinance);

/**
 * DELETE /:ID
 * delete a finance
 */

router.delete("/:id", DeleteFinance);

export default router;
