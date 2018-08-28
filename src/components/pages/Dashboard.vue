<template>
  <div>
    <el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="hover">
          概览-1
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
          概览-2
          </el-card>
      </el-col>
      <el-col :span="8">
          <el-card shadow="hover">
          概览-3
          </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {};
  }
};
</script>
