export async function POST(request: Request) {
  try {
    const body = await request.json();

    const payload = {
      email: body.email,
      fullname: body.fullname,
      age: body.age,
      sex: body.sex,
      school: body.school,
      adviser: body.adviser,
    };

    const response = await fetch(process.env.GOOGLE_SCRIPT_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    return Response.json(result);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Unable to save registration.",
      },
      { status: 500 }
    );
  }
}