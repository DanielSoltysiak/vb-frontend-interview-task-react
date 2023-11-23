import { UserData } from "../types";
import CustomSelect from "../CustomSelect";

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
  return (
    <>
      {(!!postsError || !!usersError) && <h2>Loading posts error</h2>}
      <p className="mb-5 block text-2xl">Authors:</p>
      {usersLoading ? (
        <h2>Loading...</h2>
      ) : (
        <CustomSelect
          options={users}
          activeOption={activeUser}
          onOptionClicked={selectUser}
        />
      )}
    </>
  );
};
