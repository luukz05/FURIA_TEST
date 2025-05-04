import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./components/Modal";
import axios from "axios";
import cookie from "react-cookies";
import Button from "./components/SubmitButton";

const SocialForm = () => {
  const [formData, setFormData] = useState({
    twitter: "",
    steam: "",
    hltv: "",
    youtube: "",
    instagram: "",
    twitch: "",
  });
  const [cpf, setCpf] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success"); // Tipo pode ser 'success' ou 'error'
  const socialPatterns = {
    twitter: /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/[A-Za-z0-9_]+\/?$/,
    steam: /^https?:\/\/(www\.)?steamcommunity\.com\/id\/[A-Za-z0-9_-]+\/?$/,
    hltv: /^https?:\/\/(www\.)?hltv\.org\/profile\/\d+\/[A-Za-z0-9_-]+\/?$/,
    youtube:
      /^https?:\/\/(www\.)?youtube\.com\/(c\/|channel\/|@)[A-Za-z0-9_-]+\/?$/,
    instagram: /^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.]+\/?$/,
  };

  useEffect(() => {
    const cookieCpf = cookie.load("cpf");
    setCpf(cookieCpf);
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allFieldsEmpty = Object.values(formData).every(
      (value) => value.trim() === ""
    );

    if (allFieldsEmpty) {
      setModalMessage("Por favor, conecte alguma rede social.");
      setModalType("error");
      setIsModalOpen(true);
      return;
    }

    for (const [key, value] of Object.entries(formData)) {
      if (value.trim() !== "" && !socialPatterns[key].test(value.trim())) {
        setModalMessage(
          `O link inserido em ${key.toUpperCase()} não é válido.`
        );
        setModalType("error");
        setIsModalOpen(true);
        return;
      }
    }

    if (!cpf) {
      setModalMessage("CPF não encontrado. Refaça o login.");
      setModalType("error");
      setIsModalOpen(true);
      return;
    }

    try {
      const response = await axios.patch(
        `https://furia-test-ashy.vercel.app/socials/${cpf}`,
        { socials: formData }
      );

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
    <div className="bg-[url('./assets/bg-provisorio.png')] h-screen bg-cover bg-fixed bg-no-repeat flex flex-col items-center justify-center p-8">
      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
        url={"/home"}
      />
      <h1 className="text-4xl mb-8">CONECTE SUAS REDES SOCIAIS</h1>
      <form
        onSubmit={handleSubmit}
        className="relative bg-white/15 backdrop-blur-xl p-10 rounded-2xl shadow-lg w-xl text-center"
      >
        <div>
          <label className="block mb-2  text-lg text-left">TWITTER / X</label>
          <input
            type="text"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            placeholder="LINK DO SEU PERFIL NO TWITTER"
            className="p-3 rounded-md bg-offblack text-white placeholder-gray-400 focus:outline-none w-full"
          />
        </div>
        <div>
          <label className="block mb-2 mt-2 text-lg text-left">STEAM</label>
          <input
            type="text"
            name="steam"
            value={formData.steam}
            onChange={handleChange}
            placeholder="LINK DO SEU PERFIL STEAM"
            className="p-3 rounded-md bg-offblack text-white placeholder-gray-400 focus:outline-none w-full"
          />
        </div>
        <div>
          <label className="block mb-2 mt-2 text-lg text-left">HLTV</label>
          <input
            type="text"
            name="hltv"
            value={formData.hltv}
            onChange={handleChange}
            placeholder="LINK DO SEU PERFIL NA HLTV"
            className="p-3 rounded-md bg-offblack text-white placeholder-gray-400 focus:outline-none w-full"
          />
        </div>
        <div>
          <label className="block mb-2 mt-2 text-lg text-left">YOUTUBE</label>
          <input
            type="text"
            name="youtube"
            value={formData.youtube}
            onChange={handleChange}
            placeholder="LINK DO SEU CANAL NO YOUTUBE"
            className="p-3 rounded-md bg-offblack text-white placeholder-gray-400 focus:outline-none w-full"
          />
        </div>
        <div>
          <label className="block mb-2 mt-2 text-lg text-left">INSTAGRAM</label>
          <input
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            placeholder="LINK DO SEU PERFIL NO INSTAGRAM"
            className="p-3 rounded-md bg-offblack text-white placeholder-gray-400 focus:outline-none w-full"
          />
        </div>
        <div>
          <label className="block mb-2 mt-2 text-lg text-left">TWITCH</label>
          <input
            type="text"
            name="twitch"
            value={formData.twitch}
            onChange={handleChange}
            placeholder="LINK DO SEU PERFIL NA TWITCH"
            className="p-3 rounded-md bg-offblack text-white placeholder-gray-400 focus:outline-none w-full"
          />
        </div>
        <Button text={"FINALIZAR CADASTRO"} onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default SocialForm;
