import axios from "axios";

export const signUp = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
    await axios
      .post("http://localhost:5146/api/Auth/Register", {
        firstName,
        lastName,
        email,
        password,
      })
      .then((res) => console.log("res:", res))
      .catch((err) => {
        if (err !== null) {
          throw new Error(err.response.data.Message);
        }
      });
};
