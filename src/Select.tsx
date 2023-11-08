import { Dispatch } from "react";
import { UserData } from "./types";

interface Props {
  users: UserData[];
  setter: Dispatch<number | undefined>;
}

export const Select = ({ users, setter }: Props) => {
  return (
    <select onChange={(e) => setter(Number(e.target.value))}>
      <option value={undefined}>All</option>
      {users.map((user) => (
        <option value={user.id} key={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
};
