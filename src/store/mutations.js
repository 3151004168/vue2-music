import {
  USER_UID,
  SONG_URL,
  USER_INFO,
  SONG_INFO,
  SONG_INFOS,
  SINGER_ID,
  MV_INFO,
} from "./mutation_type.js";

export default {
  [USER_UID](state, id) {
    state.uId = id;
  },
  [SONG_URL](state, url) {
    state.songUrl = url;
  },
  [USER_INFO](state, userInfo) {
    state.userInfo = userInfo;
  },
  [SONG_INFO](state, songInfo) {
    state.songInfo = songInfo;
  },
  [SONG_INFOS](state, songListInfo) {
    state.songListInfo = songListInfo;
  },
  [SINGER_ID](state, singerId) {
    state.singerId = singerId;
  },
  [MV_INFO](state, id) {
    state.mvInfo= id;
  },
};
