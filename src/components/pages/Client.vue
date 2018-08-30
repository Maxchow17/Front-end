<template>
    <div>
        <el-row>
            <el-card class="header-card">
                <i class="el-icon-third-weizhi-xianxing"></i>
                <span> Client</span>
                <el-button class="add-button" type="text" @click="handleCreateButton()">添加</el-button>
            </el-card>
        </el-row>
        <el-row>
          <div class="container">
              <el-table :data="tableData" v-loading="loading">
                <el-table-column prop="id" label="编号"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="location.city" label="城市"></el-table-column>
                <el-table-column prop="location.country" label="国家"></el-table-column>
                <el-table-column prop="phone" label="电话"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
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
        <el-dialog title="新建客户" :visible.sync="createVisible" width="30%">
          <div style="margin: 20px;">
            <el-form>
                <el-form-item label="名称">
                    <el-input v-model="clientInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="国家">
                    <EditDropdown v-model="clientInfo.location.country" queryUrl="/location/countries/query"></EditDropdown><!-- <el-input v-model="clientInfo.location.country"></el-input> -->
                </el-form-item>
                <el-form-item label="城市">
                    <EditDropdown v-model="clientInfo.location.city" queryUrl="/location/cities/query"></EditDropdown><!-- <el-input v-model="clientInfo.location.city"></el-input> -->
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="clientInfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="clientInfo.email"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input type="textarea" v-model="clientInfo.address"></el-input>
                </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="createVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleCreateConfirm()">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 编辑对话框 -->
        <el-dialog title="编辑客户信息" :visible.sync="editVisible" width="30%">
          <div style="margin: 20px;">
            <el-form>
                <el-form-item label="名称">
                    <el-input v-model="clientInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="城市">
                    <el-input v-model="clientInfo.location.city"></el-input>
                </el-form-item>
                <el-form-item label="国家">
                    <el-input v-model="clientInfo.location.country"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="clientInfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="clientInfo.email"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input type="textarea" v-model="clientInfo.address"></el-input>
                </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleEditConfirm()">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 删除对话框 -->
        <el-dialog title="删除客户信息" :visible.sync="deleteVisible" width="30%">
            <span>是否删除</span>
            <span>{{ clientInfo.id }} - {{ clientInfo.name }} ?</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="deleteVisible = false">取 消</el-button>
            <el-button type="danger" @click="handleDeleteConfirm()">确 定</el-button>
          </span>
        </el-dialog>
        
    </div>
</template>

<script>
import EditDropdown from '@/components/parts/editDropdown';
export default {
  name: 'Client',
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
      // query url
      queryCountryUrl: '',
      // create dialog
      createVisible: false,
      // edit dialog
      editVisible: false,
      // delete dialog
      deleteVisible: false,
      // target info
      clientInfo: {
        id: '',
        name: '',
        phone: '',
        email: '',
        address: '',
        location: {
          city: '',
          country: ''
        }
      }
    };
  },
  components: {
    EditDropdown
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.loading = true;
      this.api({
        url: '/client/list',
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
    clearClientInfo() {
      this.clientInfo.id = '';
      this.clientInfo.name = '';
      this.clientInfo.location.city = '';
      this.clientInfo.location.country = '';
      this.clientInfo.phone = '';
      this.clientInfo.email = '';
      this.clientInfo.address = '';
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
      this.clearClientInfo();
    },
    handleEditButton(row) {
      this.editVisible = true;
      this.clientInfo.id = row.id;
      this.clientInfo.name = row.name;
      this.clientInfo.location.city = row.location.city;
      this.clientInfo.location.country = row.location.country;
      this.clientInfo.phone = row.phone;
      this.clientInfo.email = row.email;
      this.clientInfo.address = row.address;
    },
    handleDeleteButton(row) {
      this.deleteVisible = true;
      this.clientInfo.id = row.id;
      this.clientInfo.name = row.name;
    },
    handleCreateConfirm() {
      this.createVisible = false;
      this.api({
        url: '/client/create',
        method: 'post',
        data: this.clientInfo
      }).then(() => {
        this.getTableData();
      });
    },
    handleEditConfirm() {
      this.editVisible = false;
      this.api({
        url: '/client/update',
        method: 'post',
        data: this.clientInfo
      }).then(() => {
        this.getTableData();
      });
    },
    handleDeleteConfirm() {
      this.deleteVisible = false;
      this.api({
        url: '/client/delete',
        method: 'delete',
        data: {
          id: this.clientInfo.id
        }
      }).then(() => {
        this.getTableData();
      });
    },
    handleSelected(item) {
      console.log(item);
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