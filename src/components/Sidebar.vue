<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from "@/components/bus";
export default {
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: "el-icon-setting",
          index: "Dashboard",
          title: "Dashboard"
        },
        {
          icon: "el-icon-setting",
          index: "Quotation",
          title: "Quotation"
        },
        {
          icon: "el-icon-setting",
          index: "SalesOrder",
          title: "SalesOrder"
        },
        {
          icon: "el-icon-setting",
          index: "Product",
          title: "Product"
        },
        {
          icon: "el-icon-setting",
          index: "Accessory",
          title: "Accessory"
        },
        {
          icon: "el-icon-setting",
          index: "Category",
          title: "Category"
        },
        {
          icon: "el-icon-setting",
          index: "Client",
          title: "Client"
        },
        {
          icon: "el-icon-setting",
          index: "Location",
          title: "Location"
        },
        {
          icon: "el-icon-setting",
          index: "Supplier",
          title: "Supplier"
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  text-align: left;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
