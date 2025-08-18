"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const Chatting = () => {
  const [response, setResponse] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(true);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "안녕하세요",
      sender: "gemini",
    },
    { id: 2, text: "질문에 대답해줘.", sender: "user" },
  ]);

  const mutation = useMutation({
    mutationFn: async (query) => {
      const res = await fetch("/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      setResponse(data.message);
    },
    onError: (error) => {
      setResponse(`오류: ${error.message}`);
    },
  });

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    setIsInputEmpty(e.currentTarget.innerText.trim().length === 0);
  };

  return (
    <div className="text-black bg-white">
      <main className="w-full max-w-2xl min-h-screen p-4 mx-auto space-y-3 md:p-8 md:max-w-3xl">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 md:p-4 rounded-3xl max-w-xs sm:max-w-sm md:max-w-lg shadow-lg transform transition-all duration-300 ease-in-out ${
                msg.sender === "user"
                  ? "bg-blue-200 text-black rounded-br-md"
                  : "bg-gray-200 text-black rounded-bl-md"
              }`}
            >
              <p className="font-medium">{msg.text}</p>
            </div>
          </div>
        ))}
      </main>

      <footer className="sticky bottom-0 flex justify-center w-full p-4 bg-gray-100 border-t border-gray-300">
        <div className="flex items-end w-full max-w-2xl space-x-2 md:max-w-3xl">
          <div
            contentEditable="true"
            onInput={handleInput}
            onFocus={() => setIsInputEmpty(false)}
            onBlur={(e) =>
              setIsInputEmpty(e.currentTarget.innerText.trim().length === 0)
            }
            className="relative flex-1 p-3 md:p-4 rounded-2xl bg-white text-black resize-none outline-none focus:ring-2 focus:ring-blue-500/60 transition-shadow min-h-[48px] overflow-hidden flex items-center"
          >
            {isInputEmpty && (
              <span className="absolute text-gray-400 -translate-y-1/2 pointer-events-none top-1/2 left-4">
                저에 대해 궁금한점을 질문해 주세요.
              </span>
            )}
          </div>
          <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-white transition-all duration-200 bg-blue-500 rounded-full shadow-lg cursor-pointer hover:bg-blue-600">
            <svg
              className="w-5 h-5 md:w-6 md:h-6 transform translate-x-[1px]"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Chatting;
