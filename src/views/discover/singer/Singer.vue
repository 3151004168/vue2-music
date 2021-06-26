<template>
  <div class="singer">
    <header class="classify">
      <div class="Languages">
        <span style="margin-right: 10px">语种:</span>
        <div
          v-for="item in Languages"
          :key="item.id"
          @click="getLanguages(item.id)"
        >
          <a-checkable-tag> {{ item.name }}</a-checkable-tag>
        </div>
      </div>
      <div class="classify">
        <span style="margin-right: 10px">分类:</span>
        <div
          v-for="item in classify"
          :key="item.id"
          @click="getClassify(item.id)"
        >
          <a-checkable-tag> {{ item.name }}</a-checkable-tag>
        </div>
      </div>
      <div class="sift">
        <div class="sift-i">筛选:</div>
        <div>
          <span v-for="item in sift" :key="item.id" @click="getSift(item.id)">
            <a-checkable-tag> {{ item.name }}</a-checkable-tag>
          </span>
        </div>
      </div>
    </header>
    <div class="container">
      <div
        class="singer-info"
        v-for="item in singerInfo"
        :key="item.id"
        @click="getSinger(item.id)"
      >
        <img :src="item.picUrl" alt="" />
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/api/axios";
export default {
  data() {
    return {
      singerInfo: "",
      classify: [
        {
          name: "全部",
          id: -1,
        },
        {
          name: "男歌手",
          id: 1,
        },
        {
          name: "女歌手",
          id: 2,
        },
        {
          name: "乐队组合",
          id: 3,
        },
      ],
      Languages: [
        {
          name: "全部",
          id: -1,
        },
        {
          name: "华语",
          id: 7,
        },
        {
          name: "欧美",
          id: 96,
        },
        {
          name: "日本",
          id: 8,
        },
        {
          name: "韩国",
          id: -16,
        },
        {
          name: "其他",
          id: 0,
        },
      ],
      sift: [
        {
          name: "热门",
          id: -1,
        },
        {
          name: "A",
          id: "A",
        },
        {
          name: "B",
          id: "B",
        },
        {
          name: "C",
          id: "C",
        },
        {
          name: "D",
          id: "D",
        },
        {
          name: "E",
          id: "E",
        },
        {
          name: "F",
          id: "F",
        },
        {
          name: "G",
          id: "G",
        },
        {
          name: "H",
          id: "H",
        },
        {
          name: "I",
          id: "I",
        },
        {
          name: "J",
          id: "J",
        },
        {
          name: "K",
          id: "K",
        },
        {
          name: "L",
          id: "L",
        },
        {
          name: "M",
          id: "M",
        },
        {
          name: "N",
          id: "N",
        },
        {
          name: "O",
          id: "O",
        },
        {
          name: "P",
          id: "P",
        },
        {
          name: "Q",
          id: "Q",
        },
        {
          name: "R",
          id: "R",
        },
        {
          name: "S",
          id: "S",
        },
        {
          name: "T",
          id: "T",
        },
        {
          name: "U",
          id: "U",
        },
        {
          name: "V",
          id: "V",
        },
        {
          name: "W",
          id: "W",
        },
        {
          name: "X",
          id: "X",
        },
        {
          name: "Y",
          id: "Y",
        },
        {
          name: "Z",
          id: "Z",
        },
        {
          name: "#",
          id: 0,
        },
      ],
    };
  },
  methods: {
    async getSingerInfo() {
      const { data } = await axios("/top/artists", {
        params: {
          limit: 200,
        },
      });
      console.log(data);
      this.singerInfo = data.artists;
    },
    getSinger(id) {
      this.$store.commit("SINGER_ID", id);
      this.$router.push(`/singerInfo/${id}`);
    },
    async getClassify(id) {
      const { data } = await axios("/artist/list", {
        params: {
          type: id,
        },
      });
      // console.log(data);
      this.singerInfo = data.artists;
    },
    async getLanguages(id) {
      const { data } = await axios("/artist/list", {
        params: {
          area: id,
        },
      });
      // console.log(data);
      this.singerInfo = data.artists;
    },
    async getSift(id) {
      const { data } = await axios("/artist/list", {
        params: {
          initial: id,
        },
      });
      // console.log(data);
      this.singerInfo = data.artists;
    },
  },
  created() {
    this.getSingerInfo();
  },
};
</script>

<style lang="scss" scoped>
.singer {
  .classify {
    .Languages,
    .classify {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      div {
        width: 8%;
        // text-align: center;
      }
    }
    .sift {
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      .sift-i {
        width: 35px;
      }
      span {
        display: inline-block;
        width: 8%;
        text-align: center;
      }
    }
  }
  .container {
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
</style>