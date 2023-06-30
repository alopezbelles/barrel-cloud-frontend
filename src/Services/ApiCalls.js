import axios from "axios";

export const getAll = async () => {
  try {
    const response = await axios.get("http://localhost:3656/getall");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


export const updateBooking = async (bookingId, status) => {
    try {
      const response = await axios.put("http://localhost:3656/update", {
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
      const response = await axios.delete("http://localhost:3656/delete", {
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