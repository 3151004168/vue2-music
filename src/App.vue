<template>
  <div id="app">
    <router-view :key="$route.fullPath"  />
  </div>
</template>


<style lang='scss'>
@import "./assets/icon/iconfont.css";
@import url("//at.alicdn.com/t/font_2605782_e6mj2r2oe97.css");
@import "./assets/style/common.scss";
@import "./assets/style/global.scss";
html,
body,
#app {
  height: 100%;
}
html {
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
