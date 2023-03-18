import isScrolledToBottom from "./isScrolledToBottom";
import type { ListObjectT, ResponseObjectT } from "../types/types";
import getFriends from "../http/getFriends";

type PropsP = {
  e: Event;
  loadingRef: React.MutableRefObject<boolean>;
  setFriendsList: React.Dispatch<React.SetStateAction<ListObjectT[]>>;
  user: { id: number } | undefined;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

export const handleScrollP = ({
  e,
  loadingRef,
  setFriendsList,
  user,
  setError,
}: PropsP): void => {
  if (!e.currentTarget) return;
  if (isScrolledToBottom() && !loadingRef.current && user?.id !== undefined) {
    loadingRef.current = true;
    getFriends({ id: user?.id, page: 1, setError }).then(
      (data: ResponseObjectT) => {
        const fetchedFriendsList: ListObjectT[] = data.list;
        setFriendsList((prev) => [...prev, ...fetchedFriendsList]);
        loadingRef.current = false;
      }
    );
  }
};
