<template>
  <el-container>
    <el-header class="header"><h1>Github Repositories List</h1></el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer class="footer"> <h1>DING</h1></el-footer>
  </el-container>
</template>

<script>
export default {};
</script>

<style lang="scss">
.header {
  text-align: center;
  justify-content: center;
  background-color: #6495ed;
  height: 60px;
  line-height: 60px;

  h1 {
    margin: 0;
  }
}
.footer {
  text-align: center;
  background-color: #808080;
  height: 60px;
  line-height: 60px;

  h1 {
    margin: 0;
  }
}
</style>
