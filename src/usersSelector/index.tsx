import { useState } from "react";
import { UserData } from "../types";
import { TriangleIcon } from "./TriangleIcon";

interface Props {
  users: UserData[];
  activeUser?: UserData;
  selectUser: (user?: UserData) => void;
  postsError: unknown;
  usersError: unknown;
  usersLoading: boolean;
}

export const UsersSelect = ({
  users,
  activeUser,
  selectUser,
  postsError,
  usersError,
  usersLoading,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const onToggle = () => setIsOpen(!isOpen);

  const onOptionClicked = (user?: UserData) => () => {
    selectUser(user);
    setIsOpen(false);
  };

  return (
    <>
      {(!!postsError || !!usersError) && <h2>Loading posts error</h2>}
      <p className="mb-5 block text-2xl">Authors:</p>
      {usersLoading ? (
        <></>
      ) : (
        <>
          <button
            tabIndex={0}
            aria-label="User Selection"
            onClick={onToggle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`select-option focus:select-option-active mb-5 justify-between border-b-[3px] ${
              isOpen && "select-option-active"
            }`}
          >
            {activeUser?.name || "All"}
            <TriangleIcon rotated={isHovered || isOpen} />
          </button>
          {isOpen && (
            <ul role="listbox">
              <li>
                <a
                  href="#"
                  role="option"
                  tabIndex={0}
                  aria-label="All Users"
                  onClick={onOptionClicked(undefined)}
                  className={`select-option focus:select-option-active last:border-b-[3px] ${
                    !activeUser && "select-option-active"
                  }`}
                >
                  All
                </a>
              </li>
              {...users.map((user) => (
                <li>
                  <a
                    href="#"
                    role="option"
                    tabIndex={0}
                    aria-label={user.name}
                    onClick={onOptionClicked(user)}
                    key={user.id || "all"}
                    className={`select-option focus:select-option-active last:border-b-[3px] ${
                      activeUser?.id === user.id && "select-option-active"
                    }`}
                  >
                    {user.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
};
