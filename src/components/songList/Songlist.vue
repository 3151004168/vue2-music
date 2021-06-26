<template>
  <div id="song">
    <header class="info" style="padding: 24px 0 0 0">
      <div class="left">
        <img :src="userInfo.coverImgUrl" alt="" />
      </div>
      <div class="right">
        <h2>
          <span>歌单</span>
          {{ userInfo.name }}
        </h2>
        <div class="userInfo">
          <a-avatar :src="userInfo.creator.avatarUrl">
            <a-icon slot="icon" type="user" />
          </a-avatar>
          <img :src="vipPicUrl" />
          <a class="username" style="margin: 0 10px">{{
            userInfo.creator.nickname
          }}</a>
          <span>{{ date }}创建</span>
        </div>

        <div class="btn">
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
            <i class="iconfont icon-shoucanggedan"></i>收藏</a-button
          >
          <a-button style="border-radius: 50px; margin-right: 10px">
            <i class="iconfont icon-fenxiang"></i>分享</a-button
          >
          <a-button style="border-radius: 50px; margin-right: 10px">
            <i class="iconfont icon-caret-right"></i>下载全部</a-button
          >
        </div>
        <div>标签 ：{{ userInfo.tags[0] }}</div>
        <div>
          <span>歌曲{{ " " + ":" + " " + userInfo.trackCount }}</span>
          <span>播放{{ " " + ":" + " " + userInfo.playCount }}</span>
        </div>

        <div class="brief">
          简介 : {{ description[0] }}
          <i
            class="iconfont"
            :class="isUnfold ? 'icon-shang' : 'icon-tubiaozhizuo-'"
            @click="getIsUnfold"
          ></i>
        </div>
        <div v-if="isUnfold">{{ description[1] }}</div>
      </div>
    </header>
    <div class="songList">
      <div class="list">
        <span>歌曲列表</span>
        <!-- <span>评论</span>
        <span>收藏者</span> -->
      </div>
      <a-row>
        <a-col :span="1"> </a-col>
        <a-col :span="1"> </a-col>
        <a-col :span="1"> </a-col>
        <a-col :span="9"> 音乐标题</a-col>
        <a-col :span="5"> 歌手 </a-col>
        <a-col :span="5"> 专辑</a-col>
        <a-col :span="2"> 时长</a-col>
      </a-row>
      <a-row
        v-for="(item, index) in songInfos"
        :key="item.id"
        @dblclick.native="getSongId(item.id)"
        class="song-infos"
        style="cursor: auto"
      >
        <div class="hover" :class="[index % 2 == 0 ? 'bgc' : '']">
          <a-col :span="1"> {{ index + 1 }} </a-col>
          <a-col :span="1">
            <span class="iconfont icon-xihuan"></span>
          </a-col>
          <a-col :span="1">
            <span class="iconfont icon-xiazai1"></span>
          </a-col>
          <a-col :span="9" class="color"> {{ item.name }}</a-col>
          <a-col :span="5" class="brief">
            <span
              v-for="name in item.ar"
              :key="name.id"
              @click="getSinger(name.id)"
              style="cursor: pointer"
            >
              {{ name.name }}
              {{ item.ar.length > 1 ? "/" : "" }}
            </span>
          </a-col>
          <a-col :span="5" class="brief"> {{ item.al.name }}</a-col>
          <a-col :span="2" class="brief">{{ item.dt }}</a-col>
        </div>
      </a-row>
    </div>
  </div>
</template>

<script>
import { format, fomatMinute } from "@/utils/time";
import { getSongInfo, getSongUrl } from "@/api/getUserInfo";

export default {
  data() {
    return {
      index: "2",
      userInfo: "",
      date: "",
      songListInfo: "",
      description: "",
      isUnfold: false,
      songIds: [],
      vipPicUrl: "",
      songInfos: "",
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getSinger(id) {
      this.$store.commit("SINGER_ID", id);
      this.$router.push(`/singerInfo/${id}`);
    },
    async getUserInfo() {
      this.songListInfo = this.$store.getters.songListInfo;
      this.userInfo = this.songListInfo.playlist;
      this.date = format(this.userInfo.createTime);
      this.description = this.userInfo.description.split("\n");
      if (this.userInfo.creator.avatarDetail) {
        this.vipPicUrl = this.userInfo.creator.avatarDetail.identityIconUrl;
      }
      this.getSongInfos();
    },
    getIsUnfold() {
      this.isUnfold = !this.isUnfold;
    },
    async getSongInfos() {
      for (let i = 0; i < this.songListInfo.privileges.length; i++) {
        this.songIds.push(this.songListInfo.privileges[i].id);
      }
      const data = await getSongInfo(this.songIds.toString());
      this.songInfos = data.songs;
      for (let i = 0; i < this.songInfos.length; i++) {
        const ms = this.songInfos[i].dt;
        const min = fomatMinute(ms);
        this.songInfos[i].dt = min;
      }
      console.log(this.songInfos);
    },
    async getSongId(id) {
      const songUrl = await getSongUrl(id);
      this.$store.commit("SONG_URL", songUrl.data[0]);
      const songInfo = await getSongInfo(id);
      // console.log(songInfo.songs);
      this.$store.commit("SONG_INFO", songInfo.songs[0]);
    },
  },
};
</script>

<style lang="scss" scoped>
.on-bgc {
  background-color: rgba($color: rgb(134, 134, 134), $alpha: 0.1);
  color: #61b1fc;
}
#song {
  .info {
    font-size: 12px;
    height: 225px;
    .left {
      width: 30%;
      float: left;
      img {
        width: 190px;
        height: 190px;
        margin-right: 20px;
        border-radius: 10px;
      }
    }
    .right {
      width: 70%;
      float: left;
      h2 {
        font-size: 25px;
        font-weight: bold;
        span {
          font-size: 12px;
          font-weight: normal;
          padding: 3px 6px;
          border: 1px solid #61b1fc;
          color: #61b1fc;
          border-radius: 3px;
        }
      }
      .userInfo {
        position: relative;
        margin-bottom: 10px;
        img {
          width: 12px;
          height: 12px;
          position: absolute;
          left: 24px;
          top: 18px;
        }
      }
      .btn {
        margin-bottom: 10px;
        .ant-button {
          margin-right: 20px;
        }
      }
    }
  }
  .songList {
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