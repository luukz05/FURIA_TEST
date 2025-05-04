import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Furiometro = () => {
  const [tweets, setTweets] = useState([]);
  const [following, setFollowing] = useState([]);
  const [furiosidade, setFuriosidade] = useState(0);
  const handleLogin = () => {
    // Redireciona para o fluxo de OAuth do backend (que já vai retornar o token de autenticação)
    window.location.href = "https://furiatest-production.up.railway.app//xin";
  };
  const navigate = useNavigate();
  useEffect(() => {
    // Aqui você faz a chamada ao backend para obter os dados dos tweets e seguidores
    const fetchData = async () => {
      try {
        // Obter tweets com a palavra "FURIA"
        const tweetsResponse = await axios.get(
          "https://furiatest-production.up.railway.app//xs"
        );
        setTweets(tweetsResponse.data);

        // Obter a lista de seguidores
        const followingResponse = await axios.get(
          "https://furiatest-production.up.railway.app//xg"
        );
        setFollowing(followingResponse.data);

        // Calcular o quão furioso o usuário é baseado na interação
        const furiosidadeLevel = calculateFuriosidade(
          tweetsResponse.data,
          followingResponse.data
        );
        setFuriosidade(furiosidadeLevel);
      } catch (error) {
        console.error("Erro ao buscar dados do Twitter:", error);
      }
    };

    fetchData();
  }, []);

  const calculateFuriosidade = (tweets, following) => {
    // Um exemplo de lógica simples para calcular a "furiosidade"
    let score = 0;

    // Aumenta o score baseado no número de tweets com "FURIA"
    score += tweets.filter((tweet) => tweet.text.includes("FURIA")).length * 10;

    // Aumenta o score baseado no número de seguidores
    score += following.length * 5;

    return score;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
        <h1 className="text-4xl mb-6">Como de Furioso Você é com a FURIA?</h1>
        <p className="mb-4">
          Faça login com o Twitter para descobrir o quão furioso você é!
        </p>

        <button
          onClick={handleLogin}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
        >
          Conectar com Twitter
        </button>
      </div>

      <h1 className="text-4xl mb-6">Sua Furiosidade com a FURIA</h1>

      <h2 className="text-2xl mb-4">Tweets com a palavra "FURIA":</h2>
      <ul className="mb-6">
        {tweets.map((tweet, index) => (
          <li key={index} className="mb-2">
            <p>{tweet.text}</p>
            <span className="text-sm text-gray-400">
              Postado em: {new Date(tweet.created_at).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl mb-4">Quem você segue:</h2>
      <ul className="mb-6">
        {following.map((user, index) => (
          <li key={index} className="mb-2">
            <p>{user.name}</p>
          </li>
        ))}
      </ul>

      <h2 className="text-3xl mb-4">Sua Furiosidade: {furiosidade}</h2>
    </div>
  );
};

export default Furiometro;
