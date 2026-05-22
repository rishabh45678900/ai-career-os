"use client";

import { useState } from "react";
import ResumeUpload from "@/components/ResumeUpload";

export default function DashboardPage() {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<
    { role: string; content: string }[]
  >([]);

  const sendMessage = async () => {

    if (!message) return;

    // USER MESSAGE
    const newMessages = [

      ...messages,

      {
        role: "user",
        content: message,
      },

    ];

    setMessages(newMessages);

    // API CALL
    const res = await fetch("/api/chat", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        message,
      }),

    });

    const data = await res.json();

    // AI RESPONSE
    setMessages([

      ...newMessages,

      {
        role: "assistant",
        content: data.reply,
      },

    ]);

    setMessage("");

  };

  return (

    <main className="min-h-screen bg-black text-white p-8">

      {/* TITLE */}
      <h1 className="text-5xl font-bold mb-10">
        AI Career OS
      </h1>

      {/* TOP BUTTONS */}
      <div className="flex gap-4 mb-10 flex-wrap">

        <button className="bg-zinc-900 px-6 py-3 rounded-2xl border border-zinc-800 hover:bg-zinc-800 transition">

          New Chat

        </button>

        <button className="bg-zinc-900 px-6 py-3 rounded-2xl border border-zinc-800 hover:bg-zinc-800 transition">

          Resume Review

        </button>

        <button className="bg-zinc-900 px-6 py-3 rounded-2xl border border-zinc-800 hover:bg-zinc-800 transition">

          Interview Prep

        </button>

      </div>

      {/* RESUME UPLOAD */}
      <div className="mb-10">

        <ResumeUpload />

      </div>

      {/* CHAT SECTION */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

        <h2 className="text-3xl font-bold mb-2">
          AI Career Assistant
        </h2>

        <p className="text-gray-400 mb-8">
          Ask anything about coding, AI, careers, resumes, or interviews.
        </p>

        {/* CHAT MESSAGES */}
        <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={
                msg.role === "user"
                  ? "bg-violet-600 p-4 rounded-2xl ml-auto max-w-[80%]"
                  : "bg-black border border-zinc-800 p-4 rounded-2xl max-w-[80%]"
              }
            >

              {msg.content}

            </div>

          ))}

        </div>

        {/* INPUT */}
        <div className="flex gap-4">

          <input
            type="text"
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={(e) => {

              if (e.key === "Enter") {

                sendMessage();

              }

            }}
            placeholder="Ask AI anything..."
            className="flex-1 bg-black border border-zinc-800 rounded-2xl px-6 py-4 outline-none"
          />

          <button
            onClick={sendMessage}
            className="bg-violet-600 px-8 rounded-2xl hover:bg-violet-500 transition"
          >

            Send

          </button>

        </div>

      </div>

    </main>
  );
}