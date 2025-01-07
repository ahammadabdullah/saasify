import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

interface SendEmailOptions {
  email: string;
  subject: string;
  content: string;
  scheduleTime?: Date | undefined;
}

async function sendEmail({
  email,
  subject,
  content,
  scheduleTime,
}: SendEmailOptions) {
  const payload = {
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: subject,
    html: content,
    ...(scheduleTime && { scheduledAt: new Date(scheduleTime).toISOString() }),
  };

  const { data, error } = await resend.emails.send(payload);

  if (error) {
    throw new Error(error.message || "Failed to send email");
  }
  return data;
}

export async function POST(req: NextRequest) {
  try {
    const { email, subject, content, scheduleTime } = await req.json();
    const data = await sendEmail({ email, subject, content, scheduleTime });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: error.status || 500 }
    );
  }
}
