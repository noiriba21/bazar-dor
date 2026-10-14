import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET(request: Request) {
  const { pathname } = new URL(request.url);

  const names = [
    "MONGODB_URI",
    "BETTER_AUTH_SECRET",
    "BETTER_AUTH_URL",
    "NEXT_PUBLIC_APP_URL",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GITHUB_CLIENT_ID",
    "GITHUB_CLIENT_SECRET",
  ];
  const env = Object.fromEntries(
    names.map((n) => [n, Boolean(process.env[n])]),
  );

  let mongo = "ok";
  try {
    const c = new MongoClient(process.env.MONGODB_URI as string, {
      serverSelectionTimeoutMS: 6000,
    });
    await c.connect();
    await c.close();
  } catch (e) {
    const err = e as Error;
    mongo = `${err.name}: ${err.message
      .split("\n")[0]
      .replace(/\/\/[^@]*@/, "//***@")}`;
  }

  return NextResponse.json({ pathname, env, mongo });
}