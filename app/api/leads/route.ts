import { NextRequest, NextResponse } from "next/server";
import { createLead } from "@/actions/leads";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await createLead(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({ leadId: result.leadId });
  } catch (err) {
    console.error("POST /api/leads error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
