<template>
  <div class="recommend">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in banners" :key="item.bannerId">
        <img
          :src="item.pic"
          style="height: 100%; width: 100%; border-radius: 15px"
        />
      </el-carousel-item>
    </el-carousel>
    <h2>
      <router-link to="/songList"
        >推荐歌单<i class="iconfont icon-right"></i
      ></router-link>
    </h2>
    <div class="recommend-songList">
      <div class="pic" @click="getRecom(20010202)">
        <img src="../../../assets/avatar.jpg" alt="" />
        <div>每日歌曲推荐</div>
      </div>
      <div
        v-for="item in reSongList"
        :key="item.id"
        @click="getSongListInfo(item.id)"
        class="pic"
      >
        <span class="float">
          <i class="iconfont icon-bofang2"></i>
          {{
            90000000 > item.playCount
              ? Math.round(item.playCount / 10000) + "万"
              : Math.round(item.playCount / 100000000) + "亿"
          }}</span
        >
        <img :src="item.picUrl" alt="" />
        <div class="title">{{ item.name }}</div>
      </div>
    </div>
    <h2>
      <router-link to=""
        >独家放送<i class="iconfont icon-right"></i
      ></router-link>
    </h2>
    <div class="sole">
      <div
        class="mv"
        v-for="item in mvInfo"
        :key="item.id"
        @click="getPlayMv(item.id)"
      >
        <span class="icon">
          <i class="iconfont icon-bofang"></i>
        </span>
        <img :src="item.sPicUrl" alt="" />
        <h4 class="title">{{ item.name }}</h4>
      </div>
    </div>
    <h2>
      <router-link to="/latest"
        >最新音乐<i class="iconfont icon-right"></i
      ></router-link>
    </h2>
    <div class="latest-music">
      <div class="mucis" v-for="item in newSongs" :key="item.id">
        <i class="iconfont icon-bofang3"></i>
        <img :src="item.picUrl" alt="" style="width: 50px; height: 50px" />
        <div class="title">
          <div class="song-name">
            {{ item.name }}
            <span style="color: #999">{{
              item.song.alias != ""
                ? "(" + item.song.alias + ")"
                : item.song.alias + ""
            }}</span>
          </div>
          <div style="color: #999">{{ item.song.artists[0].name }}</div>
        </div>
      </div>
    </div>
    <h2>
      <router-link to="">推荐MV<i class="iconfont icon-right"></i></router-link>
    </h2>
    <div class="recom-mv">
      <div
        class="mv"
        v-for="item in recomMv"
        :key="item.id"
        @click="getMv(item.id)"
      >
        <span class="float">
          <i class="iconfont icon-bofang2"></i>
          {{ item.playCount }}
        </span>
        <img :src="item.picUrl" alt="" />
        <div class="title">
          {{ item.name }}
          <div style="color: #999">{{ item.artistName }}</div>
        </div>
      </div>
    </div>
    <h2>
      <router-link to="/dj"
        >主播电台<i class="iconfont icon-right"></i
      ></router-link>
    </h2>
    <div class="anchor">
      <div class="dj" v-for="item in anchor" :key="item.id">
        <span class="float">
          <i class="iconfont icon-bofang2"></i>
          {{ Math.round(item.playCount / 10000) + "万" }}
        </span>
        <img :src="item.picUrl" alt="" />
        <div class="title">
          <div style="color: #999">{{ item.copywriter }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHomePage } from "@/api/getHome";
import { getSongIds } from "@/api/getUserInfo";
import axios from "@/api/axios";
export default {
  data() {
    return {
      banners: "",
      reSongList: "",
      mvInfo: "",
      newSongs: "",
      recomMv: "",
      anchor: "",
    };
  },
  methods: {
    async getHome() {
      const { data } = await getHomePage();
      // console.log(data.data);
      this.banners = data.data.blocks[0].extInfo.banners;
    },
    async getRecomSongList() {
      const { data } = await axios("/personalized", {
        params: {
          limit: 9,
        },
      });
      this.reSongList = data.result;
      //   console.log(this.reSongList);
    },
    async getRecom(id) {
      const { data } = await axios("/recommend/songs");
      console.log(data.data);
      this.$store.commit("SONG_INFOS", data.data);
      this.$router.push(`/recommendSong/:${id}`);
    },
    async getSongListInfo(id) {
      // 歌曲信息
      const songInfo = await getSongIds(id);
      // console.log(songInfo);
      this.$store.commit("SONG_INFOS", songInfo);
      this.$router.push(`/songlist/:${id}`);
    },
    async getpersonalized() {
      const { data } = await axios("/personalized/privatecontent");
      this.mvInfo = data.result;
      // console.log(data.result);
    },
    getPlayMv(id) {
      console.log(id);
    },
    async getNewSongs() {
      const { data } = await axios("/personalized/newsong", {
        params: {
          limit: 12,
        },
      });
      // console.log(data);
      this.newSongs = data.result;
    },
    async getRecomMv() {
      const { data } = await axios("/personalized/mv");
      // console.log(data.result);
      this.recomMv = data.result;
    },
    async getAnchor() {
      const { data } = await axios("/dj/recommend/", {
        params: {
          type: 2,
          limit: 5,
        },
      });

      this.anchor = data.djRadios.splice(0, 5);
      // console.log(this.anchor);
    },
    getMv(id) {
      console.log(id);
    },
  },
  created() {
    this.getHome();
    this.getRecomSongList();
    this.getpersonalized();
    this.getNewSongs();
    this.getRecomMv();
    this.getAnchor();
  },
};
</script>

<style lang="scss" scoped>
.recommend {
  h2 .iconfont {
    font-size: 20px;
  }
  .el-carousel {
    width: 90%;
    margin: 0 auto;
  }
  .recommend-songList {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: 20px;
    .pic:hover {
      color: rgb(0, 174, 255);
    }
    .pic {
      width: 19%;
      margin-bottom: 10px;
      position: relative;
      .float {
        position: absolute;
        right: 20px;
        top: 5px;
        color: rgb(255, 255, 255);
        width: 60px;
        height: 23px;
        font-size: 10px;
        text-align: center;
        background-color: rgba($color: #000000, $alpha: 0.2);
        border-radius: 50px;
        .iconfont {
          vertical-align: middle;
        }
      }
      img {
        width: 90%;
        border-radius: 10px;
        border: 1px solid rgba($color: #999, $alpha: 0.3);
        box-shadow: 10px 5px 5px rgba($color: #999, $alpha: 0.3);
      }
      .title {
        width: 90%;
        height: 45px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; //行数
        -webkit-box-orient: vertical;
      }
    }
  }
  .sole {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    .mv {
      position: relative;
      width: 30%;
      margin-right: 20px;
      img {
        width: 100%;
        border-radius: 10px;
        box-shadow: 20px 10px 10px rgba($color: #999, $alpha: 0.3);
      }
      .icon {
        position: absolute;
        left: 10px;
        top: 5px;
        // border: 1px solid #fff;
        .iconfont {
          color: #fff;
          font-size: 30px;
          border-radius: 50%;
          background-color: rgba($color: #999, $alpha: 0.3);
        }
      }
    }
  }
  .latest-music {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: 20px;
    .mucis {
      width: 30%;
      display: flex;
      flex-direction: row;
      position: relative;
      margin: 0 15px 15px 0;
      align-items: center;
      img {
        border-radius: 10px;
        box-shadow: 10px 5px 5px rgba($color: #999, $alpha: 0.3);
        margin-right: 10px;
      }
      .iconfont {
        position: absolute;
        left: 12px;
        color: rgb(0, 183, 255);
        background-color: #fff;
        font-size: 10px;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        line-height: 25px;
        text-align: center;
      }
      .song-name {
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .recom-mv {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    .mv {
      position: relative;
      width: 30%;
      margin-right: 20px;
      .float {
        position: absolute;
        right: 0;
        top: 0;
        color: rgb(255, 255, 255);
        width: 60px;
        height: 23px;
        font-size: 10px;
        text-align: center;
        background-color: rgba($color: #000000, $alpha: 0.2);
        border-radius: 50px;
        .iconfont {
          vertical-align: middle;
        }
      }
      img {
        width: 100%;
        border-radius: 10px;
        box-shadow: 15px 10px 10px rgba($color: #999, $alpha: 0.3);
        margin-bottom: 10px;
      }
    }
  }
  .anchor {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    .dj {
      position: relative;
      width: 20%;
      margin-right: 20px;
      .float {
        position: absolute;
        right: 0;
        top: 0;
        color: rgb(255, 255, 255);
        width: 60px;
        height: 23px;
        font-size: 10px;
        text-align: center;
        background-color: rgba($color: #000000, $alpha: 0.2);
        border-radius: 50px;
        .iconfont {
          vertical-align: middle;
        }
      }
      img {
        width: 100%;
        box-shadow: 15px 10px 5px rgba($color: #999, $alpha: 0.3);
        border-radius: 15px;
        margin-bottom: 5px;
      }
      .title {
        width: 95%;
        margin: 0 auto;
      }
    }
  }
}
</style>