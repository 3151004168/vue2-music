<template>
  <div id="home">
    <a-layout id="components-layout-demo-top-side-2">
      <a-layout-header class="header">
        <!-- :style="{ position: 'fixed', zIndex: 1, width: '100%' }" -->
        <div class="lg">
          <div class="logo"></div>
          <span>网抑云音乐</span>
        </div>

        <div class="search">
          <span class="iconfont icon-back" @click="go(-1)"></span>
          <span class="iconfont icon-more" @click="go(1)"></span>
          <input type="text" placeholder="搜索" class="ant-input-search" />
          <span class="iconfont icon-tinggeshiqu2"></span>
        </div>
        <div class="menu">
          <a-avatar size="large" :src="userInfo.avatarUrl">
            <a-icon slot="icon" type="user" />
          </a-avatar>
          <span class="user">
            {{ userInfo.nickname }}
            <i class="iconfont icon-VIP"></i>
            <i class="iconfont icon-down"></i>
          </span>

          <span class="iconfont icon-pifu-copy-copy"></span>
          <span class="iconfont icon-shezhi"></span>
          <span class="iconfont icon-youjian"></span>
          <span class="iconfont shu">|</span>
          <span class="iconfont icon-miniban"></span>
          <a-icon type="line" />
          <span class="iconfont icon-zuidahua1"></span>
          <span class="iconfont icon-guanbi" style="font-size: 15px"></span>
        </div>
      </a-layout-header>
      <a-layout>
        <a-layout-sider
          width="200"
          style="overflow-y: auto; overflow-x: hidden"
          class="aside"
        >
          <a-menu
            mode="inline"
            :default-selected-keys="['1']"
            :default-open-keys="['sub2', 'sub1']"
            :style="{ borderRight: 0 }"
          >
            <a-menu-item key="1">
              <router-link to="/discover">
                <span class="nav-text">发现音乐</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="2">
              <router-link to="/video">
                <span class="nav-text">视频</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="3">
              <span class="nav-text">朋友</span>
            </a-menu-item>
            <a-menu-item key="4">
              <span class="nav-text">直播</span>
            </a-menu-item>
            <a-menu-item key="5">
              <span class="nav-text">私人FM</span>
            </a-menu-item>
            <a-menu-item class="myMusic" style="cursor: default" disabled>
              <span>我的音乐</span>
            </a-menu-item>
            <a-menu-item key="6">
              <span class="iconfont icon-yinyue"></span>
              <span class="nav-text">本地音乐</span>
            </a-menu-item>
            <a-menu-item key="7">
              <span class="iconfont icon-xiazai"></span>
              <span class="nav-text">下载管理</span>
            </a-menu-item>
            <a-menu-item key="8">
              <span class="iconfont icon-zuijinbofang"></span>
              <span class="nav-text">最近播放</span>
            </a-menu-item>
            <a-menu-item key="9">
              <span class="iconfont icon-yunpan"></span>
              <span class="nav-text">我的音乐云盘</span>
            </a-menu-item>
            <a-menu-item key="10">
              <span class="iconfont icon-diantai"></span>
              <span class="nav-text">我的电台</span>
            </a-menu-item>
            <a-menu-item key="11">
              <span class="iconfont icon-shoucang"></span>
              <span class="nav-text">我的收藏</span>
            </a-menu-item>
            <a-sub-menu key="sub1">
              <span slot="title"
                ><span style="font-size: 10px; color: rgba(90, 90, 90, 0.3)"
                  >创建的歌单</span
                ></span
              >
              <a-menu-item
                key="sub2"
                style="padding: 0 16px 0 24px"
                @click="getLoveSongList"
              >
                <span class="iconfont icon-xihuan" style="margin: 0"></span>
                我喜欢的音乐
                <span class="iconfont icon-marry"></span>
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
              <span slot="title"
                ><span style="font-size: 10px; color: rgba(90, 90, 90, 0.3)">
                  收藏的歌单</span
                ></span
              >
              <a-menu-item
                style="padding: 0 16px 0 24px"
                v-for="item in songList"
                :key="item.id"
                @click="getSongListInfo(item.id)"
              >
                <span class="iconfont icon-gedan1" style="margin: 0"></span>
                {{ item.name }}
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout
          style="
            border-left: 1px solid rgba(90, 90, 90, 0.1);
            overflow: auto;
            padding: 0 0 0 24px;
            background: #fff;
          "
          class="container"
        >
          <a-layout-content
            :style="{
              margin: 0,
              minHeight: '280px',
            }"
          >
            <router-view :key="$route.fullPath" />
          </a-layout-content>
        </a-layout>
      </a-layout>
      <a-layout-footer class="footer">
        <div class="song" v-if="songInfo">
          <img :src="songInfo.al.picUrl" alt="" />
          <span class="song-d">
            <span class="song-name"
              >{{ songInfo.name ? songInfo.name : "" }}
              <span class="iconfont icon-xihuan"></span>
            </span>
            <span
              ><span class="author" v-for="item in songInfo.ar" :key="item.id"
                >{{ item.name }}
              </span></span
            >
          </span>
        </div>
        <div class="paly-bar">
          <!-- <Progress class="progress" /> -->
          <audio :src="songUrl.url" controls></audio>
          <span id="audio"></span>
        </div>
        <div class="settings">3</div>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import Progress from "@/components/progress/Progress";
import { getUserInfo, getSongList, getSongIds } from "@/api/getUserInfo";
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      collapsed: false,
      userInfo: "",
      songList: "",
      likeSong: "",
      songIds: "",
      // songInfo: "",
      // songPicUrl: "",
      // songUrl: "",
    };
  },
  components: {
    Progress,
  },
  computed: {
    ...mapState(["uid"]),
    ...mapGetters(["songUrl", "songInfo"]),
  },
  created() {
    this.getAxios();
  },
  methods: {
    async getAxios() {
      // 获取用户信息
      const userInfo = await getUserInfo(this.$store.state.uId);
      this.userInfo = userInfo.profile;
      // console.log(userInfo);
      this.$store.commit("USER_INFO", this.userInfo);
      // 获取歌单列表
      const songlist = await getSongList(this.$store.state.uId);
      this.likeSong = songlist.playlist.splice(0, 1)[0];
      // this.$store.commit("SONG_INFO", this.likeSong);
      this.songList = songlist.playlist;
      // console.log(songlist);
    },
    async getSongListInfo(id) {
      // 歌曲信息
      const songInfo = await getSongIds(id);
      // console.log(songInfo);
      this.$store.commit("SONG_INFOS", songInfo);
      this.$router.push(`/songlist/:${id}`);
    },

    getLoveSongList() {
      // this.$store.commit('SONG_INFO',this.likeSong)
    },
    go(i) {
      this.$router.go(i);
    },
  },
};
</script>

<style lang="scss" scoped>
#home {
  width: 100%;
  height: 100%;
  #components-layout-demo-top-side-2 {
    width: 100%;
    height: 100%;
    display: flex;
    .header {
      padding: 0 20px;
      width: 100%;
      background-color: deepskyblue;
      .lg {
        width: 201px;
        float: left;
        display: flex;
        flex-direction: row;
        align-items: center;
        span {
          color: #fff;
          font-size: 20px;
          margin-left: 10px;
        }
        .logo {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: url("../../assets/avatar.jpg");
          background-size: 100% 100%;
        }
      }
      .search {
        float: left;
        .icon-back,
        .icon-more,
        .icon-tinggeshiqu2 {
          font-size: 20px;
          padding: 3px;
          background-color: rgba($color: #666, $alpha: 0.1);
          border-radius: 50%;
          margin: 0 5px;
        }
        .icon-tinggeshiqu2 {
          padding: 7px;
        }
        .ant-input-search {
          width: 200px;
          height: 35px;
          border-radius: 50px;
          background: rgba($color: #666, $alpha: 0.1);
          border: none;
          outline: none;
        }
      }
      .menu {
        float: right;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: #fff;
        .user {
          // font-size: 15px;
          .iconfont {
            font-size: 10px;
          }
          .icon-VIP {
            margin: 0;
            color: blue;
          }
        }
        .iconfont {
          margin-right: 10px;
          font-size: 20px;
        }
        .shu {
          font-size: 15px;
          transform: translate(0, -2%);
        }
      }
    }
    .aside {
      .iconfont {
        color: #000;
        font-size: 16px;
        margin-right: 10px;
      }
      .icon-yunpan {
        margin-left: -5px;
      }
      .myMusic {
        .ant-menu-item-selected {
          background-color: #fff;
        }
        overflow: hidden;
        margin: 10px 0 0;
        font-size: 10px;
        color: #999;
      }
    }
    .footer {
      height: 80px;
      border-top: 1px solid rgba($color: #999, $alpha: 0.3);
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .song {
        display: flex;
        flex-direction: row;
        img {
          margin-right: 10px;
          width: 50px;
          height: 50px;
          margin-left: -30px;
        }
        .song-d {
          display: flex;
          flex-direction: column;
        }
      }
      .paly-bar {
        display: flex;
        justify-self: center;
      }
    }
  }
}
</style>