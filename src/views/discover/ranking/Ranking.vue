<template>
  <div class="ranking">
    <h2>官方榜</h2>
    <div
      class="rank-list"
      v-for="item in rankings"
      :key="item.id"
      @click="getSongList(item.id)"
    >
      <div class="rank-list-img">
        <img :src="item.coverImgUrl" alt="" />
      </div>
      <div class="rank-list-r">
        <div
          class="rank-list-item"
          v-for="(song, index) in item.tracks"
          :key="song.id"
          :class="[index % 2 == 0 ? 'bgc' : '']"
          @dblclick="getSongId(song.id)"
        >
          <p>
            {{ index + 1 }}&nbsp;&nbsp;
            {{ song.name }}
            <span class="des" v-if="song.alia">{{
              song.alia[0] ? "(" + song.alia[0] + ")" : ""
            }}</span>
          </p>
          <span class="anchor" v-if="song.ar">{{ song.ar[0].name }}</span>
        </div>
        <span class="icon">查看全部 <i class="iconfont icon-more"></i> </span>
      </div>
    </div>
    <h2>全球榜</h2>
    <div class="song-list">
      <div
        class="song-list-item"
        v-for="item in songList"
        :key="item.id"
        @click="getSongList(item.id)"
      >
        <img :src="item.coverImgUrl" alt="" />
        <div class="title">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/api/axios";
import { getSongIds, getSongInfo, getSongUrl } from "@/api/getUserInfo";
export default {
  data() {
    return {
      rankings: null,
      summary: null,
      artist: null,
      songList: null,
    };
  },
  methods: {
    getInfo() {
      this.getRankings();
      this.getArtist();
    },
    async getRankings() {
      const { data } = await axios("/toplist/detail");
      // console.log(data.list);
      this.rankings = data.list.splice(0, 4);
      console.log(data.list);
      this.songList = data.list;
      this.getSummary();
    },
    async getSummary() {
      let res = [];
      for (let i = 0; i < this.rankings.length; i++) {
        const { playlist } = await getSongIds(this.rankings[i].id);
        this.rankings[i].tracks = playlist.tracks.splice(0, 5);
        // console.log(this.rankings[i].tracks);
      }
    },
    async getArtist() {
      const { data } = await axios("/toplist/artist");
      // console.log(data.list);
      this.artist = data;
      //   console.log(this.artist);
    },
    async getSongId(id) {
      const songUrl = await getSongUrl(id);
      this.$store.commit("SONG_URL", songUrl.data[0]);
      const songInfo = await getSongInfo(id);
      // console.log(songInfo.songs);
      this.$store.commit("SONG_INFO", songInfo.songs[0]);
    },
    async getSongList(id) {
      const songInfo = await getSongIds(id);
      console.log(songInfo);
      this.$store.commit("SONG_INFOS", songInfo);
      this.$router.push(`/songlist/:${id}`);
    },
  },
  created() {
    this.getInfo();
  },
};
</script>

<style lang="scss" scoped>
.ranking {
  .rank-list {
    display: flex;
    margin-bottom: 50px;

    .rank-list-img {
      img {
        cursor: pointer;
        width: 180px;
        border-radius: 15px;
        box-shadow: 10px 5px 5px rgba($color: #000000, $alpha: 0.1);
        margin-right: 20px;
      }
    }
    .rank-list-r {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-size: 10px;
      .rank-list-item {
        cursor: pointer;
        padding: 0 20px;
        width: 95%;
        height: 34;
        line-height: 34px;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        p {
          margin: 0;
          width: 60%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          .des {
            color: #999;
          }
        }
      }
      .icon {
        display: flex;
        align-items: center;
        font-size: 12px;
      }
    }
  }
  .song-list {
    display: flex;
    flex-wrap: wrap;
    .song-list-item {
      width: 20%;
      margin-bottom: 20px;
      img {
        width: 90%;
        border-radius: 10px;
        margin-bottom: 10px;
        box-shadow: 7px 5px 5px rgba($color: #000000, $alpha: 0.1);
      }
    }
  }
}
.bgc {
  background-color: rgba($color: rgb(197, 191, 191), $alpha: 0.1);
}
</style>