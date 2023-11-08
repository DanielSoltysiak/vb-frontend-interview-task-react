import { Dispatch, useState } from "react";
import { UserData } from "../types";
import { TriangleIcon } from "./TriangleIcon";

interface Props {
  users: UserData[];
  idSetter: Dispatch<number | undefined>;
}

export const UsersSelect = ({ users, idSetter }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeUser, setActiveUser] = useState<UserData>();

  const onToggle = () => setIsOpen(!isOpen);

  const onOptionClicked = (user?: UserData) => () => {
    setActiveUser(user);
    idSetter(user?.id);
    setIsOpen(false);
  };

  return (
    <div>
      <p className="mb-5 block text-2xl">Authors:</p>
      <div>
        <p
          onClick={onToggle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`select-option mb-5 justify-between border-b-[3px] ${
            isOpen && "select-option-active"
          }`}
        >
          {activeUser?.name || "All"} <TriangleIcon rotated={isHovered || isOpen} />
        </p>
        {isOpen && (
          <ul>
            {[undefined, ...users].map((user) => (
              <li
                onClick={onOptionClicked(user)}
                key={user?.id || Math.random()}
                className={`select-option last:border-b-[3px] ${
                  activeUser?.id === user?.id && "select-option-active"
                }`}
              >
                {user?.name || "All"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
