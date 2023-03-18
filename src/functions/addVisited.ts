import type { PersonT, VisitedT } from "../types/types";

type Props = {
  fetchedUser: PersonT;
  visited: VisitedT[];
  setVisited: React.Dispatch<React.SetStateAction<VisitedT[]>>;
};

const addVisited = ({ fetchedUser, visited, setVisited }: Props) => {
  if (fetchedUser === undefined) return;
  const isVisited = visited.some((item) => item.id === fetchedUser.id);
  if (!isVisited) {
    setVisited(
      (prev) =>
        [
          ...prev,
          {
            id: fetchedUser.id,
            fullname:
              fetchedUser.prefix +
              " " +
              fetchedUser.name +
              " " +
              fetchedUser.lastName,
          },
        ] as VisitedT[]
    );
  }
};

export default addVisited;
