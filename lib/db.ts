import dns from "node:dns";
import { MongoClient } from "mongodb";

// কিছু ISP-তে mongodb+srv DNS lookup আটকে যায়, তাই পাবলিক DNS ব্যবহার করছি
if (process.env.NODE_ENV !== "production") {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

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