import { PostData, UserData } from "../types";
import { Post } from "./Post";

interface Props {
  posts: PostData[];
  users: UserData[];
  postsLoading: boolean;
  postsError: unknown;
}

export const PostsList = ({
  posts,
  users,
  postsLoading,
  postsError,
}: Props) => {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold sm:mb-32 sm:text-5xl">Posts</h1>
      {!!postsError && <h2>Loading posts error</h2>}
      {postsLoading ? (
        <h2>Loading...</h2>
        ) : (
        posts.map((post) => (
          <Post
            title={post.title}
            user={users.find((user) => user.id === post.userId)?.name}
            body={post.body}
            key={post.id}
          />
        ))
      )}
    </>
  );
};
