<template>
  <div class="video">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="视频">
        <div class="tag">
          <ul class="btn">
            <li>
              <a-popover title="全部视频" trigger="click" v-model="visible">
                <template slot="content">
                  <ul
                    style="
                      display: flex;
                      flex-wrap: wrap;
                      justify-content: space-between;
                    "
                  >
                    <li
                      style="width: 15%; cursor: pointer"
                      v-for="item in groupList"
                      :key="item.id"
                      @click="getGroup(item.id)"
                    >
                      {{ item.name }}
                    </li>
                  </ul>
                </template>
                <a-button style="border-radius: 50px">
                  全部视频
                  <i class="iconfont icon-more"></i>
                </a-button>
              </a-popover>
            </li>
          </ul>
          <ul class="cate">
            <li
              v-for="(item, index) in categoryList"
              :key="item.id"
              class="li"
              @click="getGroup(item.id)"
            >
              {{ item.name }}
              <span class="shu">
                {{ categoryList.length - 1 > index ? "|" : "" }}
              </span>
            </li>
          </ul>
        </div>
        <div class="container">
          <div
            class="container-item"
            v-for="item in videoListAll"
            :key="item.vid"
            @click="getVideo(item.vid)"
          >
            <div class="img">
              <img :src="item.coverUrl" alt="" />
              <span class="icon"
                ><i class="iconfont icon-bofang2"></i
                >{{ item.praisedCount }}</span
              >
              <span class="duration">{{ item.durationms }}</span>
            </div>
            <div class="text">
              <p>{{ item.title }}</p>
              <p style="color: #999">
                {{
                  item.creator.nickname ? "by   " + item.creator.nickname : ""
                }}
              </p>
            </div>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="MV" force-render>
        <div class="container">
          <div
            class="container-item"
            v-for="item in mvList"
            :key="item.id"
            @click="getMVItem(item.id)"
          >
            <div class="img">
              <img :src="item.cover" alt="" />
              <span class="icon"
                ><i class="iconfont icon-bofang2"></i>{{ item.playCount }}</span
              >
              <span class="duration">{{ item.duration }}</span>
            </div>
            <div class="text">
              <p>{{ item.title }}</p>
              <p style="color: #999">
                {{ item.artistName }}
              </p>
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import axios from "@/api/axios";
import { fomatMinute } from "@/utils/time";
export default {
  data() {
    return {
      categoryList: "",
      videoListAll: "",
      groupList: "",
      visible: false,
      mvList: "",
    };
  },
  methods: {
    callback(key) {
      console.log(key);
    },
    async getVideoList() {
      const { data } = await axios("/video/category/list");
      // console.log(data.data);
      this.categoryList = data.data;
    },
    async getVideoListAll() {
      const { data } = await axios("/video/timeline/all");
      this.getFilter(data);
    },
    async getGroupList() {
      const { data } = await axios("/video/group/list");
      // console.log(data.data);
      this.groupList = data.data;
    },
    async getGroup(id) {
      console.log(id);
      const { data } = await axios("/video/group", {
        params: {
          id: id,
        },
      });
      this.getFilter(data);
      this.visible = false;
    },
    getFilter(data) {
      this.videoListAll = data.datas;
      for (let i = 0; i < data.datas.length; i++) {
        this.videoListAll[i] = this.videoListAll[i].data;
        this.videoListAll[i].durationms = fomatMinute(
          this.videoListAll[i].durationms
        );
      }
    },
    getVideo(vid) {
      // console.log(vid);
      this.$store.commit("MV_INFO", vid);
      this.$router.push(`/video/${vid}`);
    },
    async getMv() {
      const { data } = await axios("/mv/all", {
        params: {
          order: 1,
        },
      });
      console.log(data.data);
      this.mvList = data.data;
      for (let i = 0; i < this.mvList.length; i++) {
        this.mvList[i].duration = fomatMinute(this.mvList[i].duration);
      }
    },
    getMVItem(id) {
      console.log(id);
      this.$store.commit("MV_INFO", id);
      this.$router.push(`/mv/${id}`);
    },
  },
  created() {
    this.getVideoList();
    this.getVideoListAll();
    this.getGroupList();
    this.getMv();
  },
};
</script>

<style lang="scss" scoped>
.video {
  .tag {
    display: flex;
    justify-content: space-between;
    .cate {
      width: 60%;
      font-size: 10px;
      .li {
        margin: 0;
        .shu {
          color: rgba($color: #000000, $alpha: 0.1);
          margin: 0 5px;
        }
      }
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
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    .container-item {
      margin-right: 20px;
      width: 30%;
      display: flex;
      flex-direction: column;
      .img {
        position: relative;
        color: #fff;
        img {
          width: 100%;
          border-radius: 10px;
          box-shadow: 10px 5px 5px rgba($color: #000000, $alpha: 0.1);
          margin-bottom: 10px;
        }
        .icon {
          position: absolute;
          right: 5px;
          top: 0;
        }
        .duration {
          position: absolute;
          right: 5px;
          bottom: 10px;
        }
      }
    }
  }
}
</style>