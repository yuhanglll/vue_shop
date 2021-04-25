<template>
  <!-- 头部区域 -->
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!--  页面主体区域  -->
    <el-container>
      <!--   侧边栏   -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!--   侧边栏菜单     -->
        <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409EFF" unique-opened :collapse="isCollapse" :collapse-transition="false"
            :router="true" :default-active="$route.path">
          <!--    一级菜单      -->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <!--     一级菜单模板区域       -->
            <template slot="title">
              <!--     图标         -->
              <i :class="{'用户管理':'iconfont icon-user','权限管理':'iconfont icon-tijikongjian','商品管理':'iconfont icon-shangpin','订单管理':'iconfont icon-danju','数据统计':'iconfont icon-baobiao'}[item.authName]"></i>
              <!--      文本        -->
              <span>{{ item.authName }}</span>
            </template>
            <!--            二级菜单-->
            <el-menu-item :index="'/'+ subItem.path"
                          v-for="subItem in item.children" :key="subItem.id">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--   右侧内容   -->
      <el-main class="menu">
        <router-view></router-view>
      </el-main>

    </el-container>

<!--    <el-footer class="held">Copyright©石家庄藁城区张家庄镇三邱村版权所有</el-footer>-->
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      menuList: [],
      isCollapse: false,
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
    /*this.activePath = window.sessionStorage.getItem('activePath')*/
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push('/login');
      this.$message.success('退出成功')
    },
    /*获取所有菜单*/
    async getMenuList() {
      const {data: res} = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
    },
    /*切换左侧菜单折叠与展开*/
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    /*保存链接激活状态 这个有个小bug 不建议使用此方法*/
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;

  > div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

.menu {
  height: calc(100vh - 60px);
  overflow: auto;
}

/*.held {
  height: 100px;
  background-color: #0086b3;
  text-align: center;

}*/
</style>