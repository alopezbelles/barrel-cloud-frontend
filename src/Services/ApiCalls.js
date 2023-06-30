import axios from "axios";

export const getAll = async () => {
  try {
    const response = await axios.get("http://localhost:3656/getall");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
