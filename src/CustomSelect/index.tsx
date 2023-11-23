import { useState } from "react";
import { TriangleIcon } from "./TriangleIcon";

type Option = {
  id: number;
  name: string;
};

interface Props {
  options: Option[];
  activeOption?: Option;
  onOptionClicked: (option?: Option) => void;
  disabled?: boolean;
}

const CustomSelect = ({
  options,
  activeOption,
  onOptionClicked,
  disabled,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const onToggle = () => setIsOpen(!isOpen);

  const handleOptionClick = (option?: Option) => {
    onOptionClicked(option);
    setIsOpen(false);
  };

  return (
    <>
      <button
        disabled={disabled}
        tabIndex={0}
        aria-label="User Selection"
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`select-option focus:select-option-active mb-5 justify-between border-b-[3px] ${
          isOpen && "select-option-active"
        }`}
      >
        <p className="text-ellipsis">{activeOption?.name || "All"}</p>
        <TriangleIcon rotated={isHovered || isOpen} />
      </button>
      {isOpen && (
        <ul
          role="listbox"
          className="absolute z-10 w-[50vw] bg-neutral-100 sm:static sm:w-full "
        >
          <li>
            <button
              disabled={disabled}
              role="option"
              tabIndex={0}
              aria-label="All Users"
              onClick={() => handleOptionClick(undefined)}
              className={`select-option focus:select-option-active ${
                !activeOption && "select-option-active"
              }`}
            >
              All
            </button>
          </li>
          {...options.map((user) => (
            <li key={user.id} className="border-vb-black last:border-b-[3px]">
              <button
                disabled={disabled}
                role="option"
                tabIndex={0}
                aria-label={user.name}
                onClick={() => handleOptionClick(user)}
                className={`select-option focus:select-option-active ${
                  activeOption?.id === user.id && "select-option-active"
                }`}
              >
                {user.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CustomSelect;
