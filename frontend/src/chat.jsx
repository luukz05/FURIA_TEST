import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa6";
import { FiArrowLeft } from "react-icons/fi";
import { BsBagFill } from "react-icons/bs";
import Marquee from "react-fast-marquee";
import typo from "./assets/typo.svg";
import avatar1 from "./assets/avatar1.png";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [cookies] = useCookies(["cpf", "fullName"]);
  const { cpf, fullName } = cookies;
  const navigate = useNavigate();
  const endOfMessagesRef = useRef(null);
  const [news, setNews] = useState([
    "FURIA confirma participação no Major de CS2 com nova line-up e coach internacional!",
    "FURIA Store lança coleção limitada 'Raça Preta' com camisetas, jaquetas e acessórios exclusivos.",
    "Sofia Espanha e Tilia invadem o QG FURIOSO com live especial: bastidores, desafios e histórias da org!",
    "Nova collab FURIA x Adidas chega ao Brasil com peças urbanas e performance — estoque limitado!",
    "Modo 'Fúria Total': FelipoX e Jv92 se enfrentam em série de desafios no bootcamp oficial da org!",
    "Série documental 'Além do Jogo' mostra a rotina intensa dos atletas da FURIA — episódios semanais!",
    "Psicóloga oficial da FURIA fala sobre preparo mental em campeonatos — veja entrevista completa!",
    "FURIA expande para nova modalidade: revelado novo time feminino de VALORANT internacional.",
    "Alerta de evento: Arena FURIA em SP recebe torcedores para assistir à final da BLAST juntos!",
  ]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        "https://furia-test-ashy.vercel.app/messages/global"
      );
      const sorted = [...response.data].sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
      setMessages(sorted);
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error);
    }
  };

  // Executa ao montar o componente e faz polling
  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  // Faz scroll automático sempre que as mensagens forem atualizadas
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    const trimmedMessage = newMessage.trim();

    // Se a mensagem começar com "/", trata como comando
    if (trimmedMessage.startsWith("/")) {
      if (trimmedMessage === "/steam") {
        try {
          const res = await axios.get(
            `https://furia-test-ashy.vercel.app/user/${cpf}`
          );
          const steamLink = res.data?.socials?.steam;

          const contentToSend = steamLink
            ? `Meu perfil da Steam: <a href="${steamLink}" target="_blank" rel="noopener noreferrer" class="underline text-blue-400 hover:text-blue-600">clique aqui</a>`
            : "Você ainda não cadastrou seu perfil da Steam.";

          // Envia para o backend
          await axios.post(
            "https://furia-test-ashy.vercel.app/messages/global",
            {
              senderId: cpf,
              senderName: fullName,
              content: contentToSend,
            }
          );

          // Atualiza localmente
          setMessages((prev) => [
            ...prev,
            {
              sender_id: cpf,
              sender_name: fullName,
              content: contentToSend,
              timestamp: new Date().toISOString(),
            },
          ]);
        } catch (error) {
          console.error("Erro ao buscar perfil:", error);
          const fallbackMsg = "Erro ao buscar seu perfil da Steam.";

          await axios.post(
            "https://furia-test-ashy.vercel.app/messages/global",
            {
              senderId: cpf,
              senderName: fullName,
              content: fallbackMsg,
            }
          );

          setMessages((prev) => [
            ...prev,
            {
              sender_id: cpf,
              sender_name: fullName,
              content: fallbackMsg,
              timestamp: new Date().toISOString(),
            },
          ]);
        }
      }
      setNewMessage(""); // Limpa a mensagem
      setIsSending(false); // Reativa o botão de envio
      return; // Não envia mensagem normal se for um comando
    }

    // Se não for um comando, envia mensagem normal
    const messageData = {
      senderId: cpf,
      senderName: fullName,
      content: newMessage.trim(),
    };

    try {
      await axios.post(
        "https://furia-test-ashy.vercel.app/messages/global",
        messageData
      );
      setMessages((prev) => [
        ...prev,
        {
          sender_id: cpf,
          sender_name: fullName,
          content: newMessage.trim(),
          timestamp: new Date().toISOString(),
        },
      ]);
      setNewMessage(""); // Limpa a mensagem após envio
    } catch (error) {
      console.error("Erro ao enviar a mensagem:", error);
    } finally {
      setIsSending(false); // Reativa o botão de envio após a mensagem ser enviada
    }
  };

  return (
    <>
      <div className="bg-[url('./assets/bg-provisorio.png')] min-h-screen bg-cover bg-fixed bg-no-repeat text-white flex">
        {/* Seletor de Chat (Esquerda) */}

        <div className="w-1/3 bg-white/20 p-4 flex flex-col gap-6 fixed top-0 left-0 h-full overflow-y-auto">
          <div className="flex items-center justify-between">
            <img src={typo} className="h-11 object-contain invert" alt="Logo" />
            <div className="flex gap-5">
              <div className="flex items-center justify-between gap-5">
                <button
                  onClick={() => navigate("/home")}
                  aria-label="Voltar para a página inicial"
                  className="hover:scale-105 transition"
                >
                  <FiArrowLeft className="text-white text-3xl" />
                </button>
              </div>
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 bg-offwhite p-2 rounded-full hover:scale-105 transition text-offblack"
                aria-label="Abrir perfil"
              >
                <img src={avatar1} className="h-10 rounded-full" alt="Avatar" />
                <span>PERFIL</span>
              </button>
            </div>
          </div>
          <div className="w-full flex overflow-hidden bg-offblack py-2 px-4 rounded-xl shadow-md">
            <Marquee className=" text-xl font-bold" speed={90}>
              {Object.values(news).map((headline) => (
                <div className="inline-flex px-8 py-1">
                  <a href="#" className="hover:underline">
                    {headline}
                  </a>
                </div>
              ))}
            </Marquee>
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto flex-1">
            {["Global", "CSGO", "VALORANT", "LOL"].map((chatName, index) => (
              <div
                key={index}
                className="border-b-1 text-left chat-item flex items-center p-3 hover:bg-white/10 cursor-pointer"
              >
                <img
                  src={avatar1}
                  className="h-10 w-10 rounded-full"
                  alt="Avatar"
                />
                <div className="ml-3">
                  <span className="font-bold">Chat {chatName}</span>
                  <p className="text-sm text-gray-300">Última mensagem...</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat (Direita) */}
        <div className="w-full ml-1/3 bg-[url('./assets/bg-provisorio.png')] scroll overflow-y-auto min-h-screen bg-cover bg-fixed bg-no-repeat flex flex-col">
          <main className=" flex-1 pt-10 px-6 pb-30 flex flex-col gap-6 items-center scroll overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-gray-300 mt-10">
                Nenhuma mensagem ainda. Seja o primeiro a enviar!
              </p>
            ) : (
              <div className="w-1/2 flex flex-col ml-[70vh] gap-5">
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
                    <p
                      className="mb-2 break-words"
                      dangerouslySetInnerHTML={{ __html: msg.content }}
                    ></p>
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
                <div ref={endOfMessagesRef} />
              </div>
            )}
          </main>

          <div className="fixed bottom-0 left-1/3 w-[66.5vw] bg-offblack/95  px-6 py-4 flex items-center gap-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Digite sua mensagem..."
              aria-label="Digite sua mensagem"
              className="w-11/15 p-5 rounded-lg bg-white text-black placeholder-gray-600 focus:outline-5"
            />
            <p className="flex flex-col">
              Comandos: /steam /faceit /gc /discord /twitter
            </p>
            <button
              onClick={handleSendMessage}
              disabled={isSending}
              className={`p-5 px-20 rounded-lg transition ${
                isSending
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-black hover:scale-105"
              }`}
              aria-label="Enviar mensagem"
            >
              <FaPaperPlane className="text-xl " />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
