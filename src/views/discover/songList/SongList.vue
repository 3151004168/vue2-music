<template>
  <div class="song-list">
    <div class="container">
      <a-tabs type="line" @change="getSongTags" size="small">
        <a-popover
          title="全部歌单"
          trigger="click"
          placement="bottom"
          slot="tabBarExtraContent"
          v-model="visible"
        >
          <template slot="content">
            <div class="cat-list" style="display: flex">
              <aside style="display: flex; flex-direction: row">
                <ul
                  style="
                    width: 100px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                  "
                >
                  <li
                    v-for="(item, index) in catList.categories"
                    :key="index"
                    style="height: 20%"
                  >
                    <p>{{ item }}</p>
                  </li>
                </ul>
                <ul
                  style="
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    width: 700px;
                    height: 500px;
                  "
                >
                  <li
                    v-for="(item, index) in catListInfo"
                    :key="index"
                    style="display: flex; flex-wrap: wrap"
                  >
                    <a-checkable-tag
                      color="blue"
                      v-for="(catlist, index) in item"
                      :key="index"
                      style="width: 16%"
                      @change="getSongTags(catlist.name)"
                    >
                      {{ catlist.name }}
                    </a-checkable-tag>
                  </li>
                </ul>
              </aside>
            </div>
          </template>
          <a-button type="primary" style="border-radius: 50px">
            全部歌单</a-button
          >
        </a-popover>
        <a-tab-pane
          :key="item.name"
          :tab="item.name"
          v-for="item in tags"
          style="display: flex; justify-content: flex-start; flex-wrap: wrap"
        >
          <div class="recommend-songList">
            <div
              v-for="item in songListInfo"
              :key="item.id"
              @click="getSongList(item.id)"
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
              <img :src="item.coverImgUrl" alt="" />
              <div class="nickname">
                <i class="iconfont icon-user"></i>{{ item.creator.nickname }}
              </div>
              <div class="title">{{ item.name }}</div>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import axios from "@/api/axios";
import { getSongIds } from "@/api/getUserInfo";
export default {
  data() {
    return {
      songListInfo: "",
      tags: "",
      catList: "",
      catListInfo: [],
      visible: false,
    };
  },
  methods: {
    async getFineSongList() {
      // const { data } = await axios("/personalized");
      // this.songListInfo = data.result;
      // console.log(data.result);
      this.getHot();
      this.getSongTags();
      this.getCatList();
    },
    async getHot() {
      const { data } = await axios("/playlist/hot");
      this.tags = data.tags;
      // console.log(data.tags);
    },
    async getSongTags(key) {
      // console.log(1);
      const { data } = await axios("/top/playlist", {
        params: {
          cat: key ? key : "华语",
        },
      });
      console.log(data.playlists);
      this.songListInfo = data.playlists;
      this.visible = false;
    },
    async getSongList(id) {
      // 歌曲信息
      const songInfo = await getSongIds(id);
      // console.log(songInfo);
      this.$store.commit("SONG_INFOS", songInfo);
      this.$router.push(`/songlist/:${id}`);
    },
    async getCatList() {
      const { data } = await axios("/playlist/catlist");
      this.catList = data;
      // console.log(data);
      let catlist = [];
      let count = 0;
      for (let j = 0; j < 5; j++) {
        for (let i = 0; i < data.sub.length; i++) {
          if (data.sub[i].category == count) {
            catlist.push(data.sub[i]);
          }
        }
        count++;
        this.catListInfo.push(catlist);
        catlist = [];
      }
      // console.log(this.catListInfo);
    },
  },
  created() {
    this.getFineSongList();
  },
};
</script>

<style lang="scss" scoped>
.song-list {
  width: 100%;
  height: 100%;
  .recommend-songList {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-bottom: 20px;
    .pic:hover {
      color: rgb(0, 174, 255);
    }
    .pic {
      width: 23%;
      margin-bottom: 20px;
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
      .nickname {
        color: #fff;
        font-size: 10px;
        position: absolute;
        bottom: 50px;
        left: 0;
      }
    }
  }
}
</style>