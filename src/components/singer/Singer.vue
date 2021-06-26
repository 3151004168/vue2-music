<template>
  <div class="singer">
    <header class="header">
      <img :src="singerInfos.img1v1Url" alt="" />
      <div class="info">
        <h2>{{ singerInfos.name }}</h2>
        <div>
          <span v-for="item in singerInfos.alias" :key="item">{{ item }}</span>
        </div>
        <a-button style="margin: 15px 0; border-radius: 50px"
          ><i class="iconfont icon-shoucanggedan"></i> 收藏全部</a-button
        >
        <p>
          单曲数:{{ singerInfos.musicSize }}&nbsp;&nbsp;&nbsp;&nbsp; 专辑数:{{
            singerInfos.mvSize
          }}&nbsp;&nbsp;&nbsp;&nbsp; mv数:{{ singerInfos.albumSize }}
        </p>
      </div>
    </header>
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="专辑">
        <div class="container">
          <div class="left">
            <img src="../../assets/avatar.jpg" alt="" />
          </div>
          <div class="right">
            <p>热门50首</p>
            <div
              v-for="(item, index) in hotSongs"
              :key="item.id"
              class="song-infos"
              style="cursor: pointer"
              :class="[index % 2 == 0 ? 'bgc' : '']"
              @dblclick="getSongId(item.id)"
            >
              <div>
                <span> {{ index + 1 }} </span>
                <span class="iconfont icon-xihuan"></span>
                <span class="iconfont icon-xiazai1"></span>
                <span class="color"> {{ item.name }}</span>
              </div>
              <div class="brief">{{ item.dt }}</div>
            </div>
            <p>查看全部50首</p>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="MV" force-render class="mvs">
        <div v-for="item in mvs" :key="item.id" class="mvs-item">
          <img :src="item.imgurl" alt="" />
          <p>{{ item.name }}</p>
        </div>
      </a-tab-pane>
      <a-tab-pane key="3" tab="歌手详情">
        <div class="introduction" v-for="item in introduction" :key="item.ti">
          <h3>{{ item.ti }}</h3>
          <pre> {{ item.txt }}</pre>
        </div>
      </a-tab-pane>
      <a-tab-pane key="4" tab="相似歌手">
        <div class="singer">
          <div
            class="singer-info"
            v-for="item in artists"
            :key="item.id"
            @click="getSinger(item.id)"
          >
            <img :src="item.picUrl" alt="" />
            <div class="name">{{ item.name }}</div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import axios from "@/api/axios";
import { fomatMinute } from "@/utils/time.js";
import { getSongInfo, getSongUrl } from "@/api/getUserInfo";
export default {
  data() {
    return {
      singerInfos: "",
      hotSongs: "",
      mvs: "",
      introduction: "",
      artists: "",
      id: "",
    };
  },
  methods: {
    callback(key) {
      console.log(key);
    },
    async getSingerInfo() {
      this.id = this.$store.getters.singerId;
      const { data } = await axios("/artists", {
        params: {
          id: this.id,
        },
      });

      this.singerInfos = data.artist;
      this.hotSongs = data.hotSongs;
      for (let i = 0; i < this.hotSongs.length; i++) {
        const ms = this.hotSongs[i].dt;
        const min = fomatMinute(ms);
        this.hotSongs[i].dt = min;
      }
    },
    async getSongId(id) {
      const songUrl = await getSongUrl(id);
      this.$store.commit("SONG_URL", songUrl.data[0]);
      const songInfo = await getSongInfo(id);
      // console.log(songInfo.songs);
      this.$store.commit("SONG_INFO", songInfo.songs[0]);
    },
    async getMv() {
      const { data } = await axios("/artist/mv", {
        params: {
          id: this.id,
        },
      });
      //   console.log(data.mvs);
      this.mvs = data.mvs;
    },
    async getDesc() {
      const { data } = await axios("/artist/desc", {
        params: {
          id: this.id,
        },
      });
      //   console.log(data.introduction[3].txt.slice("."));
      this.introduction = data.introduction;
    },
    async getSimilar() {
      const { data } = await axios("/simi/artist", {
        params: {
          id: this.id,
        },
      });
      //   console.log(data.artists);
      this.artists = data.artists;
    },
  },
  created() {
    this.getSingerInfo();
    this.getDesc();
    this.getMv();
    this.getSimilar();
  },
};
</script>

<style lang="scss" scoped>
.singer {
  .header {
    display: flex;
    padding: 40px 0;
    img {
      width: 23%;
      border-radius: 10px;
      margin-right: 20px;
    }
  }
  .container {
    display: flex;
    margin-bottom: 50px;
    .right {
      width: 100%;
      .song-infos {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
      }
      .song-infos:hover {
        background-color: rgba($color: #000000, $alpha: 0.1);
      }
    }
    .left {
      width: 20%;
      margin-right: 60px;
      img {
        width: 100%;
      }
    }
  }
  .mvs {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .mvs-item {
      width: 30%;
      img {
        width: 100%;
        border-radius: 10px;
        box-shadow: 10px 5px 5px rgba($color: #000000, $alpha: 0.1);
      }
      p {
        width: 90%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .introduction {
    pre {
      white-space: pre-wrap;
      padding-left: 20px;
    }
  }
  .singer {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .singer-info {
      width: 18%;
      margin-bottom: 40px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        box-shadow: 10px 5px 5px rgba($color: #000000, $alpha: 0.1);
      }
    }
  }
}
.bgc {
  background-color: rgba($color: rgb(197, 191, 191), $alpha: 0.1);
}
</style>