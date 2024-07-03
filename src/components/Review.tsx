import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  useCreateReviewMutation,
  useGetReviewsQuery,
} from '../slices/productsAPISlice';
import { Review } from '../types';
import { toast } from 'react-toastify';
import Loader from './Loader';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Rating from './Rating';

interface ReviewProps {
  productId: string;
}

interface IFormInput {
  rating: number;
  comment: string;
}

const ReviewSection: React.FC<ReviewProps> = ({ productId }) => {
  const {
    data: reviews,
    isLoading,
    isError,
    refetch: refetchReviews,
  } = useGetReviewsQuery(productId);
  const [createReview, { isLoading: isSubmitting }] = useCreateReviewMutation();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  useEffect(() => {
    if (reviews && userInfo) {
      const userHasReviewed = reviews.find(
        (review: Review) => review.user === userInfo._id,
      );
      setAlreadyReviewed(Boolean(userHasReviewed));
    }
  }, [reviews, userInfo]);

  const onSubmit: SubmitHandler<IFormInput> = async ({ rating, comment }) => {
    try {
      await createReview({ id: productId, rating, comment }).unwrap();
      toast.success('Review added successfully');
      reset();
      refetchReviews();
    } catch (error) {
      toast.error('Failed to add review');
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !reviews) {
    return <div>Reviews not found</div>;
  }

  return (
    <div className="review-section mt-8">
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
      <ul className="space-y-4">
        {reviews.map((review: Review) => (
          <li
            key={review.user._id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold">{review.name}</h4>
                <div className="flex">
                  <Rating rating={review.rating} />
                </div>
              </div>
              <p>{review.comment}</p>
            </div>
          </li>
        ))}
      </ul>
      {!alreadyReviewed && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Rating</label>
              <select
                {...register('rating', { required: 'Rating is required' })}
                className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <option value="">Select...</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
              {errors.rating && (
                <p className="text-red-500 text-sm">{errors.rating.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Comment</label>
              <textarea
                {...register('comment', { required: 'Comment is required' })}
                className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
                rows={4}
              ></textarea>
              {errors.comment && (
                <p className="text-red-500 text-sm">{errors.comment.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
