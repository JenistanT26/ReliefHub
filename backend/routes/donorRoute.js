import express from "express";
import {
  createDonorItem,
  getAllDonorItems,
  getDonorItemsByDonorId,
  getDonorItemById,
  submitDonationIntent,
  getAllDonationIntents,
  updateDonationIntentStatus,
  getDonationIntentsByRequestId,
  getDonationIntentsByRequestItemId,
  getDonationIntentsByDonorId
} from "../controllers/donorItemController.js";

const router = express.Router();

/* Create donor item + Get all donor items */
router.route("/donor-item")
  .post(createDonorItem)
  .get(getAllDonorItems);

/* Get donor items by donor id */
router.route("/donor-item/donor/:donorId")
  .get(getDonorItemsByDonorId);

/* Get single donor item */
router.route("/donor-item/item/:itemId")
  .get(getDonorItemById);

/* Submit donation intent */
router.route("/donation-intent")
  .post(submitDonationIntent)
  .get(getAllDonationIntents);

/* Approve / Reject donation intent */
router.route("/donation-intent/:id")
  .patch(updateDonationIntentStatus);

router.route("/donation-intents/requestId/:id")
  .get(getDonationIntentsByRequestId);

router.route("/request-item/:requestItemId")
  .get(getDonationIntentsByRequestItemId);

router.route("/donor/:donorId")
  .get(getDonationIntentsByDonorId);

export default router;