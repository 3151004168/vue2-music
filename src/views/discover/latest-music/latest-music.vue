<template>
  <div class="latest-music">
    <a-menu
      :default-selected-keys="['1']"
      mode="horizontal"
      style="border: none; display: flex; justify-content: center"
    >
      <a-menu-item key="1" @click="getIsSong">新歌速递 </a-menu-item>
      <a-menu-item key="2" @click="getIsDisc">新碟上架 </a-menu-item>
    </a-menu>
    <keep-alive>
      <div class="song" v-if="isSong">
        <div class="tag">
          <ul class="cate">
            <li>全部</li>
            <li>华语</li>
            <li>欧美</li>
            <li>韩国</li>
            <li>日本</li>
          </ul>
          <ul class="btn">
            <li>
              <a-button type="primary" style="border-radius: 50px">
                播放全部
              </a-button>
            </li>
            <li>
              <a-button type="primary" style="border-radius: 50px">
                收藏全部
              </a-button>
            </li>
          </ul>
        </div>
        <div
          class="song-info"
          v-for="(item, index) in songInfos"
          :key="item.id"
          @click="getSong(item.id)"
          :class="[index % 2 == 0 ? 'bgc' : '']"
        >
          <div class="song-info-left">
            <span>{{ index + 1 }}</span>
            <img :src="item.album.blurPicUrl" alt="" />
            <span
              >{{ item.name }}
              <span style="color: #999">{{
                item.alias[0] ? "(" + item.alias[0] + ")" : ""
              }}</span></span
            >
          </div>
          <div class="song-info-right">
            <div>
              <span v-for="name in item.artists" :key="name.id">{{
                name.name + " "
              }}</span>
            </div>
            <span>{{ item.album.name }}</span>
          </div>
        </div>
      </div>
      <div class="disc" v-else>
        <div class="tag">
          <ul class="cate">
            <li>全部</li>
            <li>华语</li>
            <li>欧美</li>
            <li>韩国</li>
            <li>日本</li>
          </ul>
          <ul class="btn">
            <li>
              <a-button type="primary" style="border-radius: 50px">
                推荐
              </a-button>
            </li>
            <li>
              <a-button type="primary" style="border-radius: 50px">
                全部
              </a-button>
            </li>
          </ul>
        </div>
        <h2>本周新碟</h2>
        <div class="disc-info">
          <div
            class="disc-info-item"
            v-for="item in album"
            :key="item.id"
            @click="getSong(item.id)"
          >
            <img :src="item.picUrl" alt="" />
            <div class="text">
              <span
                >{{ item.name
                }}<span style="color: #999">{{
                  item.alias[0] ? "(" + item.alias[0] + ")" : ""
                }}</span></span
              >
              <span>{{ item.artists[0].name }}</span>
            </div>
          </div>
        </div>
      </div>
    </keep-alive>
  </div>
</template>

<script>
import axios from "@/api/axios";
import { getSongInfo, getSongUrl } from "@/api/getUserInfo";
export default {
  data() {
    return {
      songInfos: "",
      isSong: true,
      top: 10,
      bottom: 10,
      album: "",
    };
  },
  methods: {
    async getNewSong() {
      const { data } = await axios("/personalized/newsong", {
        params: {
          limit: 100,
        },
      });
      // console.log(data.result);
      let res = [];

      for (let i = 0; i < data.result.length; i++) {
        res.push(data.result[i].song);
        // console.log(data.result[i].song);
      }
      // console.log(res);
      this.songInfos = res;
    },
    async getSong(id) {
      console.log(id);
      const songUrl = await getSongUrl(id);
      this.$store.commit("SONG_URL", songUrl.data[0]);
      const songInfo = await getSongInfo(id);
      // console.log(songInfo.songs);
      this.$store.commit("SONG_INFO", songInfo.songs[0]);
    },
    async getAlbum() {
      const { data } = await axios("/album/new");
      console.log(data);
      this.album = data.albums;
    },
    getIsDisc() {
      this.isSong = false;
    },
    getIsSong() {
      this.isSong = true;
    },
  },
  created() {
    this.getNewSong();
    this.getAlbum();
  },
};
</script>

<style lang="scss" scoped>
.latest-music {
  .song {
    .tag {
      display: flex;
      justify-content: space-between;
      .cate {
        width: 40%;
      }
      .cate,
      .btn {
        display: flex;
        justify-content: space-around;
        align-items: center;
        cursor: pointer;
        li {
          margin-right: 10px;
        }
      }
    }
    .song-info:hover {
      background-color: rgba($color: #000000, $alpha: 0.15);
    }
    .song-info {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .song-info-left {
        width: 50%;
        height: 80px;
        display: flex;
        align-items: center;
        span {
          margin-right: 20px;
        }
        img {
          width: 65px;
          margin-right: 20px;
          border-radius: 10px;
          box-shadow: 10px 5px 5px rgba($color: #000000, $alpha: 0.1);
        }
      }
      .song-info-right {
        width: 50%;
        display: flex;
        justify-content: space-between;
        div + span {
          margin-right: 20px;
        }
      }
    }
  }
  .disc {
    position: relative;
    .tag {
      display: flex;
      justify-content: space-between;
      .cate {
        width: 40%;
      }
      .cate,
      .btn {
        display: flex;
        justify-content: space-around;
        align-items: center;
        cursor: pointer;
        li {
          margin-right: 10px;
        }
      }
    }
    h2 {
      width: 20px;
      position: absolute;
      left: 20px;
      top: 40px;
    }
    .disc-info {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;
      .text {
        display: flex;
        flex-direction: column;
        width: 80%;
      }
      padding-left: 60px;
      .disc-info-item {
        width: 23%;
        display: flex;
        flex-direction: column;
        img {
          width: 80%;
          margin-right: 20px;
          border-radius: 10px;
          box-shadow: 10px 5px 5px rgba($color: #000000, $alpha: 0.1);
        }
        .text {
          height: 70px;
        }
      }
    }
  }
}
.bgc {
  background-color: rgba($color: rgb(197, 191, 191), $alpha: 0.1);
}
</style>