<template>
    <div>
        <v-sidebar></v-sidebar>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import vSidebar from "@/components/Sidebar";
import bus from "@/components/bus";
export default {
  data() {
    return {
      collapse: false
    };
  },
  components: {
    vSidebar
  }
};
</script>
