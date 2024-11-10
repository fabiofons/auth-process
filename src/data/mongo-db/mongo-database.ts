import mongoose from "mongoose";

interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {

  static async connect(options: Options) {

    const { mongoUrl, dbName } = options;

    try {
      await mongoose.connect(mongoUrl, {
        dbName: dbName
      });
      console.log('connected to db');
      return true;
    } catch (error) {
      console.log('connection to db failed');
      throw error;
    }
  }
}