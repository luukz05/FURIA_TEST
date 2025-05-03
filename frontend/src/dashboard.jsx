import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "react-cookies";
import axios from "axios";
import Marquee from "react-fast-marquee";
import { FiArrowLeft, FiUser, FiBriefcase } from "react-icons/fi";
import logoST from "./assets/logo sem texto.png";
import typo from "./assets/typo.svg";
import avatar1 from "./assets/avatar1.png";
import { IoExit } from "react-icons/io5";
import Button from "./components/SubmitButton";
import { BsBagFill } from "react-icons/bs";
import { Carousel } from "./components/carousel";
import UserProgress from "./components/levels";

const HomePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");
  const [cpf, setCpf] = useState("");
  const [fullName, setFullName] = useState("");
  const [ranking, setRanking] = useState([]);
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

  useEffect(() => {
    const storedCpf = cookies.load("cpf");
    const storedName = cookies.load("fullName");

    if (!storedCpf) {
      navigate("/login");
      return;
    }

    axios
      .get("http://127.0.0.1:5000/ranking")
      .then((response) => setRanking(response.data.ranking))
      .catch((error) => console.error("Erro ao buscar ranking:", error));

    setCpf(storedCpf);
    setFullName(storedName);

    axios
      .get(`http://127.0.0.1:5000/user/${storedCpf}`)
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
    <>
      <div className="bg-[url('./assets/bg-provisorio.png')] min-h-screen bg-cover bg-fixed bg-no-repeat text-white">
        <header className="absolute top-0 w-full z-50">
          <div className="flex flex-row items-center justify-between px-6 py-4 bg-white/15 backdrop-blur-xl">
            <button
              onClick={() => navigate("/loja")}
              className="p-2 rounded-full hover:scale-105 transition flex items-center justify-center  text-offblack"
            >
              <BsBagFill className="text-white text-3xl" />
            </button>
            <img src={typo} className="h-11 object-contain invert" alt="Logo" />
            <div className="flex">
              <button
                onClick={() => navigate("/profile")}
                className="p-2 rounded-full bg-offwhite  hover:scale-105 transition flex items-center justify-center  text-offblack"
              >
                <img src={avatar1} className="h-10 rounded-full mr-2" />
                <p className="mr-2">PERFIL</p>
              </button>
              {/* <button
                onClick={handleLogout}
                className="p-2 rounded-full hover:scale-105 transition flex items-center justify-center"
              >
                <IoExit className="text-white text-3xl" />
              </button> */}
            </div>
          </div>
          <div className="overflow-hidden bg-offblack  py-2 px-4 rounded-b-xl shadow-md">
            <Marquee className="text-xl font-bold" speed={90}>
              {Object.values(news).map((headline) => (
                <div className="inline-flex px-8 py-1">
                  <a href="#" className="hover:underline">
                    {headline}
                  </a>
                </div>
              ))}
            </Marquee>
          </div>
        </header>
        {/* Hero Section */}
        <div
          id="hero"
          className="text-center h-screen w-full flex flex-col items-center justify-center bg-no-repeat bg-cover bg-fixed"
        >
          <div className="flex gap-30">
            <div className="flex flex-col text-center justify-center items-center">
              <h1 className="text-6xl sm:text-8xl font-extrabold drop-shadow-xl uppercase">
                Seja bem-vindo(a) <br />
                {userData.fullName}
              </h1>

              <div className="levels flex flex-row gap-4">
                <p className="text-white text-lg uppercase sm:text-xl mt-4 max-w-xl animate-fade-in delay-200">
                  Nível de furia:
                  <span className="text-yellow-600">
                    {" "}
                    {userData.experiencia}
                  </span>
                </p>
                <p className="text-white text-lg uppercase sm:text-xl mt-4 max-w-xl animate-fade-in delay-200">
                  moedas furiosas:
                  <span className="text-yellow-600"> {userData.moedas}</span>
                </p>
              </div>
            </div>
            <div className="">
              <img src={logoST} alt="Logo" className="h-94" />
            </div>
          </div>
        </div>
        <section className="w-full px-8 py-12 bg-black backdrop-blur-md rounded-2xl shadow-inner mb-10">
          <h2 className="text-3xl font-bold text-ch2 mb-4 uppercase">
            Missões Semanais
          </h2>
          <p className="text-offwhite mb-6">
            Conquiste XP, suba de nível e desbloqueie recompensas ao cumprir
            desafios ligados à FURIA.
          </p>

          <div className="flex row gap-4 justify-center text-xl uppercase">
            <div className="bg-white/20 hover:bg-white/30 p-10 rounded-xl w-96 text-wrap flex flex-col gap-5 items-center justify-between">
              <h1>Comentar na última publicação do Instagram da FURIA</h1>
              <span className="text-ch3">75 XP + 5 Moedas</span>
            </div>
            <div className="bg-white/20 hover:bg-white/30 p-10 rounded-xl w-96 text-wrap flex flex-col gap-5 items-center justify-between">
              <h1>Assistir 15 minutos de algum criador de conteúdo FURIA</h1>
              <span className="text-ch3">100 XP + 8 Moedas</span>
            </div>
            <div className="bg-white/20 hover:bg-white/30 p-10 rounded-xl w-96 text-wrap flex flex-col gap-5 items-center justify-between">
              <h1>Subir a hashtag #FURIAQG no Twitter/X</h1>
              <span className="text-ch3">50 XP + 2 Moedas</span>
            </div>
            <div className="bg-white/20 hover:bg-white/30 p-10 rounded-xl w-96 text-wrap flex flex-col gap-5 items-center justify-between">
              <h1>Completar o Quiz Semanal </h1>
              <span className="text-ch3">150 XP + 5 Moedas</span>
            </div>
          </div>
        </section>
        <section className="w-full px-8 py-12 bg-black/0 rounded-2xl shadow-inner mb-10 flex flex-col justify-between items-center">
          <h2 className="text-3xl font-bold text-ch2 mb-4 uppercase">
            Quiz Semanal FURIA
          </h2>

          <div className="w-150 h-150 bg-offblack/90 p-15 rounded-xl shadow-lg mb-6 flex flex-col justify-between items-center">
            <h3 className="text-xl font-semibold text-ch2 mb-2">
              CS:GO - Jornadas do Major
              <p className="text-offwhite text-sm mt-2">
                Você conhece todas as campanhas da FURIA nos Majors? Responda e
                mostre seu valor!
              </p>
            </h3>
            <div className="scale-150">
              <h1 className="text-5xl">10 PERGUNTAS</h1>
              <div className="text-offwhite text-sm mt-5">
                <p>
                  🏆 Sua última pontuação: {userData.quiz?.acertos ?? "-"}/10
                </p>
              </div>
            </div>

            <Button
              text={"iniciar quiz"}
              exec={() => navigate("/quiz")}
            ></Button>
          </div>
        </section>

        <section className="w-full px-8 py-12 bg-black/100 backdrop-blur-md rounded-2xl shadow-inner mb-10">
          <h2 className="text-3xl font-bold text-ch2 mb-4 uppercase">
            Conteúdo para Você
          </h2>
          <p className="text-offwhite mb-6">
            Selecionamos conteúdos baseados nos seus interesses com a FURIA.
          </p>

          <Carousel
            slides={[
              {
                titulo: "Jornada do Torcedor - Rio 2022",
                subtitulo: "Campanha da FURIA na perspectiva de um torcedor.",
                src: "https://img-cdn.hltv.org/gallerypicture/PvMLn6WZoPjSnjvarsRSlW.jpg?ixlib=java-2.1.0&w=1200&s=d6b0e717800e557ab51ed53869879027",
              },
              {
                titulo: "Jornada do Torcedor - Rio 2024",
                subtitulo: "Campanha da FURIA na perspectiva de um torcedor.",
                src: "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/10/iem-rio-vitoria-navi-2-e1728767398302.jpg?w=880",
              },
              {
                titulo: "Ол келді! Ele chegou!",
                subtitulo: "Bastidores da chegada de Molodoy!",
                src: "https://pbs.twimg.com/media/Gp4xQwXWQAAmKNY?format=jpg&name=medium",
              },
              {
                titulo: "É FINAL!",
                subtitulo:
                  "Direto de Shanghai, nosso #DIADEFURIA começa às 7h da manhã (horário de Brasília). Já prepara a torcida! ⚫⚪",
                src: "https://pbs.twimg.com/media/Gp5AuhJWoAA4N_V?format=jpg&name=4096x4096",
              },
              {
                titulo: "Já foi uma!",
                subtitulo:
                  "Estreia com vitória na fase de grupos da #LTASul! Pra quebrar a zika e quebrar a Loud. VAMO #FURIALoL 🙏",
                src: "https://pbs.twimg.com/media/GpjFdfYWEAAYjGg?format=jpg&name=900x900",
              },
            ]}
          />
        </section>

        <section className="w-full px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Ranking Global */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-bold text-ch2 mb-4 uppercase">
                Ranking Global
              </h2>
              <p className="text-offwhite mb-6">
                Compare sua performance com a galera da FURIA ao redor do mundo.
              </p>

              <table className="w-full text-left text-offwhite bg-white/5 rounded-xl overflow-hidden">
                <thead className="bg-white/10 text-ch2 text-sm">
                  <tr>
                    <th className="p-3">Posição</th>
                    <th className="p-3">Usuário</th>
                    <th className="p-3">XP</th>
                    <th className="p-3">Moedas</th>
                    {/* <th className="p-3">Local</th> */}
                  </tr>
                </thead>
                <tbody>
                  {ranking.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-3 text-center">
                        Nenhum dado disponível
                      </td>
                    </tr>
                  ) : (
                    ranking.map((user, index) => (
                      <tr key={user.cpf} className="border-b border-white/10">
                        <td className="p-3">#{index + 1}</td>
                        <td className="p-3">{user.fullName}</td>
                        <td className="p-3">{user.experiencia}</td>
                        <td className="p-3">{user.moedas}</td>
                        {/* <td className="p-3">{user.local || "Desconhecido"}</td> */}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Progresso de Experiência */}
            <div className="w-full lg:w-1/2 ">
              <h2 className="text-3xl font-bold text-ch2 mb-4 uppercase">
                Seu Progresso
              </h2>
              <p className="text-offwhite mb-6">
                Acompanhe seu avanço até o próximo nível.
              </p>

              <div className="w-full bg-white/10 rounded-xl overflow-hidden">
                <div className="w-full text-xs font-bold text-black text-center p-2 transition-all duration-500">
                  <UserProgress totalXP={userData.experiencia} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rodapé */}
        <footer className="bg-offblack text-center p-3 mt-8 text-offwhite">
          <p>&copy; 2025 QG - Todos os direitos reservados</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="#" className="text-ch2 hover:">
              Privacidade
            </a>
            <a href="#" className="text-ch2 hover:">
              Termos de Uso
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
