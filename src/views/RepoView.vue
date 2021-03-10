<template>
  <div>
    <div
      class="container"
      v-for="(repo, index) in repos"
      :key="`repo.${index}`"
    >
      <el-card class="box-card">
        <div slot="header" class="clearfix card_header">
          <span
            ><h3>{{ repo.name }}</h3></span
          >
        </div>
        <div class="text item">
          <h4>Link:</h4>
          <a :href="repo.html_url" target="_blank">{{ repo.html_url }}</a>
        </div>
        <div class="text item">
          <h4>Updated At :</h4>
          {{ formatDate(repo.updated_at) }}
        </div>
        <div class="text item">
          <h4>Description:</h4>
          {{ repo.description }}
        </div>
      </el-card>
    </div>
    <div class="info_text">
      <h3 v-if="isLoading">Loading...</h3>
      <h3 v-if="loadEnd">No more data</h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      API_URL: "https://api.github.com/users/LiDingYu0510/repos",

      //存放所有的repo data
      reposAll: [],

      //count, repos: 控制頁面每次加載repos數量
      count: 5,
      repos: [],

      //控制提示文字
      isLoading: false,
      loadEnd: false,
    };
  },

  methods: {
    //初始化github repo data 到頁面
    async initGithubData() {
      await axios.get(this.API_URL).then((res) => {
        this.reposAll = res.data;

        //重新sort reposAll arr，由最新更新的repo開始排列
        this.reposAll.sort(function(a, b) {
          let dateA = new Date(a.updated_at);
          let dateB = new Date(b.updated_at);
          return dateA - dateB;
        });
        this.reposAll.reverse();

        //初始化時，只呈現5個repo
        for (let i = 0; i < this.count; i++) {
          this.repos.push(this.reposAll[i]);
        }
      });
    },

    //監聽scroll動作
    scroll(repo) {
      window.onscroll = () => {
        // 距離底部200px加載一次
        let bottomOfWindow =
          document.documentElement.offsetHeight -
            document.documentElement.scrollTop -
            window.innerHeight <=
          200;
        if (
          bottomOfWindow &&
          this.isLoading == false &&
          this.count <= this.reposAll.length
        ) {
          this.isLoading = true;
          this.count += 5;
          setTimeout(() => {
            for (let i = this.count - 5; i < this.count; i++) {
              if (i >= this.reposAll.length) {
                this.isLoading = false;
                this.loadEnd = true;
                // console.log("count", i);
                // console.log("repos", this.repos.length);
              } else {
                repo.push(this.reposAll[i]);
                this.isLoading = false;
              }
            }
          }, 1000);
        }
      };
    },

    //格式化時間文字
    formatDate(date) {
      if (date) {
        return moment(String(date)).format("YYYY/MM/DD");
      }
    },
  },
  beforeMount() {
    // 在頁面掛載前發出請求
    this.initGithubData();
  },
  mounted() {
    this.scroll(this.repos);
  },
};
</script>

<style lang="scss">
.container {
  display: flex;
  justify-content: center;
}
.box-card {
  margin-bottom: 10px;
  width: 600px;

  .card_header {
    text-align: center;
    h3 {
      margin: 0;
    }
  }
  .item {
    text-align: left;
    margin-bottom: 10px;

    h4 {
      margin: 0;
    }
  }
}
.info_text {
  text-align: center;
}
</style>
