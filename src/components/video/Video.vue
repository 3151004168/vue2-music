<template>
  <div class="mv">
    <div class="mv-left">
      <h2 @click="goBack()" style="cursor: pointer">
        <i class="iconfont icon-back"></i> 视频详情
      </h2>
      <div class="mv-info">
        <video :src="mvUrl" controls></video>
      </div>
      <div class="avatar">
        <a-avatar :src="mvInfo.avatarUrl" :size="64">
          <a-icon slot="icon" type="user" />
        </a-avatar>
        {{ artists }}
      </div>
      <div class="brief">
        <h2>
          {{ mvInfo.title
          }}<i
            class="iconfont"
            :class="isUnfold ? 'icon-shang' : 'icon-tubiaozhizuo-'"
            @click="getIsUnfold"
          ></i>
        </h2>
        <p style="color: #999">
          发布：{{ mvInfo.publishTime }} &nbsp;&nbsp;&nbsp;&nbsp;播放：{{
            10000 > mvInfo.playTime
              ? mvInfo.playTime
              : Math.round(mvInfo.playTime / 10000) + "万"
          }}
        </p>
      </div>
      <div v-if="isUnfold" class="desc">{{ mvInfo.description }}</div>
      <div class="btn">
        <a-button style="border-radius: 50px; margin-right: 10px">
          <i class="iconfont icon-zan"></i>
          赞{{
            commentInfo.likedCount ? "(" + commentInfo.likedCount + ")" : ""
          }}
        </a-button>
        <a-button style="border-radius: 50px; margin-right: 10px">
          <i class="iconfont icon-shoucanggedan"></i>收藏{{
            commentInfo.subCount ? "(" + commentInfo.subCount + ")" : ""
          }}</a-button
        >
        <a-button style="border-radius: 50px; margin-right: 10px">
          <i class="iconfont icon-fenxiang"></i>分享{{
            commentInfo.shareCount ? "(" + commentInfo.shareCount + ")" : ""
          }}</a-button
        >
        <a-button style="border-radius: 50px; margin-right: 10px">
          <i class="iconfont icon-xiazaiquanbu-01" style="font-weight: bold"></i
          >下载MV</a-button
        >
        <span class="report">举报</span>
      </div>
      <div class="comments">
        <a-comment>
          <!-- <a-avatar
            slot="avatar"
            src="../../assets/avatar.jpg"
            alt="Han Solo"
          /> -->
          <div slot="content">
            <a-form-item>
              <a-textarea :rows="4" :value="value" @change="handleChange" />
            </a-form-item>
            <a-form-item>
              <a-button
                html-type="submit"
                :loading="submitting"
                type="primary"
                @click="handleSubmit"
                style="float: right"
              >
                评论
              </a-button>
            </a-form-item>
          </div>
        </a-comment>
        <a-list
          v-if="comments.length"
          :data-source="comments"
          header="精彩评论"
          item-layout="horizontal"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <a-comment>
              <div class="address">
                <div class="avatar">
                  <img :src="item.user.avatarUrl" alt="" />
                </div>
                <div class="">
                  <div class="content">
                    <span>{{ item.user.nickname }}:</span> {{ item.content }}
                  </div>
                  <div class="datetime">{{ item.time }}</div>
                </div>
              </div>
            </a-comment>
          </a-list-item>
        </a-list>
      </div>
    </div>
    <div class="recom">
      <h2 style="cursor: default">相关推荐</h2>
      <div class="bottom">
        <div
          class="similar"
          v-for="item in similarMv"
          :key="item.id"
          @click="getMv(item.vid)"
        >
          <div class="img">
            <img :src="item.coverUrl" alt="" />
            <span class="icon">
              <i class="iconfont icon-bofang2"></i>
              <!-- {{ item.coverUrl }} -->
            </span>
            <span class="time">{{ item.durationms }}</span>
          </div>
          <div class="text">
            {{ item.title }}
            <p>
              {{
                item.creator[0].userName
                  ? "by" + " " + item.creator[0].userName
                  : ""
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/api/axios";
import moment from "moment";
import { fomatMinute } from "@/utils/time";
import { mapState } from "vuex";
export default {
  data() {
    return {
      mvInfo: "",
      isUnfold: false,
      artists: "",
      mvUrl: "",
      comments: [],
      submitting: false,
      value: "",
      moment,
      commentInfo: "",
      similarMv: "",
      id: this.$store.state.mvInfo,
    };
  },
  methods: {
    handleSubmit() {
      if (!this.value) {
        return;
      }
      this.submitting = true;
      setTimeout(() => {
        this.submitting = false;
        this.comments = [
          {
            author: "Han Solo",
            avatar:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            content: this.value,
            datetime: moment().fromNow(),
          },
          ...this.comments,
        ];
        this.value = "";
      }, 1000);
    },
    handleChange(e) {
      this.value = e.target.value;
    },
    async getMvInfo() {
      //   console.log(this.id);
      const { data } = await axios("/video/detail", {
        params: { id: this.id },
      });
      // console.log(data);
      this.mvInfo = data.data;
      this.artists = this.mvInfo.creator.nickname;
      this.mvInfo.publishTime = this.getFormat(this.mvInfo.publishTime);
      //   this.artists = this.mvInfo.artists[0];
      this.getCommentInfo();
      this.getComments();
      this.getMvAddress();
      this.getSimilarMv();
    },
    async getMv(id) {
      console.log(id);
      this.$store.commit("MV_INFO", id);
      this.$router.push(`/video/${id}`);
    },
    async getCommentInfo() {
      const data = await axios("/video/detail/info", {
        params: {
          vid: this.id,
        },
      });
      //   console.log(data.data);
      this.commentInfo = data.data;
    },
    async getComments() {
      const { data } = await axios("/comment/new", {
        params: {
          type: 5,
          id: this.id,
          sortType: 99,
        },
      });
      //   console.log(data.data.comments);
      this.comments = data.data.comments;
      for (let i = 0; i < this.comments.length; i++) {
        this.comments[i].time = this.getFormat(this.comments[i].time);
      }
    },
    getFormat(timestamp) {
      let date = new Date(timestamp);
      //   var y = date.getFullYear();
      var m = date.getMonth() + 1;
      //   m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      +" " + h + ":" + minute + ":" + second;
      const time = m + "月" + d + "日" + h + ":" + minute;
      return time;
    },
    getIsUnfold() {
      this.isUnfold = !this.isUnfold;
    },
    async getMvAddress() {
      const { data } = await axios("/video/url", {
        params: {
          id: this.id,
        },
      });
      //   console.log(data);
      this.mvUrl = data.urls[0].url;
    },
    async getSimilarMv() {
      const { data } = await axios("/related/allvideo", {
        params: {
          id: this.id,
        },
      });
      console.log(data.data);
      this.similarMv = data.data;
      for (let i = 0; i < this.similarMv.length; i++) {
        this.similarMv[i].durationms = fomatMinute(
          this.similarMv[i].durationms
        );
      }
      //   console.log(this.id);
    },
    goBack() {
      this.$router.push("/home");
    },
  },
  created() {
    this.getMvInfo();
  },
};
</script>

<style lang="scss" scoped>
.mv {
  display: flex;
  height: 100%;
  padding: 20px;
  .mv-left {
    width: 63%;
    margin-right: 20px;
    .desc {
      margin-bottom: 30px;
    }
    .mv-info {
      width: 100%;
      height: 50%;
      background-color: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      video {
        width: 100%;
        height: 100%;
      }
    }
    .avatar {
      margin: 20px 0;
      .ant-avatar {
        margin-right: 10px;
      }
    }
    .btn {
      .report {
        float: right;
        text-decoration: underline;
        color: #999;
        cursor: default;
      }
      .report:hover {
        color: #666;
      }
    }
    .comments {
      .address {
        display: flex;
        justify-content: center;
        align-items: center;
        .avatar {
          margin-right: 20px;
          img {
            width: 50px;
            border-radius: 50%;
          }
        }
        .content {
          span {
            color: rgb(0, 162, 255);
          }
        }
      }
    }
  }
  .recom {
    width: 37%;
    padding-right: 50px;
    .similar {
      display: flex;
      margin-bottom: 20px;
      .img {
        width: 50%;
        position: relative;
        margin-right: 10px;
        color: #fff;
        .icon,
        .time {
          position: absolute;
          right: 0;
          margin-right: 5px;
        }
        .time {
          bottom: 0;
        }
        img {
          width: 100%;
          border-radius: 10px;
          box-shadow: 10px 5px 5px rgba($color: #000000, $alpha: 0.1);
        }
      }
      .text {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
          margin: 0;
        }
      }
    }
  }
}
</style>