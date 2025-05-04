import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "react-cookies";
import axios from "axios";
import { BsBagFill } from "react-icons/bs";
import logoST from "./assets/logo sem texto.png";
import typo from "./assets/typo.svg";
import avatar1 from "./assets/avatar1.png";
import { IoExit } from "react-icons/io5";
import Button from "./components/SubmitButton";
import { FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi"; // Icones para mostrar/ocultar senha

const StorePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [items, setItems] = useState([
    // Placeholders
    {
      id: 1,
      name: "Camiseta FURIA",
      description:
        "Camiseta oficial FURIA. Conforto e estilo para o seu dia a dia.",
      price: 20000,
      imageUrl:
        "https://acdn-us.mitiendanube.com/stores/002/332/223/products/casual-frente11-1b7583d3c514c7cadd16884141237486-640-0.png",
    },
    {
      id: 2,
      name: "Plushie FURICO!",
      description:
        "Ele existe mesmo! O plushie FURICO é o companheiro perfeito para os fãs.",
      price: 15000,
      imageUrl: "https://pbs.twimg.com/media/FR25RzSWYAAQnuW.jpg:large",
    },
    {
      id: 3,
      name: "Blusa FURIA",
      description: "Blusa quentinha com logo FURIA, para você arrasar no look.",
      price: 10000,
      imageUrl:
        "https://shop.esl.com/cdn/shop/products/75D5A3F6-C5E7-46E0-982E-032F92F96EDB_-removebg-preview.png?v=1700239001",
    },
    {
      id: 1,
      name: "Camiseta FURIA",
      description:
        "Camiseta oficial FURIA. Conforto e estilo para o seu dia a dia.",
      price: 20000,
      imageUrl:
        "https://acdn-us.mitiendanube.com/stores/002/332/223/products/casual-frente11-1b7583d3c514c7cadd16884141237486-640-0.png",
    },
    {
      id: 2,
      name: "Plushie FURICO!",
      description:
        "Ele existe mesmo! O plushie FURICO é o companheiro perfeito para os fãs.",
      price: 15000,
      imageUrl: "https://pbs.twimg.com/media/FR25RzSWYAAQnuW.jpg:large",
    },
    {
      id: 3,
      name: "Blusa FURIA",
      description: "Blusa quentinha com logo FURIA, para você arrasar no look.",
      price: 10000,
      imageUrl:
        "https://shop.esl.com/cdn/shop/products/75D5A3F6-C5E7-46E0-982E-032F92F96EDB_-removebg-preview.png?v=1700239001",
    },
    {
      id: 1,
      name: "Camiseta FURIA",
      description:
        "Camiseta oficial FURIA. Conforto e estilo para o seu dia a dia.",
      price: 20000,
      imageUrl:
        "https://acdn-us.mitiendanube.com/stores/002/332/223/products/casual-frente11-1b7583d3c514c7cadd16884141237486-640-0.png",
    },
    {
      id: 2,
      name: "Plushie FURICO!",
      description:
        "Ele existe mesmo! O plushie FURICO é o companheiro perfeito para os fãs.",
      price: 15000,
      imageUrl: "https://pbs.twimg.com/media/FR25RzSWYAAQnuW.jpg:large",
    },
    {
      id: 3,
      name: "Blusa FURIA",
      description: "Blusa quentinha com logo FURIA, para você arrasar no look.",
      price: 10000,
      imageUrl:
        "https://shop.esl.com/cdn/shop/products/75D5A3F6-C5E7-46E0-982E-032F92F96EDB_-removebg-preview.png?v=1700239001",
    },
  ]);
  const [message, setMessage] = useState("");
  const [cpf, setCpf] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const storedCpf = cookies.load("cpf");
    const storedName = cookies.load("fullName");

    if (!storedCpf) {
      navigate("/login");
      return;
    }

    setCpf(storedCpf);
    setFullName(storedName);

    // Buscar os dados do usuário
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
    <div className="bg-[url('./assets/bg-provisorio.png')] min-h-screen bg-cover bg-fixed bg-no-repeat text-white">
      <header className="absolute top-0 w-full z-50">
        <div className="flex flex-row items-center justify-between px-6 py-4 bg-white/15 backdrop-blur-xl">
          <button
            onClick={() => navigate("/home")}
            className="p-2 rounded-full hover:scale-105 transition flex items-center justify-center  text-offblack"
          >
            <FiArrowLeft className="text-white text-3xl" />
          </button>
          <img src={typo} className="h-11 object-contain invert" alt="Logo" />
          <div className="flex">
            <button
              onClick={() => navigate("/profile")}
              className="p-2 rounded-full bg-offwhite hover:scale-105 transition flex items-center justify-center text-offblack"
            >
              <img src={avatar1} className="h-10 rounded-full mr-2" />
              <p className="mr-2">PERFIL</p>
            </button>
          </div>
        </div>
      </header>

      <section className="text-center pt-40 pb-12">
        <h1 className="text-6xl sm:text-8xl font-extrabold drop-shadow-xl uppercase">
          Loja de Pontos FURIA
        </h1>
        <div className="">
          <p className="text-lg sm:text-xl mt-4">
            Troque suas moedas furiosas por recompensas!
          </p>
          <p className="text-white text-lg uppercase sm:text-xl mt-5 animate-fade-in delay-200">
            moedas furiosas:
            <span className="text-yellow-600"> {userData.moedas}</span>
          </p>
        </div>
      </section>

      <section className="w-full px-8 py-12 bg-black/90 backdrop-blur-md rounded-2xl shadow-inner mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.length === 0 ? (
            <p className="text-white text-center">Nenhum item disponível.</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white/20 hover:bg-white/30 p-8 rounded-xl text-center flex flex-col items-center"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-40 w-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-offwhite my-2">{item.description}</p>
                <span className="text-yellow-500 font-bold text-2xl">
                  {item.price} Moedas
                </span>
                <Button
                  text={"Comprar"}
                  exec={() => {
                    if (userData.moedas >= item.price) {
                      // Lógica de compra
                      alert(`Você comprou ${item.name}!`);
                    } else {
                      alert("Você não tem moedas suficientes!");
                    }
                  }}
                  className="mt-4"
                />
              </div>
            ))
          )}
        </div>
      </section>

      <footer className="bg-offblack text-center p-3 mt-8 text-offwhite">
        <p>&copy; 2025 QG - Todos os direitos reservados</p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="#" className="text-ch2 hover:underline">
            Privacidade
          </a>
          <a href="#" className="text-ch2 hover:underline">
            Termos de Uso
          </a>
        </div>
      </footer>
    </div>
  );
};

export default StorePage;
