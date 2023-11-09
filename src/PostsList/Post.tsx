import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

interface Props {
  title: string;
  user?: string;
  body: string;
}

export const Post = ({ title, user, body }: Props) => {
  return (
    <div className="mb-20 flex-col">
      <h2 className="mb-2 text-4xl font-bold">
        {capitalizeFirstLetter(title)}
      </h2>
      <p className="mb-3 text-lg">
        by <b>{user || "no data"}</b>
      </p>
      <p className="text-lg">{body}</p>
    </div>
  );
};
