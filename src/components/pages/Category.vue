<template>
    <div>
        <el-container>
            <el-header>
                <span>Category</span>
                <el-button class="add-button" type="text">添加</el-button>
            </el-header>
            <el-main>
                Main
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
  name: "Category",
  data() {
    return {};
  }
};
</script>


<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: left;
  line-height: 60px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.add-button {
  float: right;
}
</style>
