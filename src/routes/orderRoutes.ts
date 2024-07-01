import express from 'express';
import {
  addOrderItems,
  getMyOrders,
  getOrderByID,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from '../controllers/orderController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, admin, getOrderByID);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;
