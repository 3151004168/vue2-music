import axios from "axios";
export const getHomePage = async () => {
  const data = await axios("/homepage/block/page", {
    params: {
      refresh: true,
    },
  });
  return data;
};
