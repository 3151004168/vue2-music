<template>
  <div id="discover">
    <a-layout>
      <a-layout-header style="padding-top: 10px">
        <a-menu mode="horizontal" style="border: 0">
          <a-menu-item key="1">
            <router-link to="/recommend"> 个性推荐</router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <router-link to="/songList"> 歌单</router-link>
          </a-menu-item>
          <a-menu-item key="3">
            <router-link to="/dj"> 主播电台</router-link>
          </a-menu-item>
          <a-menu-item key="4">
            <router-link to="/ranking"> 排行榜</router-link>
          </a-menu-item>
          <a-menu-item key="5">
            <router-link to="/singer"> 歌手</router-link>
          </a-menu-item>
          <a-menu-item key="6">
            <router-link to="/latest"> 最新音乐</router-link>
          </a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout-content style="padding: 0">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: "",
    };
  },
  methods: {},
};
</script>


<style lang="scss" scoped>
#discover {
  width: 100%;
  height: 100%;
  .ant-layout {
    width: 100%;
    height: 100%;
    .ant-layout-header {
      padding: 0;
      background-color: #fff;
      .ant-menu {
        margin-bottom: 10px;
        .ant-menu-item {
          font-size: 15px;
          font-weight: 500;
        }
        .ant-menu-item:hover {
          border: none;
        }
      }
    }
    .ant-layout-content {
      background-color: #fff;
    }
  }
}
</style>