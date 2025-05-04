import React, { useState } from "react";
import { FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi"; // Icones para mostrar/ocultar senha
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logoST from "./assets/logo sem texto.png";
import Button from "./components/SubmitButton";
import cookie from "react-cookies";

export default function Login() {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Controla a visibilidade da senha
  const navigate = useNavigate();

  // Função para formatar o CPF enquanto o usuário digita
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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://furiatest-production.up.railway.app/login",
        {
          cpf: cpf.replace(/\D/g, ""),
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        cookie.save("cpf", cpf.replace(/\D/g, ""), { path: "/" });
        localStorage.setItem("userToken", response.data.token); // Assumindo que backend retorna o token
        setMessage("Login bem-sucedido!");
        navigate("/home"); // ou "/fanform", se for o correto
      } else {
        setMessage("Erro ao fazer login. Tente novamente.");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Erro no login. Verifique suas credenciais."
      );
    }
  };

  return (
    <div className="bg-[url('./assets/bg-provisorio.png')] h-screen bg-cover bg-fixed bg-no-repeat flex items-center justify-center">
      <div className="relative bg-white/15 backdrop-blur-xl p-10 rounded-2xl shadow-lg w-11/12 max-w-md text-center">
        <Link
          to="/"
          className="absolute top-4 left-4 text-offwhite hover:text-ch2 transition"
        >
          <FiArrowLeft size={24} />
        </Link>

        <img src={logoST} alt="Logo" className="h-20 mx-auto mb-6" />
        <h2 className=" text-3xl font-bold mb-2">BEM-VINDO(A) DE VOLTA!</h2>
        <p className="text-offwhite mb-6">
          ENTRE NO QG E CONTINUE SUA JORNADA 🐾
        </p>

        {/* Exibir mensagens de sucesso ou erro */}
        {message && <p className="text-white mb-4">{message}</p>}

        <form
          className="flex flex-col gap-4 justify-center items-center"
          onSubmit={handleLogin}
        >
          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={handleCpfChange}
            className="p-3 rounded-md bg-offblack text-white placeholder-gray-400 focus:outline-none w-full"
          />

          {/* Input para senha com botão para desocultar */}
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

          <Button text={"PROSSEGUIR"} exec={handleLogin}></Button>
        </form>

        <p className="text-offwhite mt-8">
          NÃO TEM CONTA?{" "}
          <Link to="/cadastro" className="text-ch2 font-bold hover:underline">
            CADASTRE-SE
          </Link>
        </p>
      </div>
    </div>
  );
}
