import isScrolledToBottom from "./isScrolledToBottom";
import getUsers from "../http/getUsers";
import type { ListObjectT, ResponseObjectT } from "../types/types";

type Props = {
  e: Event;
  loadingRef: React.MutableRefObject<boolean>;
  nextPage: number;
  setUsersList: React.Dispatch<React.SetStateAction<ListObjectT[]>>;
  setNextPage: React.Dispatch<React.SetStateAction<number>>;
};

export const handleScrollD = ({
  e,
  loadingRef,
  nextPage,
  setUsersList,
  setNextPage,
}: Props): void => {
  if (!e.currentTarget) return;
  if (isScrolledToBottom() && !loadingRef.current) {
    loadingRef.current = true;
    getUsers(nextPage).then((data: ResponseObjectT) => {
      const fetchedUsersList: ListObjectT[] = data.list;
      setUsersList((prev) => [...prev, ...fetchedUsersList]);
      if (data.pagination.nextPage !== null) {
        setNextPage(data.pagination.nextPage);
      }
      loadingRef.current = false;
    });
  }
};
