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
        <h2>Loading...</h2>
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
            <p className="text-ellipsis">{activeUser?.name || "All"}</p>
            <TriangleIcon rotated={isHovered || isOpen} />
          </button>
          {isOpen && (
            <ul
              role="listbox"
              className="absolute z-10 w-[50vw] bg-neutral-100 sm:static sm:w-full "
            >
              <li>
                <button
                  role="option"
                  tabIndex={0}
                  aria-label="All Users"
                  onClick={onOptionClicked(undefined)}
                  className={`select-option focus:select-option-active ${
                    !activeUser && "select-option-active"
                  }`}
                >
                  All
                </button>
              </li>
              {...users.map((user) => (
                <li
                  key={user.id}
                  className="border-vb-black last:border-b-[3px]"
                >
                  <button
                    role="option"
                    tabIndex={0}
                    aria-label={user.name}
                    onClick={onOptionClicked(user)}
                    className={`select-option focus:select-option-active ${
                      activeUser?.id === user.id && "select-option-active"
                    }`}
                  >
                    {user.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
};
