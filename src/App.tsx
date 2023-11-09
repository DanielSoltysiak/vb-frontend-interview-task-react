import { useState, useEffect, useCallback } from "react";
import { PostData, UserData } from "./types";
import { UsersSelect } from "./usersSelector";
import { Popup } from "./popup";
import { InfoIcon } from "./popup/InfoIcon";
import { changeUrl } from "./utils/urlChange";
import { useFetchData } from "./utils/useFetchData";
import { PostsList } from "./PostsList";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData>();
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>([]);

  const {
    data: allPosts,
    loading: postsLoading,
    error: postsError,
  } = useFetchData<PostData>("https://jsonplaceholder.typicode.com/posts/");

  const {
    data: users,
    loading: usersLoading,
    error: usersError,
  } = useFetchData<UserData>("https://jsonplaceholder.typicode.com/users/");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialUser = users.find(
      (user) => user.id === Number(urlParams.get("user"))
    );
    setSelectedUser(initialUser);
  }, [setSelectedUser, users]);

  useEffect(() => {
    selectedUser
      ? setFilteredPosts(
          allPosts.filter((post) => post.userId === selectedUser.id)
        )
      : setFilteredPosts(allPosts);
  }, [allPosts, selectedUser]);

  const selectUser = useCallback((user?: UserData) => {
    changeUrl(user?.id);
    setSelectedUser(user);
  }, []);

  const closePopup = useCallback(() => setIsPopupOpen(false), []);

  return (
    <>
      <Popup isOpen={isPopupOpen} onClose={closePopup} />
      <div className="flex flex-row gap-40 bg-neutral-100 px-24 font-lato text-vb-black">
        <section className="pt-20">
          <PostsList
            posts={filteredPosts}
            users={users}
            postsLoading={postsLoading}
            postsError={postsError}
          />
        </section>
        <aside className="pt-9">
          {usersLoading ? (
            <></>
          ) : (
            <UsersSelect
              users={users}
              activeUser={selectedUser}
              selectUser={selectUser}
              postsError={postsError}
              usersError={usersError}
              usersLoading={usersLoading}
            />
          )}
        </aside>
        <footer>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="fixed bottom-0 pb-9"
          >
            <InfoIcon />
          </button>
        </footer>
      </div>
    </>
  );
}

export default App;
