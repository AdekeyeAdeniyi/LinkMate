import { NextResponse } from "next/server";

const API_VERSION = process.env.API_VERSION || "";
const API_URL = "https://api.sensay.io/v1/replicas";
const API_KEY = process.env.ORGANIZATION_SECRET || "";

export async function GET() {
  try {
    const res = await fetch(`${API_URL}`, {
      method: "GET",
      headers: {
        "X-ORGANIZATION-SECRET": API_KEY,
        "X-API-Version": API_VERSION,
      },
    });

    if (!res.ok) {
      const error = await res.text();
      return NextResponse.json({ error }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
