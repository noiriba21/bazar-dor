# 🛒 বাজার দর (BazarDor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে দেখার ওয়েবসাইট। চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার আজকের দাম, দাম বাড়া-কমার হার এবং বিভাগভিত্তিক বাজারদর এখানে পাওয়া যায়।

🔗 **লাইভ লিংক:**
## ব্যবহৃত প্রযুক্তি

- Next.js (App Router) ও TypeScript
- Tailwind CSS ও DaisyUI
- Better Auth (ইমেইল-পাসওয়ার্ড, Google, GitHub)
- MongoDB Atlas
- react-hot-toast

## মূল ফিচার

1. চলমান দামের পট্টি (ticker) ও বাংলা তারিখসহ Navbar
2. আজ কোন পণ্যের দাম সবচেয়ে বেশি বেড়েছে ও কমেছে তার আলাদা তালিকা
3. ক্যাটাগরি অনুযায়ী পণ্য দেখা এবং দাম অনুযায়ী সাজানো (sort)
4. লগইন করা ব্যবহারকারীর জন্য পণ্যের বিস্তারিত পেজ: সর্বনিম্ন, সর্বোচ্চ ও গড় দাম এবং বাজারভিত্তিক দাম
5. সাইন ইন, সাইন আপ ও সোশ্যাল লগইন, সাথে toast বার্তা
6. প্রোফাইল দেখা ও নাম আপডেট করা
7. লোডিং স্কেলেটন, ৪০৪ পেজ এবং মোবাইল-ট্যাবলেট-ডেস্কটপে responsive ডিজাইন

## চালানোর নিয়ম

```bash
npm install
npm run dev
```

প্রজেক্টের root-এ `.env` ফাইলে এই চলকগুলো দিতে হবে: `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`।

## ডাটার উৎস

`https://openapi.programming-hero.com/api/bazardor`