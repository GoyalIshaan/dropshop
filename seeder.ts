import dotenv from 'dotenv';
import 'colors';
import users from './src/models/users';
import products from './src/products';
import User from './src/models/userModel';
import Product from './src/models/productModel';
import Order from './src/models/orderModel';
import connectDB from './src/db';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);
    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(error.message.red.inverse);
  }
};

const destoryData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(error.message.red.inverse);
  }
};

if (process.argv[2] === '-d') {
  destoryData();
} else {
  importData();
}
