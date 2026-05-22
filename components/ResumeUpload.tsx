"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function ResumeUpload() {

  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");

  const [score, setScore] =
    useState<number | null>(null);

  const [skillsScore, setSkillsScore] =
    useState<number | null>(null);

  const [experienceScore, setExperienceScore] =
    useState<number | null>(null);

  const [feedback, setFeedback] = useState("");

  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {

    const file = acceptedFiles[0];

    if (file) {

      setLoading(true);

      // API CALL
      const formData = new FormData();

      formData.append("file", file);

      const res = await fetch("/api/resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      console.log(data);

      // FILE INFO
      setFileName(file.name);

      setFileSize(
        (file.size / 1024 / 1024).toFixed(2) + " MB"
      );

      // RANDOM SCORES
      const randomScore =
        Math.floor(Math.random() * 20) + 80;

      setScore(randomScore);

      setSkillsScore(
        Math.floor(Math.random() * 20) + 80
      );

      setExperienceScore(
        Math.floor(Math.random() * 20) + 75
      );

      // FEEDBACK
      if (randomScore > 90) {

        setFeedback(
          "Excellent resume. Strong ATS compatibility and impressive skills."
        );

      } else if (randomScore > 80) {

        setFeedback(
          "Good resume. Add more projects and measurable achievements."
        );

      } else {

        setFeedback(
          "Resume needs improvement. Add technical skills and real-world projects."
        );

      }

      setLoading(false);

    }

  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({

    onDrop,

    accept: {
      "application/pdf": [".pdf"],
    },

  });

  return (

    <div className="space-y-6">

      {/* UPLOAD BOX */}
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-zinc-700 p-10 rounded-3xl text-center cursor-pointer bg-zinc-900 hover:bg-zinc-800 transition"
      >

        <input {...getInputProps()} />

        {isDragActive ? (

          <p className="text-xl">
            Drop your resume here...
          </p>

        ) : (

          <div>

            <h2 className="text-3xl font-bold mb-3">
              Upload Resume
            </h2>

            <p className="text-gray-400">
              Drag & drop your PDF resume here
            </p>

          </div>

        )}

      </div>

      {/* LOADING */}
      {loading && (

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <p className="text-lg animate-pulse">
            Analyzing Resume...
          </p>

        </div>

      )}

      {/* RESULT */}
      {fileName && !loading && (

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6">

          <div>

            <h2 className="text-3xl font-bold mb-2">
              Resume Uploaded ✅
            </h2>

            <p className="text-gray-300">
              {fileName}
            </p>

            <p className="text-gray-500 text-sm mt-1">
              {fileSize}
            </p>

          </div>

          {/* SCORES */}
          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-black border border-zinc-800 rounded-3xl p-6">

              <h3 className="text-gray-400">
                ATS Score
              </h3>

              <h1 className="text-5xl font-bold mt-4 text-violet-400">
                {score}%
              </h1>

            </div>

            <div className="bg-black border border-zinc-800 rounded-3xl p-6">

              <h3 className="text-gray-400">
                Skills Score
              </h3>

              <h1 className="text-5xl font-bold mt-4 text-green-400">
                {skillsScore}%
              </h1>

            </div>

            <div className="bg-black border border-zinc-800 rounded-3xl p-6">

              <h3 className="text-gray-400">
                Experience Score
              </h3>

              <h1 className="text-5xl font-bold mt-4 text-yellow-400">
                {experienceScore}%
              </h1>

            </div>

          </div>

          {/* FEEDBACK */}
          <div className="bg-black border border-zinc-800 rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-4">
              AI Resume Feedback
            </h2>

            <p className="text-gray-300 leading-8">
              {feedback}
            </p>

          </div>

        </div>

      )}

    </div>
  );
}