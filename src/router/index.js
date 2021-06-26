import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const login = () => import("@/views/login/Login.vue");
const home = () => import("@/views/home/Home.vue");
const discover = () => import("@/views/discover/Discover.vue");
const songlist = () => import("@/components/songList/Songlist.vue");
const recommend = () => import("@/views/discover/recommend/Recommend.vue");
const recommendSong = () =>
  import("@/components/recommendSong/RecommendSong.vue");
const songList = () => import("@/views/discover/songList/SongList.vue");
const dj = () => import("@/views/discover/dj/Dj.vue");
const ranking = () => import("@/views/discover/ranking/Ranking.vue");
const singer = () => import("@/views/discover/singer/Singer.vue");
const latestMusic = () =>
  import("@/views/discover/latest-music/latest-music.vue");
const mv = () => import("@/components/mv/Mv.vue");
const singerInfo = () => import("@/components/singer/Singer.vue");
const video = () => import("@/views/video/Video.vue");
const videoDetail = () => import("@/components/video/Video.vue");

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: login,
  },
  {
    path: "/home",
    component: home,
    children: [
      {
        path: "/",
        redirect: "/discover",
      },
      {
        path: "/discover",
        component: discover,
        children: [
          {
            path: "/",
            redirect: "/recommend",
          },
          {
            path: "/recommend",
            component: recommend,
          },
          {
            path: "/songList",
            component: songList,
          },
          {
            path: "/dj",
            component: dj,
          },
          {
            path: "/ranking",
            component: ranking,
          },
          {
            path: "/singer",
            component: singer,
          },
          {
            path: "/latest",
            component: latestMusic,
          },
        ],
      },
      {
        path: "/songList/:id",
        component: songlist,
      },
      {
        path: "/recommendSong/:id",
        component: recommendSong,
      },
      {
        path: "/singerInfo/:id",
        component: singerInfo,
      },
      {
        path: "/video",
        component: video,
      },
    ],
  },
  {
    path: "/mv/:id",
    component: mv,
  },
  {
    path: "/video/:id",
    component: videoDetail,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
