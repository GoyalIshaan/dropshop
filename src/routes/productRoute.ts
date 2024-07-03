import express from 'express';
import {
  getProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
  createReview,
  getReviews,
} from '../controllers/productController';
import { admin, protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router
  .route('/:id')
  .get(getProductByID)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router
  .route('/:id/reviews')
  .get(protect, getReviews)
  .post(protect, createReview);

export default router;
