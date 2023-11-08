interface Props {
  title: string;
  user?: string;
  body: string;
}

export const Post = ({ title, user, body }: Props) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>by {user}</p>
      <p>{body}</p>
    </div>
  );
};
