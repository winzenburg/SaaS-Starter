import { NextResponse } from "next/server";

/**
 * Example Vercel Cron job
 * Configure in vercel.json or Vercel dashboard
 */
export async function GET(request: Request) {
  // Verify the request is from Vercel Cron
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Your cron job logic here
  // Example: send emails, update data, etc.

  return NextResponse.json({ success: true });
}

