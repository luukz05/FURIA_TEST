import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./SubmitButton";
import cookie from "react-cookies";

const ContarPalavraFuria = ({
  setIsModalOpen,
  setModalMessage,
  setModalType,
  setContagemExterna, // Se quiser mostrar a contagem fora também
  setUserData, // Se quiser atualizar dados do usuário no componente pai
  setMessage, // Caso queira exibir erro no pai
}) => {
  const [cpf, setCpf] = useState(null);

  useEffect(() => {
    const cookieCpf = cookie.load("cpf");
    setCpf(cookieCpf);
  }, []);

  const contarFuria = async () => {
    try {
      const resposta = await axios.get("./mockdata.json");
      const dados = resposta.data;
      let contador = 0;

      const contarOcorrencias = (textos) => {
        const regex = /FURIA/gi;
        textos.forEach((item) => {
          const ocorrencias = (item.match(regex) || []).length;
          contador += ocorrencias;
        });
      };

      dados.twitter.tweets.forEach((tweet) => contarOcorrencias([tweet.tweet]));
      dados.steam.recent_activity.forEach((a) =>
        contarOcorrencias([a.comment])
      );
      dados.hltv.posts.forEach((post) => contarOcorrencias([post.post]));
      dados.youtube.watched_videos.forEach((v) =>
        contarOcorrencias([v.video_title])
      );
      dados.instagram.posts.forEach((post) =>
        contarOcorrencias([post.post_caption])
      );
      dados.twitch.followed_channels.forEach((ch) =>
        contarOcorrencias([ch.stream_title])
      );

      setContagemExterna?.(contador);
      setModalMessage(`Você engajou com a FURIA ${contador} vez(es).`);

      if (contador > 8) {
        setModalType("success");
        setIsModalOpen(true);

        axios
          .patch(`http://127.0.0.1:5000/verify/${cpf}`)
          .then((response) => {
            setUserData?.(response.data);
          })
          .catch((error) =>
            setMessage?.(
              error.response?.data?.message || "Erro ao carregar os dados."
            )
          );
      } else {
        setModalType("error");
        setModalMessage(
          "Você não interagiu com a FURIA o suficiente para ser verificado."
        );
        setIsModalOpen(true);
      }
    } catch (error) {
      setModalType("error");
      setModalMessage("Erro ao buscar os dados.");
      setIsModalOpen(true);
    }
  };

  return (
    <div className="scale-60">
      <Button exec={contarFuria} text={"VERIFICAÇÃO + RECOMPENSA"} />
    </div>
  );
};

export default ContarPalavraFuria;
