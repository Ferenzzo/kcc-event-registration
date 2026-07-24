export async function GET() {
  try {
    const response = await fetch(process.env.GOOGLE_SCRIPT_URL!, {
      method: "GET",
      cache: "no-store",
    });

    const result = await response.json();

    return Response.json(result);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Unable to load dashboard.",
      },
      { status: 500 }
    );
  }
}