<template>
  <div class="dj">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in banners" :key="item.id">
        <img
          :src="item.pic"
          style="height: 100%; width: 100%; border-radius: 15px"
        />
      </el-carousel-item>
    </el-carousel>
    <a-tabs size="small">
      <a-tab-pane key="1">
        <span slot="tab">
          <div class="paihang">
            <i class="iconfont icon-paihangbang" style="font-size: 20px"></i>
            <p>排行榜</p>
          </div>
        </span>
      </a-tab-pane>
      <a-tab-pane v-for="item in catelist" :key="item.id">
        <span slot="tab" @click="getCatelistId(item.id)">
          <div class="catelist">
            <img :src="item.pic56x56Url" style="width: 40px; height: 40px" />
            <p>{{ item.name }}</p>
          </div>
        </span>
      </a-tab-pane>
    </a-tabs>
    <h2>
      <router-link to=""
        >付费精品<i class="iconfont icon-right"></i
      ></router-link>
    </h2>
    <div class="pay-fine">
      <div class="pay" v-for="item in payFine" :key="item.id">
        <img :src="item.picUrl" alt="" />
        <div class="title">
          <h3>{{ item.name }}</h3>
          <p>{{ item.rcmdText }}</p>
          <p><i class="iconfont icon-bofang2"></i>{{ item.lastProgramName }}</p>
          <p class="money">￥{{ item.originalPrice / 100 }}</p>
        </div>
      </div>
    </div>
    <h2>
      <router-link to=""
        >电台个性推荐<i class="iconfont icon-right"></i
      ></router-link>
    </h2>
    <div class="recom">
      <div class="list" v-for="item in djRecom" :key="item.id">
        <img :src="item.picUrl" alt="" />
        <p class="name">{{ item.name }}</p>
        <p class="text">{{ item.rcmdText }}</p>
      </div>
    </div>
    <h2>
      <router-link to="">有声书<i class="iconfont icon-right"></i></router-link>
    </h2>
    <div class="recom">
      <div class="list" v-for="item in voicedBook" :key="item.id">
        <img :src="item.picUrl" alt="" />
        <p class="name">{{ item.name }}</p>
        <p class="text">{{ item.rcmdtext }}</p>
      </div>
    </div>
    <h2>
      <router-link to=""
        >创作翻唱<i class="iconfont icon-right"></i
      ></router-link>
    </h2>
    <div class="recom">
      <div class="list" v-for="item in coverSong" :key="item.id">
        <img :src="item.picUrl" alt="" />
        <p class="name">{{ item.name }}</p>
        <p class="text">{{ item.rcmdtext }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/api/axios";
export default {
  data() {
    return {
      banners: "",
      catelist: "",
      payFine: "",
      djRecom: "",
      voicedBook: "",
      coverSong: "",
    };
  },
  methods: {
    async getBanners() {
      const { data } = await axios("/dj/banner");
      //   console.log(data.data);
      this.banners = data.data;
    },
    async getCatelist() {
      const { data } = await axios("/dj/catelist");
      this.catelist = data.categories;
      // console.log(data.categories);
    },
    async getCatelistId(id) {
      console.log(id);
      const { data } = await axios("/dj/recommend/type", {
        params: {
          type: id,
        },
      });
      console.log(data);
    },
    async getVoicedBook() {
      const { data } = await axios("/dj/recommend/type", {
        params: {
          type: 10001,
        },
      });
      data.djRadios.splice(0, 5);
      this.voicedBook = data.djRadios;
    },
    async getCoverSong() {
      const { data } = await axios("/dj/recommend/type", {
        params: {
          type: 2001,
        },
      });
      data.djRadios.splice(0, 4);
      this.coverSong = data.djRadios;
      console.log(this.coverSong);
    },
    async getPayFine() {
      const { data } = await axios("/dj/paygift", {
        params: {
          limit: 4,
        },
      });
      // console.log(data.data.list);
      this.payFine = data.data.list;
    },
    async getDjRecom() {
      const { data } = await axios("/dj/personalize/recommend", {
        params: {
          limit: 5,
        },
      });
      // console.log(data.data);
      this.djRecom = data.data;
    },
  },
  created() {
    this.getBanners();
    this.getCatelist();
    this.getPayFine();
    this.getDjRecom();
    this.getVoicedBook();
    this.getCoverSong();
  },
};
</script>

<style lang="scss" scoped>
.dj {
  .paihang {
    display: flex;
    flex-direction: column;
    transform: translateY(-15%);
    text-align: center;
    .iconfont {
      color: rgb(0, 162, 255);
    }
  }
  .catelist {
    display: flex;
    flex-direction: column;
  }
  .ant-tabs-bar {
    border: none !important;
  }
  .pay-fine {
    display: flex;
    flex-wrap: wrap;
    .pay {
      width: 50%;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      img {
        width: 45%;
        border-radius: 10px;
        border: 1px solid rgba($color: #999, $alpha: 0.3);
        box-shadow: 10px 5px 5px rgba($color: #999, $alpha: 0.3);
        margin-right: 10px;
      }
      .title {
        p {
          color: #999;
          margin: 0;
        }
        .money {
          color: rgb(0, 140, 255);
          font-size: 20px;
        }
      }
    }
  }
  .recom {
    display: flex;

    .list {
      width: 20%;
      position: relative;
      .name {
        width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        position: absolute;
        left: 4px;
        bottom: 45px;
        color: #fff;
      }
      img {
        width: 90%;
        border-radius: 15px;
        box-shadow: 10px 5px 5px rgba($color: #999, $alpha: 0.3);
      }
      .text {
        width: 90%;
      }
    }
  }
}
</style>