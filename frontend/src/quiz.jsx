import React, { useState } from "react";
import Button from "./components/SubmitButton";
import { useNavigate } from "react-router-dom";
import cookies from "react-cookies";
import axios from "axios";
import avatar1 from "./assets/avatar1.png";
import typo from "./assets/typo.svg";
import { FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi"; // Icones para mostrar/ocultar senha
import { BsBagFill } from "react-icons/bs";
import { IoExit } from "react-icons/io5";

// Perguntas e respostas do quiz
const questions = [
  {
    question: "Quando a FURIA foi fundada?",
    options: ["2017", "2018", "2019", "2020"],
    answer: "2017",
  },
  {
    question:
      "Quem foi o primeiro jogador da FURIA a atingir o rank número 1 do mundo no CS:GO?",
    options: ["yuurih", "art", "VINI", "KSCERATO"],
    answer: "art",
  },
  {
    question: "Qual foi a principal conquista da FURIA no CS:GO em 2019?",
    options: [
      "Campeões da ESL Pro League",
      "Vencedores do Blast Premier",
      "Top 4 no Major de Katowice",
      "Campeões da DreamHack Masters Dallas",
    ],
    answer: "Top 4 no Major de Katowice",
  },
  {
    question: "Em que jogo a FURIA iniciou sua trajetória no CS?",
    options: ["CS 1.6", "CS: Source", "CS:GO", "CS2"],
    answer: "CS:GO",
  },
  {
    question:
      "Qual jogador da FURIA é conhecido pelo seu estilo de jogo agressivo com AWP?",
    options: ["KSCERATO", "art", "yuurih", "VINI"],
    answer: "art",
  },
  {
    question: "Quando a FURIA jogou seu primeiro Major?",
    options: ["2018", "2019", "2020", "2021"],
    answer: "2019",
  },
  {
    question: "Qual a principal conquista da FURIA em 2020?",
    options: [
      "Vencedores do ESL Pro League",
      "Campeões da DreamHack Masters Spring",
      "Top 8 no Major",
      "Vencedores do BLAST Premier Global Final",
    ],
    answer: "Campeões da DreamHack Masters Spring",
  },
  {
    question:
      "Quem foi o técnico da FURIA que levou a equipe ao top 5 do mundo em 2020?",
    options: ["Fury", "Pablo", "Guerri", "Xand"],
    answer: "Guerri",
  },
  {
    question: "Em que ano a FURIA fez sua estreia no CS2?",
    options: ["2022", "2023", "2024", "2025"],
    answer: "2023",
  },
  {
    question: "Qual foi o maior rival da FURIA no CS:GO?",
    options: ["MIBR", "Liquid", "Astralis", "Cloud9"],
    answer: "Liquid",
  },
];

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) return; // Não permite avançar sem selecionar uma opção

    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); // Limpa a opção selecionada para a próxima pergunta
    } else {
      // Quiz terminado
      navigate("/resultado", { state: { score } });
    }
  };

  return (
    <div className="bg-[url('./assets/bg-provisorio.png')] min-h-screen bg-cover bg-fixed bg-no-repeat text-white">
      <header className="absolute top-0 w-full z-50">
        <div className="flex flex-row items-center justify-between px-6 py-4 bg-white/15 backdrop-blur-xl">
          <button
            onClick={() => navigate("/home")}
            className="p-2 rounded-full hover:scale-105 transition flex items-center justify-center text-offblack"
          >
            <FiArrowLeft className="text-white text-3xl" />
          </button>
        </div>
      </header>
      <div
        id="quiz"
        className="text-center h-screen w-full flex flex-col items-center justify-center bg-no-repeat bg-cover bg-fixed"
      >
        <div className="bg-offblack/80 p-8 rounded-xl shadow-lg w-96">
          <h1 className="text-3xl font-bold text-ch2 mb-4">
            Quiz FURIA - CS:GO
          </h1>
          <h3 className="text-xl text-offwhite mb-6">
            {`Pergunta ${currentQuestionIndex + 1}: ${
              questions[currentQuestionIndex].question
            }`}
          </h3>

          <div className="space-y-4">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`w-full p-4 rounded-xl text-left border-2 ${
                  selectedOption === index
                    ? "border-yellow-600 bg-yellow-600 text-black"
                    : "border-offwhite bg-offblack/50 text-offwhite hover:bg-offblack/70"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <Button text="Próxima Pergunta" exec={handleNextQuestion} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
