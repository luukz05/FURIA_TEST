import { useState, useEffect } from "react";
import { FaGamepad, FaUserAlt, FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { BsCameraReelsFill } from "react-icons/bs";
import cookie from "react-cookies";
import axios from "axios";
import { BiSolidParty } from "react-icons/bi";
import Modal from "./components/Modal";

import Button from "./components/SubmitButton";

export default function FanForm() {
  const [formData, setFormData] = useState({
    jogos: [],
    jogador: [],
    criador: [],
    conteudo: [],
    eventos: [],
    produtos: [],
  });
  const [cpf, setCpf] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success"); // Tipo pode ser 'success' ou 'error'

  useEffect(() => {
    const cookieFullName = cookie.load("fullName");
    const cookieCpf = cookie.load("cpf");
    setFullName(cookieFullName);
    setCpf(cookieCpf);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const list = formData[name] || [];
      if (checked) {
        setFormData({ ...formData, [name]: [...list, value] });
      } else {
        setFormData({ ...formData, [name]: list.filter((v) => v !== value) });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const checkboxGroup = (labelIcon, labelText, name, options) => (
    <div className="text-center flex flex-col items-center-safe">
      <label className="font-semibold mb-10 mt-16 flex items-center justify-center gap-2 text-2xl">
        {labelIcon} {labelText}
      </label>
      <div className="ml-6 grid grid-cols-5 gap-10">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2">
            <input
              type="checkbox"
              name={name}
              value={opt.value}
              onChange={handleChange}
              className="form-checkbox"
              key={opt.value}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.jogos.length === 0) {
      setModalMessage("Por favor, selecione pelo menos um jogo.");
      setModalType("error");
      setIsModalOpen(true);
      return;
    }

    try {
      const response = await axios.patch(`http://127.0.0.1:5000/users/${cpf}`, {
        interests: formData,
      });

      console.log("Usuário atualizado:", response.data);
      setModalMessage("Formulário enviado com sucesso!");
      setModalType("success");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      setModalMessage("Erro ao enviar formulário. Tente novamente.");
      setModalType("error");
      setIsModalOpen(true);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-fixed bg-cover bg-no-repeat flex-col p-5"
      style={{ backgroundImage: `url('./assets/bg-provisorio.png')` }}
    >
      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
        url={"/socials"}
      />
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaUserAlt /> Bora te conhecer melhor,{" "}
        <span className="text-2xl">{fullName || "Visitante"}</span>!
      </h1>
      <div className="w-8/20 pl-16 pr-16 pb-16 bg-white/15 backdrop-blur-xl rounded-xl">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 flex flex-col justify-center"
        >
          {checkboxGroup(
            <FaGamepad />,
            "Quais jogos você mais acompanha?",
            "jogos",
            [
              { value: "CS2", label: "CS2" },
              { value: "VALORANT", label: "VALORANT" },
              { value: "LoL", label: "League of Legends" },
              { value: "R6", label: "Rainbow Six" },
              { value: "Rocket League", label: "Rocket League" },
            ]
          )}

          {checkboxGroup(
            <FaHeart />,
            "Qual tipo de conteúdo mais te empolga? ",
            "conteudo",
            [
              { value: "Bastidores", label: "Bastidores e vlogs" },
              { value: "Entrevistas", label: "Entrevistas" },
              { value: "Desafios", label: "Desafios" },
              { value: "Dicas", label: "Dicas e tutoriais" },
              { value: "Sorteios", label: "Sorteios" },
            ]
          )}

          <div>
            <label className="font-semibold mb-10 mt-10 flex items-center justify-center gap-2 text-2xl">
              <FaStar />
              Quais seus jogadores favoritos da FURIA?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* CS2 */}
              <div>
                <h3 className="text-xl font-semibold mb-2 text-center">CS2</h3>
                <div className="grid grid-cols-2 gap-2 gap-y-5 ml-5 ">
                  {["KSCERATO", "yuurih", "YEKINDAR", "FalleN", "molodoy"].map(
                    (player) => (
                      <label
                        key={player}
                        className="flex items-center gap-2 text-center"
                      >
                        <input
                          type="checkbox"
                          name="jogador"
                          value={player}
                          onChange={handleChange}
                          className="form-checkbox h-5 w-5 text-yellow-400"
                        />
                        <span>{player}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Valorant */}
              <div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Valorant
                </h3>
                <div className="grid grid-cols-2 gap-2 gap-y-5 ml-5">
                  {["Khalil", "mwzera", "havoc", "heat", "raafa"].map(
                    (player) => (
                      <label
                        key={player}
                        className="flex items-center gap-2 text-center"
                      >
                        <input
                          type="checkbox"
                          name="jogador"
                          value={player}
                          onChange={handleChange}
                          className="form-checkbox h-5 w-5 text-yellow-400"
                        />
                        <span>{player}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Rainbow Six */}
              <div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Rainbow Six
                </h3>
                <div className="grid grid-cols-2 gap-2 gap-y-5 ml-5">
                  {["FelipoX", "HerdsZ", "Jv92", "Kheyze", "nade"].map(
                    (player) => (
                      <label
                        key={player}
                        className="flex items-center gap-2 text-center"
                      >
                        <input
                          type="checkbox"
                          name="jogador"
                          value={player}
                          onChange={handleChange}
                          className="form-checkbox h-5 w-5 text-yellow-400"
                        />
                        <span>{player}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* LOL */}
              <div>
                <h3 className="text-xl font-semibold mb-2 text-center">LOL</h3>
                <div className="grid grid-cols-2 gap-2 gap-y-5">
                  {["Guigo", "Tatu", "Tutsz", "Ayu", "JoJo"].map((player) => (
                    <label
                      key={player}
                      className="flex items-center gap-2 ml-6"
                    >
                      <input
                        type="checkbox"
                        name="jogador"
                        value={player}
                        onChange={handleChange}
                        className="form-checkbox h-5 w-5 text-yellow-400"
                      />
                      <span>{player}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {checkboxGroup(
            <BsCameraReelsFill />,
            "Seu criador de conteúdo favorito?",
            "criador",
            [
              { value: "Gaules", label: "Gaules" },
              { value: "bt0", label: "bt0" },
              { value: "Liminha", label: "Liminha" },
              { value: "MCH", label: "MCH" },
              { value: "Sofia Espanha", label: "Sofia Espanha" },
              { value: "Brino", label: "Brino" },
              { value: "IVD Maluco", label: "IVD Maluco" },
              { value: "Tilia", label: "Tilia" },
              { value: "Paula Nobre", label: "Paula Nobre" },
              { value: "Xarola", label: "Xarola" },
            ]
          )}
          {checkboxGroup(
            <BiSolidParty />,
            "Já esteve presencialmente em eventos em que a FURIA competiu?",
            "eventos",
            [
              { value: "Major CSGO", label: "Major CSGO" },
              { value: "Major CS2", label: "Major CS2" },

              { value: "Blast CSGO", label: "Blast CSGO" },
              { value: "Blast CS2", label: "Blast CS2" },
              { value: "RLCS", label: "RLCS" },
              { value: "Invitational", label: "Invitational" },
              { value: "Blast R6", label: "Blast R6" },
              { value: "CBLOL", label: "CBLOL" },
              { value: "VCT", label: "VCT" },
              { value: "Pro League", label: "Pro League" },
            ]
          )}
          {checkboxGroup(
            <BiSolidParty />,
            "Já comprou produtos da FURIA?",
            "produtos",
            [
              { value: "Camisetas", label: "Camisetas" },
              { value: "Jaquetas/Blusas", label: "Jaquetas/Blusas" },
              { value: "Calças/Shorts", label: "Calças/Shorts" },
              { value: "Croppeds", label: "Croppeds" },
              { value: "Meias", label: "Meias" },
              { value: "Periféricos", label: "Periféricos" },
              { value: "Mochilas", label: "Mochilas" },
              {
                value: "Acessórios",
                label: "Acessórios",
              },
              {
                value: "Gift Cards",
                label: "Gift Cards",
              },
              {
                value: "Pelúcias",
                label: "Pelúcias",
              },
            ]
          )}

          <div className="flex items-center justify-center">
            <Button text={"CONTINUAR"} exec={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
}
