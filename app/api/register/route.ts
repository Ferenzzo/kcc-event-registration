export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Registration received:", body);

    const payload = {
      email: body.email,
      fullname: body.fullname,
      age: body.age,
      sex: body.sex,
      gradeLevel: body.gradeLevel,
      school: body.school,
      adviser: body.adviser,
    };

    console.log("Sending to Google:", payload);

    const response = await fetch(process.env.GOOGLE_SCRIPT_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    console.log("Google response:", result);

    return Response.json(result);
  } catch (error) {
    console.error("Registration error:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to save registration.",
      },
      { status: 500 }
    );
  }
}