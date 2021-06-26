import axios from "@/api/axios";
// 获取用户信息
export const getUserInfo = async (uId) => {
  const { data } = await axios("/user/detail", {
    params: {
      uid: uId,
    },
  });
  // console.log(data);
  return data;
};
// 获取歌单列表
export const getSongList = async (uId) => {
  const { data } = await axios("/user/playlist", {
    params: {
      uid: uId,
    },
  });
  // console.log(data);
  return data;
};

// 获取歌单列表详情
export const getSongIds = async (songIds) => {
  const { data } = await axios("/playlist/detail", {
    params: {
      id: songIds,
    },
  });
  return data;
};
// 获取歌曲url
export const getSongUrl = async (songId) => {
  const { data } = await axios("/song/url", {
    params: {
      id: songId,
    },
  });
  return data;
};
// 获取歌曲详情
export const getSongInfo = async (songId) => {
  const { data } = await axios("/song/detail", {
    params: {
      ids: songId,
    },
  });
  return data;
};
