import { Link } from "react-router-dom";
import type { ListObjectT } from "../types/types";

type CardProps = {
  user: ListObjectT;
};

export const Card = ({ user }: CardProps) => {
  return (
    <div className="mb-4 w-1/2 lg:w-1/4 ">
      <div className="mx-3 text-white rounded-lg bg-slate-600 ">
        <Link to={`/preview/${user.id}`}>
          <img
            src={user.imageUrl + "/" + user.id}
            alt="img"
            className="w-full rounded-lg"
          />
          <span className="ml-2 font-bold">{user.prefix}</span>{" "}
          <span className="font-bold">{user.name}</span>{" "}
          <span className="font-bold">{user.lastName}</span>
          <p className="ml-2">{user.title}</p>
        </Link>
      </div>
    </div>
  );
};
