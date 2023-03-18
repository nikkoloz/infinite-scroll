import { useEffect, useRef, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { InfiniteScroll } from "../components/InfiniteScroll";
import type { ListObjectT, PersonT } from "../types/types";
import getUserById from "../http/getUserById";
import getFriends from "../http/getFriends";
import { AppContext } from "../context/AppContext";
import addVisited from "../functions/addVisited";
import ROUTES from "../config/ROUTES";
import { handleScrollP } from "../functions/handleScrollPreview";
import { VisitedUsers } from "../components/VisitedUsers";

export const Preview = () => {
  const { visited, setVisited } = useContext(AppContext);
  const [user, setUser] = useState<PersonT | undefined>(undefined);
  const [friendsList, setFriendsList] = useState<ListObjectT[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { id } = useParams();
  const navigate = useNavigate();
  const loadingRef = useRef<boolean>(false);

  useEffect(() => {
    if (id !== undefined) {
      setLoading(true);
      getUserById({ id: parseInt(id), setError })
        .then((data: PersonT) => {
          const fetchedUser: PersonT = data;
          if (fetchedUser === undefined) throw "No user fetched";
          setUser(fetchedUser);
          setLoading(false);
          addVisited({ fetchedUser, visited, setVisited });
          return fetchedUser.id;
        })
        .then((id) => {
          if (id) {
            setLoading(true);
            getFriends({ id, page: 1, setError }).then((data) => {
              const fetchedFriendsList: ListObjectT[] = data.list;
              setFriendsList(fetchedFriendsList);
              setLoading(false);
            });
          }
        });
    } else {
      navigate(ROUTES.DASHBOARD);
      throw new Error("user is undefined");
    }
  }, [id]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);
  useEffect(() => {
    window.addEventListener("scroll", (e: Event) => {
      handleScrollP({
        e,
        user,
        loadingRef,
        setFriendsList,
        setError,
      });
    });
    return () =>
      window.removeEventListener("scroll", (e: Event) => {
        handleScrollP({
          e,
          user,
          loadingRef,
          setFriendsList,
          setError,
        });
      });
  }, [user]);
  return (
    <>
      <div className="mx-auto max-w-[1200px]">
        <div className="relative mb-4 rounded-b-lg px-3  py-4 text-center text-black ">
          <Link to={ROUTES.DASHBOARD}>
            <h1 className="INFINITE SCROLL inline text-2xl font-semibold tracking-widest text-main-blue">
              INFINITE SCROLL
            </h1>
          </Link>
        </div>
      </div>
      {user !== undefined && (
        <div className="mx-auto max-w-[1200px] px-10 ">
          <div className="shadow- mx-auto mb-5 max-w-[450px] rounded-xl border border-gray-300 bg-white p-5 px-3 md800:flex md800:max-w-none md800:justify-around">
            <div className="mt-3 flex flex-col">
              <img
                src={user?.imageUrl + "/" + id}
                alt="img"
                className=" mx-auto mb-3 h-[230px] w-[230px] rounded-full "
              />
              <p className=" text-center font-bold ">
                {user?.prefix} {user.name} {user?.lastName}
              </p>
              <p className="mb-1 text-center text-gray-700">{user.title}</p>
              <p className=" text-center text-gray-700">
                {user.company.name} {user.company.suffix}
              </p>
            </div>

            <div className="relative mx-auto  mb-5 max-w-[570px] rounded-xl   px-2 pt-1 pb-3  lg:mx-0 lg:mb-0 lg:w-1/3 lg:max-w-none">
              <p className=" mb-2 border-b-2 border-black border-opacity-25  px-1 text-lg text-main-blue">
                Info
              </p>
              <div className=" mb-2">
                <p className=" font-bold text-gray-700">Email </p>
                <p className=" inline text-gray-700">{user.email}</p>
              </div>
              <div className="mb-2">
                <p className=" font-bold text-gray-700">Ip Address </p>
                <p className=" inline text-gray-700">{user.ip}</p>
              </div>
              <div className="mb-2">
                <p className=" font-bold text-gray-700">Job Area </p>
                <p className=" inline text-gray-700">{user.jobArea}</p>
              </div>
              <div className="mb-2">
                <p className=" font-bold text-gray-700">Job Type </p>
                <p className=" inline text-gray-700">{user.jobType}</p>
              </div>
            </div>

            <div className="relative mx-auto mb-4 max-w-[570px] rounded-xl px-2 pt-1 lg:mx-0 lg:w-1/3 lg:max-w-none">
              <p className="mb-2 border-b-2 border-black border-opacity-25  px-1 text-lg text-main-blue">
                Address
              </p>
              <div className="mb-2">
                <p className="font-bold text-gray-700">City </p>
                <span className=" font-normal text-gray-700">
                  {user.address.city}
                </span>
              </div>
              <div className="mb-2">
                <p className="font-bold text-gray-700">Country </p>
                <span className=" font-normal text-gray-700">
                  {user.address.country}
                </span>
              </div>
              <div className="mb-2">
                <p className="font-bold text-gray-700">Street Address </p>
                <span className=" font-normal text-gray-700">
                  {user.address.streetAddress}
                </span>
              </div>
              <div className="mb-2">
                <p className="font-bold text-gray-700">ZIP</p>
                <span className=" font-normal text-gray-700">
                  {" "}
                  {user.address.zipCode}
                </span>
              </div>
            </div>
          </div>
          <VisitedUsers visited={visited} />
          <h2 className="mx-3 my-4 text-xl font-bold">Friends</h2>
          <InfiniteScroll usersList={friendsList} />
          {loading && <h1 className="font-bold">loading...</h1>}
        </div>
      )}
      {error && (
        <h1 className="text-center text-2xl font-bold text-red-800">{error}</h1>
      )}
    </>
  );
};
