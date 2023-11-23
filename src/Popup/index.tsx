import { useEffect } from "react";
import mountainsImg from "../assets/mountain-range.jpg";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Popup = ({ isOpen, onClose }: Props) => {
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" && onClose();

    if (isOpen) {
      window.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div onClick={onClose} className="fixed h-full w-full bg-vb-overlay">
      <div
        id="popup"
        onClick={(e) => e.stopPropagation()}
        className="mx-[20vw] my-[10vh] grid gap-y-[7vh] border-[3px] border-vb-black bg-neutral-100 py-[7vh] text-center text-2xl font-bold"
      >
        <img
          src={mountainsImg}
          alt="mountain range"
          className="mx-auto w-[35vw]"
        />
        <p>Info popup</p>
        <button
          onClick={onClose}
          className="focus:select-option-active mx-auto w-min border-[3px] border-vb-black px-[18%] py-[1%]"
        >
          Close
        </button>
      </div>
    </div>
  );
};
