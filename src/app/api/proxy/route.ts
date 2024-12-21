import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword") ?? "";
  const range = searchParams.get("range") ?? "";
  const lat = searchParams.get("lat") ?? "";
  const lng = searchParams.get("lng") ?? "";
  const id = searchParams.get("id") ?? "";

  const baseUrl = process.env.NEXT_PUBLIC_API_BASEURL;
  const apiKey = process.env.NEXT_PUBLIC_APIKEY;

  const targetUrl = `${baseUrl}?key=${apiKey}&keyword=${keyword}&range=${range}&lat=${lat}&lng=${lng}&id=${id}`;

  try {
    const response = await fetch(targetUrl);
    
    const data = await response.text();
    return new NextResponse(data, { status: 200 });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ error: "エラーが発生しました", details: error.message }),
      { status: 500 }
      
    );
  }
}
