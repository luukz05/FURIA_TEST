import React, { useState } from "react";
import axios from "axios";

const CpfValidationForm = ({ cpf, onValidationComplete }) => {
  const [imageFile, setImageFile] = useState(null);
  const [confirmationStatus, setConfirmationStatus] = useState(null);
  const [isImageValid, setIsImageValid] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg"];
      if (!validTypes.includes(file.type)) {
        alert("Por favor, envie uma imagem válida (PNG ou JPEG).");
        return;
      }
      setImageFile(file);
    }
  };

  const validateCpf = async () => {
    if (!cpf || !imageFile) {
      alert("Por favor, forneça tanto o CPF quanto a imagem.");
      return;
    }

    const formData = new FormData();
    formData.append("cpf", cpf);
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        "https://furiatest-production.up.railway.app/ocr",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const extractedNumbers = response.data.extracted_numbers;

      // Função para normalizar CPF (remove tudo que não é número)
      const normalizeCpf = (cpfStr) => cpfStr.replace(/\D/g, "");

      const normalizedInputCpf = normalizeCpf(cpf);
      const normalizedExtractedCpfs = extractedNumbers.map(normalizeCpf);

      const isValid = normalizedExtractedCpfs.includes(normalizedInputCpf);

      setIsImageValid(isValid);
      setConfirmationStatus(
        isValid
          ? "Identificação confirmada com sucesso!"
          : "A foto não corresponde ao CPF."
      );

      if (onValidationComplete) {
        onValidationComplete(isValid);
      }
    } catch (error) {
      console.error("Erro na validação da imagem", error);
      setConfirmationStatus("Erro ao validar a imagem. Tente novamente.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 w-full">
        <label className="p-3 rounded-md mb-2 text-white placeholder-gray-400 focus:outline-none w-full">
          Selecione a foto do seu CPF:
        </label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          className="p-3 rounded-md bg-offblack text-white placeholder-gray-400 focus:outline-none w-full"
        />
      </div>

      <button
        onClick={validateCpf}
        className="mt-4 w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Confirmar Identidade
      </button>

      {confirmationStatus && (
        <div
          className={`mt-4 text-center text-lg ${
            isImageValid ? "text-green-500" : "text-red-500"
          }`}
        >
          {confirmationStatus}
        </div>
      )}
    </div>
  );
};

export default CpfValidationForm;
