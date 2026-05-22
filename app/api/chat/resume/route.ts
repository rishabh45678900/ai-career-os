import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const formData =
      await req.formData();

    const file =
      formData.get("resume") as File;

    if (!file) {

      return NextResponse.json({

        error: "No file uploaded",

      });

    }

    const fileName = file.name;

    const fileSize =
      (
        file.size /
        1024 /
        1024
      ).toFixed(2) + " MB";

    // RANDOM AI SCORES
    const atsScore =
      Math.floor(
        Math.random() * 20
      ) + 80;

    const skillsScore =
      Math.floor(
        Math.random() * 20
      ) + 75;

    const experienceScore =
      Math.floor(
        Math.random() * 20
      ) + 70;

    let feedback =
      "Good resume. Add more projects and measurable achievements.";

    if (atsScore > 90) {

      feedback =
        "Excellent resume with strong ATS optimization and impressive technical skills.";

    } else if (
      atsScore < 80
    ) {

      feedback =
        "Resume needs improvement. Add technical projects, skills, and quantified achievements.";

    }

    return NextResponse.json({

      success: true,

      fileName,

      fileSize,

      atsScore,

      skillsScore,

      experienceScore,

      feedback,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({

      error:
        "Resume upload failed",

    });

  }

}