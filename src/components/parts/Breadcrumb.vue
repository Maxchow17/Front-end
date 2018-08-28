<template>
  <el-breadcrumb seperator-class="el-icon-arrow-right">
    <el-breadcrumb-item> {{currentPath}} </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      currentPath: ""
    };
  },
  methods: {
    getBreadcrumb() {
      this.currentPath = this.$route.path;
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  }
};
</script>

<style scoped>
.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 70px;
  margin-left: 10px;
}
</style>



