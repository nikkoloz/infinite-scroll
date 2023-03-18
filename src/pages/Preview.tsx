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
    window.addEventListener("scroll", (e) =>
      handleScrollP({ e, user, loadingRef, setFriendsList })
    );
    return () =>
      window.removeEventListener("scroll", (e) =>
        handleScrollP({ e, user, loadingRef, setFriendsList })
      );
  }, [user]);
  return (
    <>
      <div className="max-w-[1200px] mx-auto ">
        <div className="relative bg-slate-600 px-3 py-4 text-center  text-white mb-4 rounded-b-lg ">
          <Link to={ROUTES.DASHBOARD}>
            <button className="left-[20px] absolute rounded-full border-none bg-slate-500  px-2 font-medium text-white">
              Back
            </button>
          </Link>
          <h1 className="INFINITE SCROLL inline text-2xl  font-semibold">
            INFINITE SCROLL
          </h1>
        </div>
      </div>
      {user !== undefined && (
        <div className="mx-auto max-w-[1200px]">
          <div className="flex px-3">
            <img
              src={user?.imageUrl + "/" + id}
              alt="img"
              className="mr-4 h-[270px] w-[270px] rounded-lg"
            />
            <div className="relative w-full border border-black px-2 pt-2">
              <p className="absolute top-[-15px] bg-white px-1 text-lg">Info</p>
              <p className="font-bold">
                {user?.prefix} {user.name} {user?.lastName}
              </p>
              <p className="mb-4">{user.title}</p>
              <div>
                <p className="inline underline">Email: </p>
                <p className="inline">{user.email}</p>
              </div>
              <div>
                <p className="inline underline">Ip Addres: </p>
                <p className="inline">{user.ip}</p>
              </div>
              <div>
                <p className="inline underline">Job Area: </p>
                <p className="inline">{user.jobArea}</p>
              </div>
              <div>
                <p className="inline underline">Job Type: </p>
                <p className="inline">{user.jobType}</p>
              </div>
            </div>
            <div className="relative ml-4 border border-black px-2 pt-2">
              <p className="absolute top-[-15px] bg-white px-1 text-lg">
                Adress
              </p>
              <p className="font-bold">
                {user.company.name} {user.company.suffix}
              </p>
              <p className="underline">City: {user.address.city}</p>
              <p className="underline">Country: {user.address.country}</p>
              <p className="underline">
                Street Address: {user.address.streetAddress}
              </p>
              <p className="underline">ZIP: {user.address.zipCode}</p>
            </div>
          </div>
          <VisitedUsers visited={visited} />
          <h2 className="mx-3">Friends:</h2>
          <InfiniteScroll usersList={friendsList} />
          {loading && <h1>loading...</h1>}
        </div>
      )}
      {error && (
        <h1 className="text-center text-2xl font-bold text-red-800">{error}</h1>
      )}
    </>
  );
};
