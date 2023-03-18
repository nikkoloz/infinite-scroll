import axios from "axios";

const apiURL = import.meta.env.VITE_REACT_API_URL;

type Props = {
  id: number;
  page: number;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

async function getFriends({ id, page, setError }: Props) {
  try {
    const response = await axios.get(
      apiURL + id + "/friends" + "/" + page + "/20"
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.message) {
        setError(error.message);
      }
    }
  }
}
export default getFriends;
