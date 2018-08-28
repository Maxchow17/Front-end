<template>
    <div class="wrapper">
        <v-header></v-header>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
          <div class="content">
            <transition name="move" mode="out-in">
              <router-view></router-view>
            </transition>
          </div>
        </div>
    </div>
</template>

<script>
import vHeader from "@/components/Header";
import vSidebar from "@/components/Sidebar";
import bus from "@/components/bus";
export default {
  data() {
    return {
      collapse: false
    };
  },
  components: {
    vHeader,
    vSidebar
  },
  created() {
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  }
};
</script>
