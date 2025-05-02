import React, { useState } from "react";

function CPFInput() {
  const [cpf, setCpf] = useState("");

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

  return (
    <div>
      <input
        type="text"
        placeholder="CPF"
        value={cpf}
        onChange={handleCpfChange}
        maxLength="14" // Limita o comprimento para 14 caracteres (incluindo pontos e hífen)
        className="p-3 rounded-md bg-offblack text-white placeholder-gray-400 focus:outline-none w-full"
      />
    </div>
  );
}

export default CPFInput;
