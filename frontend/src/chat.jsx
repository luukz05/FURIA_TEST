import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa6";
import { FiArrowLeft } from "react-icons/fi";
import { BsBagFill } from "react-icons/bs";

import typo from "./assets/typo.svg";
import avatar1 from "./assets/avatar1.png";
import Button from "./components/SubmitButton";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [cookies] = useCookies(["cpf", "fullName"]);
  const { cpf, fullName } = cookies;
  const navigate = useNavigate();

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/messages/global");
      const sorted = [...response.data].sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
      setMessages(sorted);
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // polling
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    const messageData = {
      senderId: cpf,
      senderName: fullName,
      content: newMessage.trim(),
    };

    try {
      await axios.post("http://localhost:5000/messages/global", messageData);
      setMessages((prev) => [
        ...prev,
        {
          sender_id: cpf,
          sender_name: fullName,
          content: newMessage.trim(),
          timestamp: new Date().toISOString(),
        },
      ]);
      setNewMessage("");
    } catch (error) {
      console.error("Erro ao enviar a mensagem:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-[url('./assets/bg-provisorio.png')] min-h-screen bg-cover bg-fixed bg-no-repeat text-white">
      {/* Header */}
      <header className="top-0 w-full z-50 fixed">
        <div className="flex items-center justify-between px-6 py-4 bg-white/15 backdrop-blur-xl">
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/home")}
              aria-label="Voltar para a página inicial"
              className="hover:scale-105 transition"
            >
              <FiArrowLeft className="text-white text-3xl" />
            </button>
            <button
              onClick={() => navigate("/loja")}
              aria-label="Abrir loja"
              className="hover:scale-105 transition"
            >
              <BsBagFill className="text-white text-3xl" />
            </button>
          </div>
          <img src={typo} className="h-11 object-contain invert" alt="Logo" />
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 bg-offwhite p-2 rounded-full hover:scale-105 transition text-offblack"
            aria-label="Abrir perfil"
          >
            <img src={avatar1} className="h-10 rounded-full" alt="Avatar" />
            <span>PERFIL</span>
          </button>
        </div>
      </header>

      {/* Mensagens */}
      <main className="backdrop-blur-xl pt-28 px-6 pb-24 flex flex-col gap-6 items-center">
        {messages.length === 0 ? (
          <p className="text-gray-300 mt-10">
            Nenhuma mensagem ainda. Seja o primeiro a enviar!
          </p>
        ) : (
          <div className="w-full max-w-3xl flex flex-col gap-5">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-xl flex flex-col p-5 shadow-md ${
                  msg.sender_id === cpf
                    ? "self-end bg-offblack text-white rounded-lg rounded-tr-none"
                    : "self-start bg-offwhite text-black rounded-lg rounded-tl-none"
                }`}
              >
                <span className="block font-bold text-left text-sm mb-1">
                  {msg.sender_id === cpf ? null : msg.sender_name}
                </span>

                <p className="mb-2 break-words">{msg.content}</p>
                <span className="text-xs text-right opacity-60">
                  {msg.timestamp
                    ? new Date(msg.timestamp).toLocaleString("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })
                    : "Sem data"}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Input de mensagem */}
      <div className="fixed bottom-0 left-0 w-full bg-white/20 backdrop-blur-md px-6 py-4 flex items-center gap-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Digite sua mensagem..."
          aria-label="Digite sua mensagem"
          className="w-full p-5 rounded-lg bg-white text-black placeholder-gray-600 focus:outline-8"
        />
        <button
          onClick={handleSendMessage}
          disabled={isSending}
          className={`p-5 px-20 rounded-lg transition ${
            isSending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          aria-label="Enviar mensagem"
        >
          <FaPaperPlane className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
