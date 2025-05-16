import express from 'express';
import {itemPost, getRevenueByStoreAndMonth} from '../controller/item.controller.js';
const router = express.Router();

router.route("/itemsales").post(itemPost);
router.route("/revenuebystoremonth").get(getRevenueByStoreAndMonth);

export default router;