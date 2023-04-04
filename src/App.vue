<template>
  <div class="layout">
    <!--左侧导航-->
    <div class="menu">
      <!--标题-->
      <h2 style="padding: 20px ;text-align: center;color: white">挑战杯系统</h2>
      <el-menu
          :default-active="$route.path" router
          style="width: 200px;"
          class="el-menu-vertical-demo"
          background-color="#304156"
          text-color="#fff"
      >
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <span slot="title">第一页</span>
        </el-menu-item>
        <el-menu-item index="/second">
          <i class="el-icon-document"></i>
          <span slot="title">第二页</span>
        </el-menu-item>
        <el-menu-item index="/third">
          <i class="el-icon-setting"></i>
          <span slot="title">第三页</span>
        </el-menu-item>
        <el-menu-item index="/fourth">
          <i class="el-icon-setting"></i>
          <span slot="title">第四页</span>
        </el-menu-item>
        <el-menu-item index="/fifth">
          <i class="el-icon-setting"></i>
          <span slot="title">第五页</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!--右侧内容-->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',

}
</script>

<style lang="less" scoped>
.layout {

  .menu {
    position: fixed;
    background: #304156;
    left: 0;
    top: 0;
    bottom: 0;

    .el-menu {
      border-right: 0;
    }
  }

  .content {
    padding-left: 200px;
  }
}

</style>
