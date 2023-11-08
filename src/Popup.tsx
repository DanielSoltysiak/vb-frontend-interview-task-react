import mountainsImg from "./assets/mountain-range.jpg";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Popup = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;
  return (
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <img src={mountainsImg} alt="mountain range" />
        <p>Info popup</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
