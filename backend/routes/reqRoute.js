import express from "express";
import { createReq, deleteRequest, editRequest, getMyreq, getOpenRequests, getRequestById, updateRequestStatus } from "../controllers/reqController.js";

const router=express.Router()

router.route('/request')
                .post(createReq)
                .get(getMyreq)
router.route('/request/open')
                .get(getOpenRequests)
router.route('/request/:id')
                .get(getRequestById)
                .patch(updateRequestStatus)
                .delete(deleteRequest)
router.route('/request/edit/:id')
                .patch(editRequest)


export default router