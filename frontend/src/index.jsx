import "./index.css";
import logoST from "./assets/logo sem texto.png";
import typo from "./assets/typo.svg";
import { useNavigate } from "react-router-dom";
import { FaCalendarDay } from "react-icons/fa";
import { GiLaurelsTrophy } from "react-icons/gi";
import { CgGames } from "react-icons/cg";
import { FaPeopleGroup } from "react-icons/fa6";
import Button from "./components/SubmitButton";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <header className="absolute top-0 w-full z-50">
        <div className="flex flex-row items-center justify-center gap-10 px-6 py-4 bg-white/15 backdrop-blur-xl rounded-b-xl">
          <img src={typo} className="h-11 object-contain invert" alt="Logo" />
        </div>
      </header>
      <div
        id="hero"
        className="text-center h-screen w-full flex flex-col items-center justify-center bg-no-repeat bg-cover bg-fixed"
      >
        <div className="flex gap-30">
          <div className="flex flex-col text-center justify-center items-center">
            <p className="text-xl sm:text-2xl mb-2 tracking-wider uppercase animate-fade-in ">
              Seja bem-vindo(a) à arena dos verdadeiros furiosos.
            </p>

            <h1 className="text-6xl sm:text-8xl font-extrabold drop-shadow-xl">
              O QG TE AGUARDA
            </h1>

            <p className="text-white text-lg uppercase sm:text-xl mt-4 max-w-xl animate-fade-in delay-200">
              Aqui, você não é só mais um fã... você é parte da{" "}
              <span className="text-yellow-600">elite!</span>
            </p>
          </div>
          <div className="">
            <img src={logoST} alt="Logo" className="h-94" />
          </div>
        </div>
        <Button
          text={"NÃO FIQUE DE FORA"}
          exec={() => navigate("/login")}
        ></Button>
      </div>

      {/* How It Works Section */}
      <section className=" bg-white/10 backdrop-blur-xl text-white pt-20 pb-20 ml-50 mr-50 rounded-t-xl">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold text-center mb-6 ">
            COMO FUNCIONA?
          </h1>
          <p className="text-xl text-center mb-6 max-w-4xl mx-auto ">
            O QG é a plataforma definitiva para os fãs da FURIA. Aqui, você
            poderá completar desafios, ganhar recompensas exclusivas e mostrar
            que você faz parte da legião furiosa. Cada missão completada leva
            você a um novo nível de engajamento e recompensa, tornando a
            experiência mais imersiva e divertida.
          </p>
          <div className="flex flex-col md:flex-row gap-12 justify-center mt-20">
            <div className="flex flex-col items-center text-center">
              <div className="bg-[url('./assets/bg-provisorio.png')] p-6 rounded-xl mb-4 bg-fixed">
                <FaCalendarDay className="text-8xl " />
              </div>
              <h3 className="text-xl font-semibold mb-2  ">DESAFIOS DIÁRIOS</h3>
              <p>
                Complete desafios diários para acumular pontos e recompensas
                especiais.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-[url('./assets/bg-provisorio.png')] p-6 rounded-xl mb-4 bg-fixed">
                <GiLaurelsTrophy className="text-8xl " />
              </div>
              <h3 className="text-xl font-semibold mb-2 ">
                RECOMPENSAS EXCLUSIVAS
              </h3>
              <p>
                Ganhe skins, produtos exclusivos e muito mais ao cumprir suas
                missões.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-[url('./assets/bg-provisorio.png')] p-6 rounded-xl mb-4 bg-fixed">
                <FaPeopleGroup className="text-8xl " />
              </div>
              <h3 className="text-xl font-semibold mb-2 ">COMUNIDADE</h3>
              <p>
                Participe de eventos e conecte-se com outros fãs através de
                nossa comunidade.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-[url('./assets/bg-provisorio.png')] p-6 rounded-xl mb-4 bg-fixed">
                <CgGames className="text-8xl " />
              </div>
              <h3 className="text-xl font-semibold mb-2 ">JOGOS</h3>
              <p>
                Colabore e desafie seus amigos em missões exclusivas, e dispute
                seu lugar no topo do ranking!
              </p>
            </div>
          </div>
        </div>

        <div
          className="container mx-auto px-6 mt-20 flex
        flex-col
        justify-center items-center"
        >
          <h2 className="text-5xl font-bold text-center mb-6">
            POR QUE PARTICIPAR?
          </h2>
          <p className="text-xl text-center mb-6 max-w-4xl mx-auto">
            Se você é FURIA de verdade, o QG é onde você tem que estar. Aqui é o
            território oficial torcida da maior organização do Brasil. É onde
            você mostra sua força, enfrenta desafios, ganha recompensas
            exclusivas e sobe no ranking entre os mais furiosos. Não é só torcer
            — é viver a FURIA. Se quer fazer parte da elite da torcida, o QG é o
            seu próximo passo.
          </p>
          <div className="text-center">
            <Button
              text={"NÃO FIQUE DE FORA"}
              exec={() => navigate("/login")}
            ></Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
