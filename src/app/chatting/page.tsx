"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

// 메시지 데이터 타입 정의
type Message = {
  id: number;
  text: string;
  sender: "user" | "chatbot";
};

const Chatting = () => {
  const [response, setResponse] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "안녕하세요",
      sender: "chatbot",
    },
    { id: 2, text: "질문에 대답해줘.", sender: "user" },
  ]);

  const chatMutation = useMutation({
    mutationFn: async (query: string): Promise<Message> => {
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
      const responseMessage: Message = {
        id: messages.length + 2,
        text: data.message,
        sender: "chatbot",
      };
      return responseMessage;
    },
    onSuccess: (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      setIsLoading(false);
    },
    onError: (error) => {
      setResponse(`오류: ${error.message}`);
      setIsLoading(false);
    },
  });

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    setIsInputEmpty(e.currentTarget.innerText.length === 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault(); //기본 줄바꿈 동작 방지
      handleSendClick();
    }
  };

  const handleSendClick = () => {
    if (
      !isLoading &&
      inputRef.current &&
      inputRef.current.innerText.trim().length > 0
    ) {
      const userMessageText = inputRef.current.innerText.trim();
      if (isInputEmpty) {
        inputRef.current.focus();
        return;
      }

      const newUserMessage: Message = {
        id: messages.length + 1,
        text: userMessageText,
        sender: "user",
      };

      // 사용자 메시지 추가
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      inputRef.current!.innerText = ""; // 입력창 비우기
      setIsInputEmpty(true);

      setIsLoading(true); // 로딩 시작

      chatMutation.mutate(userMessageText);
    }
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
        {/* 로딩 상태일 때만 로딩 컴포넌트 렌더링 */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-xs p-3 text-black bg-gray-200 shadow-lg md:p-4 rounded-3xl sm:max-w-sm md:max-w-lg rounded-bl-md">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse-fast"></div>
                <div className="w-2 h-2 delay-75 bg-gray-500 rounded-full animate-pulse-fast"></div>
                <div className="w-2 h-2 delay-150 bg-gray-500 rounded-full animate-pulse-fast"></div>
              </div>
            </div>
          </div>
        )}
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
            onKeyDown={handleKeyDown}
            ref={inputRef}
            className="relative flex-1 p-3 md:p-4 rounded-2xl bg-white text-black resize-none outline-none focus:ring-2 focus:ring-blue-500/60 transition-shadow min-h-[48px] overflow-hidden flex items-center"
          >
            {isInputEmpty && (
              <span className="absolute text-gray-400 -translate-y-1/2 pointer-events-none top-1/2 left-4">
                저에 대해 궁금한점을 질문해 주세요.
              </span>
            )}
          </div>
          <div
            onClick={handleSendClick}
            className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-white transition-all duration-200 bg-blue-500 rounded-full shadow-lg cursor-pointer hover:bg-blue-600"
          >
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
