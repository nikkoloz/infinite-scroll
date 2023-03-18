import { VisitedT } from "../types/types";
import ROUTES from "../config/ROUTES";

type Props = {
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  visited: VisitedT[];
  navigate: (path: string) => void;
};

export const handleClick = ({ e, visited, navigate }: Props): void => {
  e.preventDefault();
  const foundUser = visited.find(
    (user) => user.fullname === e.currentTarget.innerHTML
  );
  const ROUTE = ROUTES.PREVIEW.replace(":id", foundUser?.id.toString() || "");
  navigate(`/${ROUTE}`);
};
