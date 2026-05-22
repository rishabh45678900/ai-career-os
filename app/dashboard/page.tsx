"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Brain,
  Briefcase,
  Settings,
  Bell,
  User,
  Send,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "⚠️ Error" }]);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white flex">

      {/* SIDEBAR */}
      <aside className="w-[280px] border-r border-white/10 p-6 hidden md:flex md:flex-col">
        <h1 className="text-3xl font-bold mb-12">AI OS</h1>
        <div className="space-y-6 text-gray-300 flex-1">
          <Link href="/dashboard" className="flex items-center gap-3 hover:text-white"><Home /><span>Dashboard</span></Link>
          <Link href="/ai-tools" className="flex items-center gap-3 hover:text-white"><Brain /><span>AI Tools</span></Link>
          <Link href="/careers" className="flex items-center gap-3 hover:text-white"><Briefcase /><span>Careers</span></Link>
          <Link href="/notifications" className="flex items-center gap-3 hover:text-white"><Bell /><span>Notifications</span></Link>
          <Link href="/settings" className="flex items-center gap-3 hover:text-white"><Settings /><span>Settings</span></Link>
        </div>
      </aside>

      {/* MAIN CONTENT - ONLY AI CHAT */}
      <section className="flex-1 flex flex-col h-screen overflow-hidden">

        {/* TOPBAR */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
          <div>
            <h2 className="text-3xl font-bold">Welcome Back 👋</h2>
            <p className="text-gray-400">Your AI career assistant is ready to help.</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center"><User size={20} /></div>
        </div>

        {/* AI CHAT SECTION - FULL PAGE */}
        <div className="flex-1 flex flex-col p-6 min-h-0">
          <div className="flex-1 flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            
            <div className="p-5 border-b border-white/10">
              <h2 className="text-2xl font-bold">AI Career Assistant</h2>
              <p className="text-gray-400 text-sm">Ask anything about coding, AI, careers, resumes, or interviews.</p>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">
                  <p>🤖 Ask me anything about your career!</p>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] p-4 rounded-2xl ${msg.role === "user" ? "bg-violet-600" : "bg-white/10 border border-white/20"}`}>
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))
              )}
              {loading && <div className="bg-white/10 p-4 rounded-2xl w-fit">🤔 Thinking...</div>}
            </div>

            <div className="p-5 border-t border-white/10">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask AI anything..."
                  className="flex-1 bg-black border border-white/10 rounded-xl px-5 py-3 outline-none focus:border-violet-600"
                />
                <button onClick={sendMessage} disabled={loading || !input.trim()} className="bg-violet-600 px-6 rounded-xl hover:bg-violet-500 disabled:opacity-50">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}