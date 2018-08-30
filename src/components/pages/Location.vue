<template>
    <div>
        <el-row>
            <el-card class="header-card">
                <i class="el-icon-third-weizhi-xianxing"></i>
                <span> Location</span>
                <el-button class="add-button" type="text" @click="handleCreateButton()">添加</el-button>
            </el-card>
        </el-row>
        <el-row>
          <div class="container">
              <el-table :data="tableData" v-loading="loading">
                <el-table-column prop="id" label="编号"></el-table-column>
                <el-table-column prop="city" label="城市"></el-table-column>
                <el-table-column prop="country" label="国家"></el-table-column>
                <el-table-column fixed="right" label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" size="medium" @click="handleEditButton(scope.row)">编辑</el-button>
                    <el-button type="text" class="delete-button" icon="el-icon-delete" size="medium" @click="handleDeleteButton(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination
                  @size-change="handlePageSizeChange"
                  @current-change="handleCurrentPageChange"
                  :current-page="currentPage"
                  :page-sizes="[20, 30, 50, 100]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
              </div>
          </div>
        </el-row>

        <!-- 新建对话框 -->
        <el-dialog title="新建地理信息" :visible.sync="createVisible" width="30%">
          <div style="margin: 20px;">
            <el-form>
              <el-form-item label="城市">
                <el-input v-model="locationInfo.city"></el-input>
              </el-form-item>
              <el-form-item label="国家">
                <el-input v-model="locationInfo.country"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="createVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleCreateConfirm()">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 编辑对话框 -->
        <el-dialog title="编辑地理信息" :visible.sync="editVisible" width="30%">
          <div style="margin: 20px;">
            <el-form>
              <el-form-item label="城市">
                <el-input v-model="locationInfo.city"></el-input>
              </el-form-item>
              <el-form-item label="国家">
                <el-input v-model="locationInfo.country"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleEditConfirm()">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 删除对话框 -->
        <el-dialog title="删除地理信息" :visible.sync="deleteVisible" width="30%">
            <span>是否删除</span>
            <span>{{ locationInfo.city }} - {{ locationInfo.country }} ?</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="deleteVisible = false">取 消</el-button>
            <el-button type="danger" @click="handleDeleteConfirm()">确 定</el-button>
          </span>
        </el-dialog>
        
    </div>
</template>

<script>
export default {
  name: 'Location',
  data() {
    return {
      // loading state
      loading: false,
      // category table data
      tableData: [],
      // pagination
      currentPage: 1,
      pageSize: 20,
      total: 0,
      // dialogs
      // create dialog
      createVisible: false,
      // edit dialog
      editVisible: false,
      // delete dialog
      deleteVisible: false,
      // target location info
      locationInfo: {
        id: '',
        city: '',
        country: ''
      }
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.loading = true;
      this.api({
        url: '/location/list',
        method: 'get',
        params: {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
      }).then(returnData => {
        this.tableData = returnData.list;
        this.total = returnData.totalCount;
        this.loading = false;
      });
    },
    clearLocationInfo() {
      this.locationInfo.id = '';
      this.locationInfo.city = '';
      this.locationInfo.country = '';
    },
    handlePageSizeChange(pageSz) {
      this.pageSize = pageSz;
      this.getTableData();
    },
    handleCurrentPageChange(page) {
      this.currentPage = page;
      this.getTableData();
    },
    handleCreateButton() {
      this.createVisible = true;
      this.clearLocationInfo();
    },
    handleEditButton(row) {
      this.editVisible = true;
      this.locationInfo.id = row.id;
      this.locationInfo.city = row.city;
      this.locationInfo.country = row.country;
    },
    handleDeleteButton(row) {
      this.deleteVisible = true;
      this.locationInfo.id = row.id;
      this.locationInfo.city = row.city;
      this.locationInfo.country = row.country;
    },
    handleCreateConfirm() {
      this.createVisible = false;
      this.api({
        url: '/location/create',
        method: 'post',
        data: this.locationInfo
      }).then(() => {
        this.getTableData();
      });
    },
    handleEditConfirm() {
      this.editVisible = false;
      this.api({
        url: '/location/update',
        method: 'post',
        data: this.locationInfo
      }).then(() => {
        this.getTableData();
      });
    },
    handleDeleteConfirm() {
      this.deleteVisible = false;
      this.api({
        url: '/location/delete',
        method: 'delete',
        data: {
          id: this.locationInfo.id
        }
      }).then(() => {
        this.getTableData();
      });
    }
  }
};
</script>

<style scoped>
.header-card {
  line-height: 60px;
  font-size: 18px;
  margin-bottom: 20px;
}
.add-button {
  float: right;
  font-size: 14px;
  align-content: space-around;
  line-height: 40px;
}
.delete-button {
  color: crimson;
}
</style>
