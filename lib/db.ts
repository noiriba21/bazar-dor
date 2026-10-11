import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI .env ফাইলে পাওয়া যায়নি");
}

const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient;
};

export const client = globalForMongo.mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = client;
}

export const db = client.db();