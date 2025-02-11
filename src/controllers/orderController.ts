import asyncHandler from '../middleware/asyncHandler';
import Order from '../models/orderModel';
import { Request, Response } from 'express';
import { OrderItemsElement } from '../types';

// @desc    Create New Order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req: Request, res: Response) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  console.log('Received order data:', req.body); // Log received data

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No Order Items');
  } else {
    try {
      // Ensure totalPrice is calculated if not provided
      const calculatedTotalPrice = itemsPrice + taxPrice + shippingPrice;

      const order = new Order({
        orderItems: orderItems.map((x: OrderItemsElement) => ({
          ...x,
          _id: undefined,
          product: x.product, // Ensure this field is present
        })),
        user: req?.user?._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice: totalPrice ?? calculatedTotalPrice,
        paymentResult: undefined,
      });

      const createdOrder = await order.save();
      console.log('Order created successfully:', createdOrder); // Log success
      res.status(201).json(createdOrder);
    } catch (error) {
      console.error('Error creating order:', error); // Log error
      res.status(500);
      throw new Error('Server Error');
    }
  }
});

// @desc    Get Logged In Orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find({ user: req?.user?._id });
  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get Logged In Orders
// @route   GET /api/orders/:id
// @access  Private
const getOrderByID = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email',
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update Order to Paid
// @route   PUT /api/orders/:id/pay
// @access  Private
// Update Order to Paid
// Update Order to Paid
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email',
  );
  if (order) {
    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update Order to Delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email',
  );
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = new Date();
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get All Orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  console.log(req);
  const orders = await Order.find({}).populate('user', 'id name email');
  res.status(200).json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderByID,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
