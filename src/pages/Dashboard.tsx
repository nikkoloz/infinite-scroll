import { useEffect, useState, useRef } from "react";
import { InfiniteScroll } from "../components/InfiniteScroll";
import getUsers from "../http/getUsers";
import type { ListObjectT, ResponseObjectT } from "../types/types";
import { handleScrollD } from "../functions/handleScrollDashboard";

export const Dashboard = () => {
  const [usersList, setUsersList] = useState<ListObjectT[]>([]);
  const [nextPage, setNextPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const loadingRef = useRef<boolean>(false);

  //for the first time
  useEffect(() => {
    setLoading(true);
    getUsers({ page: 1, setError }).then((data: ResponseObjectT) => {
      setLoading(false);
      const fetchedUsersList: ListObjectT[] = data.list;
      if (fetchedUsersList === undefined) throw "No users fetched";
      setUsersList(fetchedUsersList);
      if (data.pagination.nextPage !== null) {
        setNextPage(data.pagination.nextPage);
      }
    });
  }, []);
  //add event listener for scroll to fetch more data
  useEffect(() => {
    window.addEventListener("scroll", (e) =>
      handleScrollD({
        e,
        loadingRef,
        nextPage,
        setUsersList,
        setNextPage,
        setError,
      })
    );
    return () =>
      window.removeEventListener("scroll", (e) =>
        handleScrollD({
          e,
          loadingRef,
          nextPage,
          setUsersList,
          setNextPage,
          setError,
        })
      );
  }, []);

  return (
    <div className="bg-main-blue mx-auto max-w-[1200px]">
      <div className="text-center ">
        <h1 className="bg-slate-600 px-3 py-4 text-2xl  font-semibold text-white">
          INFINITE SCROLL
        </h1>
      </div>
      {!error && <InfiniteScroll usersList={usersList} />}
      {loading && <h1>loading...</h1>}
    </div>
  );
};
