import { Link } from "react-router-dom";
import type { ListObjectT } from "../types/types";

type CardProps = {
  user: ListObjectT;
};

export const Card = ({ user }: CardProps) => {
  return (
    <div className="mb-6 w-1/2 lg:w-1/4 ">
      <div className="mx-3 rounded-lg bg-white shadow-md">
        <Link to={`/preview/${user.id}`}>
          <img
            src={user.imageUrl + "/" + user.id}
            alt="img"
            className="mb-[5px] w-full rounded-t-lg"
          />
          <div>
            <span className="ml-3 font-bold">{user.prefix}</span>{" "}
            <span className="font-bold">{user.name}</span>{" "}
            <span className="font-bold">{user.lastName}</span>
          </div>
          <p className="ml-3 mt-[5px] pb-[6px]">{user.title}</p>
        </Link>
      </div>
    </div>
  );
};
