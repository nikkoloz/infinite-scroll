import axios from "axios";

const apiURL = import.meta.env.VITE_REACT_API_URL;

type Props = {
  page: number;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

async function getUsers({ page, setError }: Props) {
  try {
    const response = await axios.get(apiURL + page + "/20");
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

export default getUsers;
