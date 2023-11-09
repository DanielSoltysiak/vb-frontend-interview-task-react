import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

interface Props {
  title: string;
  user?: string;
  body: string;
}

export const Post = ({ title, user, body }: Props) => {
  return (
    <div className="mb-10 flex-col sm:mb-20">
      <h2 className="mb-2 text-xl font-bold sm:text-4xl">
        {capitalizeFirstLetter(title)}
      </h2>
      <p className="mb-3 text-sm sm:text-lg">
        by <b>{user || "no data"}</b>
      </p>
      <p className="text-sm sm:text-lg">{body}</p>
    </div>
  );
};
