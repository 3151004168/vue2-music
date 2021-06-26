import axios from "axios";
export const getLogin = async (err, values) => {
  if (!err) {
    const { data } = await axios.get("/login/cellphone", {
      params: {
        phone: values.userName,
        password: values.password,
      },
    });
    console.log(data);
    return data
  }
};
