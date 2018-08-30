<template>
    <el-autocomplete
        v-model="state"
        popper-class="my-autocomplete"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容">
        <i class="el-icon-edit el-input__icon" slot="suffix"></i>
        <template slot-scope="{ item }">
            <div class="main">{{ item.value }}</div>
        </template>
    </el-autocomplete>
</template>

<script>
export default {
  name: 'EditDropdown',
  data() {
    return {
      state: ''
    };
  },
  props: ['queryUrl', 'results'],
  methods: {
    querySearch(queryString, cb) {
      console.log('queryString: ' + queryString);
      if (queryString === '') return;
      this.api({
        url: this.queryUrl,
        method: 'get',
        params: {
          keyword: queryString
        }
      }).then(data => {
        var items = [];
        for (var itr in data.list) {
          let item = { value: itr };
          items += item;
        }
        cb(items);
      });
    }
  }
};
</script>


<style>
.my-autocomplete {
  line-height: normal;
  padding: 7px;
}
.main {
  text-overflow: ellipsis;
  overflow: hidden;
}
.sub {
  font-size: 12px;
  color: #b4b4b4;
}
.highlighted .addr {
  color: #ddd;
}
</style>