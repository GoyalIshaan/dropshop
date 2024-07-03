// responsible for establising a connection to MongoDB
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // establishes the connection to the database
    const conn = await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error(`An unexpected error occurred`);
    }
    // exiting and killing the process
    process.exit(1);
  }
};

export default connectDB;
