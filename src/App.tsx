import { useState, useEffect } from "react";
import "./App.css";
import { PostData, UserData } from "./types";
import { Post } from "./Post";
import { Select } from "./Select";
import { Popup } from "./Popup";

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
      <button onClick={() => setIsPopupOpen(true)}>open</button>
      <Select users={users} setter={setSelectedUserId} />
      <h1>Posts</h1>
      {filteredPosts.map((post) => (
        <Post
          title={post.title}
          user={users.find((user) => user.id === post.userId)?.name}
          body={post.body}
          key={post.id}
        />
      ))}
    </>
  );
}

export default App;
