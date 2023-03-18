import axios from "axios";

const apiURL = import.meta.env.VITE_REACT_API_URL;
type Props = {
  id: number;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

async function getUserById({ id, setError }: Props) {
  try {
    const response = await axios.get(apiURL + id);
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

export default getUserById;
