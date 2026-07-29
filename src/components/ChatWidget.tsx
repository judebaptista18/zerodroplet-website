"use client";
import { useState } from "react";
import { Button, Input } from "antd";
import { MessageOutlined, SendOutlined } from "@ant-design/icons";
type Msg = { role: "user" | "assistant"; content: string };
export function ChatWidget() {
  const [open, setOpen] = useState(false),
    [value, setValue] = useState(""),
    [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hello! Ask about water treatment, wastewater systems, maintenance, or requesting a site survey.",
    },
  ]);
  async function send() {
    if (!value.trim() || loading) return;
    const q = value;
    setValue("");
    setMessages((m) => [...m, { role: "user", content: q }]);
    setLoading(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
      });
      const d = await r.json();
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            d.answer ||
            "Please use the contact form and our engineering team will respond.",
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "The assistant is unavailable. Please send your query through the contact form.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {open && (
        <div className="chatPanel">
          <div className="chatHead">Zero Droplet Assistant</div>
          <div className="chatBody">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`bubble ${m.role === "user" ? "user" : ""}`}
              >
                {m.content}
              </div>
            ))}
          </div>
          <div className="chatForm">
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onPressEnter={send}
              placeholder="Type your question…"
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              loading={loading}
              onClick={send}
            />
          </div>
        </div>
      )}
      <button
        aria-label="Open chat"
        className="chatButton"
        onClick={() => setOpen((v) => !v)}
      >
        <MessageOutlined />
      </button>
    </>
  );
}
