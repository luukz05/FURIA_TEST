import React from "react";
import { useNavigate } from "react-router-dom"; // Para redirecionamento
import Button from "./SubmitButton";

const Modal = ({ isOpen, message, onClose, type, url }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const modalStyles = {
    backgroundColor: type === "error" ? "bg-red-800" : "bg-green-500",
    textColor: type === "error" ? "text-white" : "text-black",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-80">
      <div
        className={`text-white p-6 ${modalStyles.backgroundColor} ${modalStyles.textColor} rounded-lg shadow-lg`}
      >
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="font-semibold text-xl">AVISO!</h2>
          <button onClick={onClose} className="text-2xl">
            ×
          </button>
        </div>
        <p>{message}</p>
        {type === "success" && (
          <Button text={"OK"} exec={() => navigate(url)} />
        )}
      </div>
    </div>
  );
};

export default Modal;
