import type { VisitedT } from "../types/types";
import { v4 as uuid } from "uuid";
import { handleClick } from "../functions/handleClick";
import { useNavigate } from "react-router-dom";

type Props = {
  visited: VisitedT[];
};

export const VisitedUsers = ({ visited }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="mx-3 inline">
      {visited.length > 1 &&
        visited.map((item, i) => {
          if (i === 0) return;
          return (
            <div key={uuid()} className="inline">
              {i !== 0 && i !== 1 && <span>{" / "}</span>}{" "}
              <button
                className="mx-2 text-main-blue focus:outline-none active:text-red-700"
                onClick={(e) => handleClick({ e, visited, navigate })}
              >
                {item.fullname}
              </button>
            </div>
          );
        })}
    </div>
  );
};
