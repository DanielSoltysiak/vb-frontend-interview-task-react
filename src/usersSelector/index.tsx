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
          <p
            onClick={onToggle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`select-option mb-5 justify-between border-b-[3px] ${
              isOpen && "select-option-active"
            }`}
          >
            {activeUser?.name || "All"}
            <TriangleIcon rotated={isHovered || isOpen} />
          </p>
          {isOpen && (
            <ul>
              <li
                onClick={onOptionClicked(undefined)}
                className={`select-option last:border-b-[3px] ${
                  !activeUser && "select-option-active"
                }`}
              >
                All
              </li>
              {...users.map((user) => (
                <li
                  onClick={onOptionClicked(user)}
                  key={user.id || "all"}
                  className={`select-option last:border-b-[3px] ${
                    activeUser?.id === user.id && "select-option-active"
                  }`}
                >
                  {user.name}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
};
