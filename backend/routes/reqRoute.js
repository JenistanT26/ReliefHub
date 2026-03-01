import express from "express";
import { createReq, getMyreq, getOpenRequests, getRequestById, updateRequestStatus } from "../controllers/reqController.js";

const router=express.Router()

router.route('/request')
                .post(createReq)
                .get(getMyreq)
router.route('/request/open')
                .get(getOpenRequests)
router.route('/request/:id')
                .get(getRequestById)
                .patch(updateRequestStatus)


export default router