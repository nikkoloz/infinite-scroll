import { Card } from "./Card";
import type { ListObjectT } from "../types/types";
import { v4 as uuid } from "uuid";

type InfiniteScrollProps = {
  usersList: ListObjectT[];
};

export const InfiniteScroll = ({ usersList }: InfiniteScrollProps) => {
  return (
    <div className="mt-2 flex flex-wrap max-w-[1200px] mx-auto">
      {usersList.map((user: ListObjectT) => (
        <Card key={uuid()} user={user} />
      ))}
    </div>
  );
};
