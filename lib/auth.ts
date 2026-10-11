import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client, db } from "./db";

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
  // একই ইমেইলের অ্যাকাউন্টগুলো নিজে নিজে জুড়ে দেবে
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});