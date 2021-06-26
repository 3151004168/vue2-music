<template>
  <div class="recommendSong">
    <div class="info">
      <header class="header">
        <div class="date">
          <span>{{ day }}</span>
        </div>
        <div class="title">
          <h2>每日歌曲推荐</h2>
          <span>根据你的音乐口味生成</span>
        </div>
      </header>
      <a-button-group class="bofang" style="margin-right: 10px">
        <a-button type="primary" style="border-radius: 50px 0 0 50px">
          <i class="iconfont icon-caret-right"></i>
          播放全部
        </a-button>
        <a-button type="primary" style="border-radius: 0 50px 50px 0">
          <i class="iconfont icon-plus"></i>
        </a-button>
      </a-button-group>
      <a-button style="border-radius: 50px; margin-right: 10px">
        <i class="iconfont icon-shoucanggedan" style="margin-right: 10px"></i
        >收藏全部</a-button
      >
    </div>
    <div class="songList">
      <a-row>
        <a-col :span="1"> </a-col>
        <a-col :span="1"> </a-col>
        <a-col :span="1"> </a-col>
        <a-col :span="10"> 音乐标题</a-col>
        <a-col :span="5"> 歌手 </a-col>
        <a-col :span="5"> 专辑</a-col>
      </a-row>
      <a-row
        v-for="(item, index) in songInfos"
        :key="item.id"
        @dblclick.native="getSongId(item.id, index)"
        class="song-infos"
        style="cursor: pointer"
      >
        <div class="hover" :class="[index % 2 == 0 ? 'bgc' : '']">
          <a-col :span="1"> {{ index + 1 }} </a-col>
          <a-col :span="1">
            <span class="iconfont icon-xihuan"></span>
          </a-col>
          <a-col :span="1">
            <span class="iconfont icon-xiazai1"></span>
          </a-col>
          <a-col :span="10" class="color"> {{ item.name }}</a-col>
          <a-col :span="5" class="brief">
            <span v-for="name in item.ar" :key="name.id">
              {{ name.name }}
              {{ item.ar.length > 1 ? "/" : "" }}
            </span>
          </a-col>
          <a-col :span="6" class="brief"> {{ item.al.name }}</a-col>
        </div>
      </a-row>
    </div>
  </div>
</template>

<script>
import { getSongInfo, getSongUrl } from "@/api/getUserInfo";
export default {
  data() {
    return {
      index: "2",
      songListInfo: "",
      songIds: [],
      songInfos: "",
      day: "",
    };
  },
  methods: {
    async getUserInfo() {
      this.songListInfo = this.$store.getters.songListInfo;
      console.log(this.songListInfo);
      this.getSongInfos();
      this.getDate();
    },
    getIsUnfold() {
      this.isUnfold = !this.isUnfold;
    },
    async getSongInfos() {
      for (let i = 0; i < this.songListInfo.dailySongs.length; i++) {
        this.songIds.push(this.songListInfo.dailySongs[i].id);
      }
      const data = await getSongInfo(this.songIds.toString());
      this.songInfos = data.songs;
      // console.log(res);
    },
    async getSongId(id) {
      const songUrl = await getSongUrl(id);
      this.$store.commit("SONG_URL", songUrl.data[0]);
      const songInfo = await getSongInfo(id);
      // console.log(songInfo.songs);
      this.$store.commit("SONG_INFO", songInfo.songs[0]);
    },
    getDate() {
      const date = new Date();
      this.day = date.getDate();
    },
  },
  created() {
    this.getUserInfo();
  },
};
</script>
<style lang="scss" scoped>
.on-bgc {
  background-color: rgba($color: rgb(134, 134, 134), $alpha: 0.1);
  color: #61b1fc;
}
.recommendSong {
  .info {
      padding-bottom: 20px;
      border-bottom: 1px solid rgba($color: #999, $alpha: .2);
    .header {
      display: flex;
      flex-direction: row;
      margin-bottom: 20px;
      .date {
        // width: 100px;
        height: 80px;
        padding: 0 10px;
        margin-right: 20px;
        text-align: center;
        line-height: 80px;
        border: 4px solid #61b1fc;
        border-radius: 15px;
        span {
          border-top: 4px solid #61b1fc;
          font-size: 40px;
          color: #61b1fc;
          font-weight: 700;
        }
      }
      .title {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
  .songList {
      margin-top: 10px;
    .hover {
      width: 100%;
      height: 30px;
      line-height: 30px;
    }
    .bgc {
      background-color: rgba($color: rgb(197, 191, 191), $alpha: 0.1);
    }
    // .ant-row,
    .hover:hover {
      background-color: rgba(195, 226, 252, 0.3);
    }
  }
}
</style>