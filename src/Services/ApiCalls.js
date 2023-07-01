import axios from "axios";

const URL ="https://barrel-cloud-backend-production.up.railway.app"

export const getAll = async () => {
  try {
    const response = await axios.get(`${URL}/getall`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


export const updateBooking = async (bookingId, status) => {
    try {
      const response = await axios.put(`${URL}/update`, {
        id: bookingId,
        status: status,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const deleteBooking = async (bookingId) => {
    try {
      const response = await axios.delete(`${URL}/delete`, {
        data: { id: bookingId },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const addBooking = async (bookingData) => {
    try {
      const response = await axios.post("http://localhost:3656/newbooking", bookingData);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };