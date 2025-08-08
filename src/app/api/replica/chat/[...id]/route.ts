import { NextRequest, NextResponse } from "next/server";

const API_VERSION = process.env.API_VERSION || "";
const API_URL = "https://api.sensay.io/v1/replicas";
const API_KEY = process.env.ORGANIZATION_SECRET || "";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string[] }>;
  }
) {
  const { id } = await params;

  try {
    const res = await fetch(`${API_URL}/${id[1]}/chat/history/web`, {
      method: "GET",
      headers: {
        "X-ORGANIZATION-SECRET": API_KEY,
        "X-USER-ID": id[0],
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

export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string[] }>;
  }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const res = await fetch(`${API_URL}/${id[1]}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-ORGANIZATION-SECRET": API_KEY,
        "X-USER-ID": id[0],
        "X-API-Version": API_VERSION,
      },
      body: JSON.stringify(body),
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
