import React from "react";

const levels = [
  { name: "Pequeno Furico", xpRequired: 0 },
  { name: "Pantera de Cobre", xpRequired: 200 },
  { name: "Pantera de Bronze", xpRequired: 500 },
  { name: "Pantera de Prata", xpRequired: 1000 },
  { name: "Pantera de Ouro", xpRequired: 1800 },
  { name: "Pantera de Esmeralda", xpRequired: 3000 },
  { name: "Pantera de Platina", xpRequired: 5000 },
  { name: "Pantera de Diamante", xpRequired: 7500 },
  { name: "Pantera Imortal", xpRequired: 10000 },
  { name: "Fúria Suprema", xpRequired: 15000 },
];

function getLevelInfo(xp) {
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i].xpRequired) {
      const current = levels[i];
      const next = levels[i + 1] || current; // Se for o último nível
      return {
        currentLevel: current.name,
        nextLevel: next.name,
        currentXP: xp - current.xpRequired,
        nextLevelXP: next.xpRequired - current.xpRequired || 1, // Evita divisão por 0
        progressPercent:
          ((xp - current.xpRequired) /
            (next.xpRequired - current.xpRequired || 1)) *
          100,
        remainingXP: next.xpRequired - xp,
      };
    }
  }
}

export default function UserProgress({ totalXP }) {
  const {
    currentLevel,
    nextLevel,
    currentXP,
    nextLevelXP,
    progressPercent,
    remainingXP,
  } = getLevelInfo(totalXP);

  return (
    <div className="w-full text-2xl">
      <div className="w-full bg-white/10 rounded-xl overflow-hidden">
        <div
          className="bg-gradient-to-r from-green-500 to-green-950 text-sm font-bold flex flex-row items-center justify-center text-white text-center p-2 transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        >
          {currentXP} XP
        </div>
      </div>

      <p className="mt-4 text-white">
        Faltam <strong>{remainingXP} XP</strong> para subir de nível!
      </p>

      <p className="mt-2 text-offwhite text-base">
        Nível atual: <strong>{currentLevel}</strong> → Próximo:{" "}
        <strong>{nextLevel}</strong>
      </p>

      <div className="mt-6 space-y-2 text-offwhite text-base grid grid-cols-2 gap-4 ">
        {levels.map((level, index) => {
          const nextXP = levels[index + 1]?.xpRequired ?? "∞";
          return (
            <p
              key={index}
              className={
                level.name === currentLevel
                  ? "text-white font-bold"
                  : level.name === nextLevel
                  ? "text-white"
                  : ""
              }
            >
              {level.name} {level.xpRequired} →{" "}
              {isNaN(nextXP) ? "∞" : nextXP - 1}
            </p>
          );
        })}
      </div>
    </div>
  );
}
