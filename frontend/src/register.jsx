import React, { useState } from "react";
import { FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logoST from "./assets/logo sem texto.png";
import cookie from "react-cookies";
import CpfValidationForm from "./components/cpfConfirm";
import Button from "./components/SubmitButton";

export default function Cadastro() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [cpf, setCpf] = useState("");
  const [interests, setInterests] = useState("");
  const [message, setMessage] = useState("");
  const [isCpfValid, setIsCpfValid] = useState(false); // Armazena o estado da validação do CPF
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleCpfChange = (e) => {
    let value = e.target.value;

    // Remove tudo que não for número
    value = value.replace(/\D/g, "");

    // Adiciona os pontos e o hífen no formato correto
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})?/, "$1.$2.$3-$4");
    }

    setCpf(value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/register",
        {
          fullName,
          email,
          password,
          address,
          cpf: cpf.replace(/\D/g, ""), // Envia o CPF sem formatação
          interests,
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        setMessage("Usuário registrado com sucesso!");
        // Salvar cookies
        cookie.save("fullName", fullName, { path: "/" });
        cookie.save("cpf", cpf.replace(/\D/g, ""), { path: "/" });
        navigate("/fanform");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Erro no registro. Tente novamente."
      );
    }
  };

  return (
    <div className="bg-[url('./assets/bg-provisorio.png')] h-screen bg-cover bg-fixed bg-no-repeat flex items-center justify-center">
      <div className="relative bg-white/15 backdrop-blur-xl p-5 rounded-2xl shadow-lg w-11/12 max-w-md text-center flex flex-col items-center justify-center">
        <Link
          to="/"
          className="absolute top-4 left-4 text-offwhite hover:text-ch2 transition"
        >
          <FiArrowLeft size={24} />
        </Link>

        <div className="flex flex-col items-center justify-center">
          <img src={logoST} alt="Logo" className="h-20 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-2">CRIE SUA CONTA</h2>
          <p className="text-offwhite mb-6">JUNTE-SE À LEGIÃO FURIOSA</p>
        </div>

        <form
          className="flex flex-col gap-4 justify-center items-center"
          onSubmit={handleRegister}
        >
          <input
            type="text"
            placeholder="NOME COMPLETO"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="p-3 rounded-md bg-offblack text-white placeholder-gray-400 focus:outline-none w-full"
          />
          <input
            type="email"
            placeholder="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-md bg-offblack text-white placeholder-gray-400 focus:outline-none w-full"
          />
          <div className="relative w-full">
            <input
              type={isPasswordVisible ? "text" : "password"} // Condição para mostrar ou ocultar a senha
              placeholder="SENHA"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-md bg-offblack text-white placeholder-gray-400 focus:outline-none w-full"
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)} // Alterna a visibilidade da senha
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white"
            >
              {isPasswordVisible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
          <input
            type="text"
            placeholder="ENDEREÇO"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="p-3 rounded-md bg-offblack text-white placeholder-gray-400 focus:outline-none w-full"
          />
          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={handleCpfChange}
            className="p-3 rounded-md bg-offblack text-white placeholder-gray-400 focus:outline-none w-full"
          />

          {/* Passa o CPF e a função para atualizar o estado da validação */}
          <CpfValidationForm
            cpf={cpf}
            onValidationComplete={(isValid) => setIsCpfValid(isValid)} // Atualiza a validação
          />

          <Button text={"PROSSEGUIR"} exec={handleRegister}></Button>
        </form>

        <p className="text-offwhite mt-8">
          JÁ TEM UMA CONTA?{" "}
          <Link to="/login" className="text-ch2 font-bold hover:underline">
            FAZER LOGIN
          </Link>
        </p>
      </div>
    </div>
  );
}
