import isScrolledToBottom from "./isScrolledToBottom";
import type { ListObjectT, ResponseObjectT } from "../types/types";
import getFriends from "../http/getFriends";

type Props = {
  e: Event;
  loadingRef: React.MutableRefObject<boolean>;
  setFriendsList: React.Dispatch<React.SetStateAction<ListObjectT[]>>;
  user: { id: number } | undefined;
};

export const handleScrollP = ({
  e,
  loadingRef,
  setFriendsList,
  user,
}: Props): void => {
  if (!e.currentTarget) return;
  if (isScrolledToBottom() && !loadingRef.current && user?.id !== undefined) {
    loadingRef.current = true;
    getFriends(user?.id, 1).then((data: ResponseObjectT) => {
      const fetchedFriendsList: ListObjectT[] = data.list;
      setFriendsList((prev) => [...prev, ...fetchedFriendsList]);
      loadingRef.current = false;
    });
  }
};
