import { useState, useEffect } from "react";
import { PostData, UserData } from "./types";
import { Post } from "./Post";
import { UsersSelect } from "./usersSelector";
import { Popup } from "./popup";
import { InfoIcon } from "./popup/InfoIcon";

function App() {
  const [allPosts, setAllPosts] = useState<PostData[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number>();
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/")
      .then((response) => response.json())
      .then((json) => setAllPosts(json));

    fetch("https://jsonplaceholder.typicode.com/users/")
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);

  useEffect(() => {
    selectedUserId
      ? setFilteredPosts(
          allPosts.filter((post) => post.userId === selectedUserId)
        )
      : setFilteredPosts(allPosts);
  }, [allPosts, selectedUserId]);

  const closePopup = () => setIsPopupOpen(false);

  return (
    <>
      <Popup isOpen={isPopupOpen} onClose={closePopup} />
      <div className="flex flex-row gap-40 bg-neutral-100 px-24 font-lato text-vb-black">
        <section className="pt-20">
          <h1 className="mb-32 text-5xl font-bold">Posts</h1>
          {filteredPosts.map((post) => (
            <Post
              title={post.title}
              user={users.find((user) => user.id === post.userId)?.name}
              body={post.body}
              key={post.id}
            />
          ))}
        </section>
        <aside className="pt-9">
          <UsersSelect users={users} idSetter={setSelectedUserId} />
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
