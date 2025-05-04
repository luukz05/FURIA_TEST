import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "react-cookies";
import axios from "axios";
import avatar1 from "./assets/avatar1.png";
import typo from "./assets/typo.svg";
import { FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi"; // Icones para mostrar/ocultar senha
import { BsBagFill } from "react-icons/bs";
import { IoExit } from "react-icons/io5";
import Verification from "./components/socialVerify";
import { BsShieldFillCheck } from "react-icons/bs";
import Modal from "./components/Modal";

import { BsShieldSlash } from "react-icons/bs";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");
  const [cpf, setCpf] = useState("");
  const [fullName, setFullName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success");
  const [contagem, setContagemExterna] = useState(0);

  useEffect(() => {
    const storedCpf = cookies.load("cpf");
    const storedName = cookies.load("fullName");

    if (!storedCpf) {
      navigate("/login");
      return;
    }

    setCpf(storedCpf);
    setFullName(storedName);

    axios
      .get(`https://furiatest-production.up.railway.app/user/${storedCpf}`)
      .then((response) => setUserData(response.data))
      .catch((error) =>
        setMessage(
          error.response?.data?.message || "Erro ao carregar os dados."
        )
      );
  }, [navigate]);

  const handleLogout = () => {
    cookies.remove("fullName");
    cookies.remove("cpf");
    navigate("/");
  };

  if (!userData) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-white text-lg">
        Carregando dados...
      </div>
    );
  }

  return (
    <div className="bg-[url('./assets/bg-provisorio.png')] h-fit min-h-screen bg-cover bg-fixed bg-no-repeat flex items-center justify-center p-4">
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
        message={modalMessage}
        url={0}
      />
      <header className="absolute top-0 w-full z-50">
        <div className="flex flex-row items-center justify-between px-6 py-4 bg-white/15 backdrop-blur-xl">
          <div className="flex">
            <button
              onClick={() => navigate("/home")}
              className="p-2 rounded-full hover:scale-105 transition flex items-center justify-center  text-offblack"
            >
              <FiArrowLeft className="text-white text-3xl" />
            </button>
            <button
              onClick={() => navigate("/loja")}
              className="p-2 rounded-full hover:scale-105 transition flex items-center justify-center  text-offblack"
            >
              <BsBagFill className="text-white text-3xl" />
            </button>
          </div>
          <img src={typo} className="h-11 object-contain invert" alt="Logo" />
          <div className="flex">
            <button
              onClick={() => navigate("/profile")}
              className="p-2 rounded-full bg-offwhite  hover:scale-105 transition flex items-center justify-center  text-offblack"
            >
              <img src={avatar1} className="h-10 rounded-full mr-2" />
              <p className="mr-2">PERFIL</p>
            </button>
            <button
              onClick={handleLogout}
              className="p-2 rounded-full hover:scale-105 transition flex items-center justify-center"
            >
              <IoExit className="text-white text-3xl" />
            </button>
          </div>
        </div>
      </header>
      <div className="bg-white/15 backdrop-blur-xl  rounded-2xl shadow-lg w-full max-w-4xl p-8 text-white mt-30">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center p-4 bg-[url('./assets/header_fallen.png')] bg-cover size w-full rounded-2xl gap-8">
            <img src={avatar1} className="h-35 rounded-full border-2" />
            <div className="">
              <h1 className="flex items-center gap-2 text-3xl font-bold uppercase text-left">
                {userData.fullName}
                {userData.verified ? (
                  <BsShieldFillCheck className="text-2xl text-blue-500" />
                ) : (
                  <BsShieldSlash className="text-2xl text-gray-500" />
                )}
              </h1>
              <div className="levels flex flex-col  text-left">
                <p className="text-white text-lg uppercase mt-4 max-w-xl animate-fade-in delay-200 ">
                  Nível de furia:
                  <span className="text-yellow-600">
                    {" "}
                    {userData.experiencia}
                  </span>
                </p>
                <p className="text-white text-lg uppercase  mt-4 max-w-xl animate-fade-in delay-200">
                  moedas furiosas:
                  <span className="text-yellow-600"> {userData.moedas}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-offblack p-6 rounded-lg flex flex-col items-center justify-between">
            <h2 className="text-xl font-bold text-ch2 mb-2 uppercase">
              Informações Pessoais
            </h2>
            <p>
              <strong className="uppercase">Nome:</strong> {userData.fullName}
            </p>
            <p>
              <strong className="uppercase">CPF:</strong> {cpf}
            </p>
            <p>
              <strong className="uppercase">Email:</strong> {userData.email}
            </p>
            <p>
              <strong className="uppercase">Endereço:</strong>{" "}
              {userData.address}
            </p>
            <p className="text-s pt-5 flex items-center gap-2 justify-center text-gray-500">
              Essas informações são visíveis apenas para você!{" "}
              <FiEyeOff size={20} />
            </p>
          </div>

          <div className="bg-offblack p-6 rounded-lg">
            <h2 className="text-xl font-bold text-ch2 mb-2 uppercase">
              Redes Sociais
            </h2>
            <div className="">
              {Object.entries(userData.socials || {}).map(([key, value]) => (
                <p className="uppercase" key={key}>
                  {value ? (
                    <a href={value} target="_blank" rel="noopener noreferrer">
                      {key}
                    </a>
                  ) : (
                    <span className="text-gray-500">{key}</span>
                  )}
                </p>
              ))}
            </div>
            <Verification
              setIsModalOpen={setIsModalOpen}
              setModalMessage={setModalMessage}
              setModalType={setModalType} // <- Certifique-se que ESSA está sendo passada
              setContagemExterna={setContagemExterna}
            />
          </div>

          <div className="bg-offblack p-6 rounded-lg col-span-2 flex justify-evenly">
            <h2 className="text-xl font-bold text-ch2 mb-4 uppercase flex items-center">
              FAVORITOS
            </h2>
            {Object.entries(userData.interests || {})
              .filter((_, index) => [0, 1, 2, 4].includes(index)) // seleciona os índices 0,1,2 e 4
              .map(([categoria, lista]) => (
                <div
                  key={categoria}
                  className="mb-2 text-left flex flex-col items-start"
                >
                  <p className="font-semibold uppercase">{categoria}</p>
                  <ul className="list-disc list-inside text-offwhite grid grid-cols-2 gap-2">
                    {lista.length > 0 ? (
                      lista.map((item, index) => <p key={index}>{item}</p>)
                    ) : (
                      <p className="text-gray-500 italic">Vazio</p>
                    )}
                  </ul>
                </div>
              ))}
          </div>
        </div>

        {message && <p className="text-red-400 mt-6">{message}</p>}
      </div>
    </div>
  );
};

export default Profile;
