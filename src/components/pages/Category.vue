<template>
    <div>
        <el-row>
            <el-card class="header-card">
              <span>Category</span>
              <el-button class="add-button" type="text" @click="handleCreateButton()">添加</el-button>
            </el-card>
        </el-row>
        <el-row>
          <div class="container">
              <el-table :data="tableData" v-loading="loading">
                <el-table-column prop="id" label="序号"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="code" label="代码"></el-table-column>
                <el-table-column prop="note" label="备注"></el-table-column>
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

        <!-- 新建产品类型对话框 -->
        <el-dialog title="新建产品类型" :visible.sync="createVisible" width="70%">
          <div style="margin: 20px;">
            <el-form>
              <el-form-item label="名称">
                <el-input v-model="categoryInfo.name"></el-input>
              </el-form-item>
              <el-form-item label="代码">
                <el-input v-model="categoryInfo.code"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="categoryInfo.note"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="createVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleCreateConfirm()">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 编辑产品类型对话框 -->
        <el-dialog title="编辑产品类型" :visible.sync="editVisible" width="70%">
          <div style="margin: 20px;">
            <el-form>
              <el-form-item label="名称">
                <el-input v-model="categoryInfo.name"></el-input>
              </el-form-item>
              <el-form-item label="代码">
                <el-input v-model="categoryInfo.code"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="categoryInfo.note"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleEditConfirm()">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 删除产品类型对话框 -->
        <el-dialog title="删除产品类型" :visible.sync="deleteVisible" width="70%">
          <span>是否删除 {{ categoryInfo.name }}?</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="deleteVisible = false">取 消</el-button>
            <el-button type="danger" @click="handleDeleteConfirm()">确 定</el-button>
          </span>
        </el-dialog>
        
    </div>
</template>

<script>
export default {
  name: "Category",
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
      // target categry info (id, name, code, note)
      categoryInfo: {
        id: "",
        name: "",
        code: "",
        note: ""
      }
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      //this.loading = true;
      this.api({
        url: "/category/list",
        method: "get",
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
    clearCategoryInfo() {
      this.categoryInfo.id = "";
      this.categoryInfo.name = "";
      this.categoryInfo.code = "";
      this.categoryInfo.note = "";
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
      this.clearCategoryInfo();
    },
    handleEditButton(row) {
      this.editVisible = true;
      this.categoryInfo.id = row.id;
      this.categoryInfo.name = row.name;
      this.categoryInfo.code = row.code;
      this.categoryInfo.note = row.note;
    },
    handleDeleteButton(row) {
      this.deleteVisible = true;
      this.categoryInfo.id = row.id;
      this.categoryInfo.name = row.name;
    },
    handleCreateConfirm() {
      this.createVisible = false;
      this.api({
        url: "/category/create",
        method: "post",
        data: this.categoryInfo
      }).then(() => {
        this.getTableData();
      });
    },
    handleEditConfirm() {
      this.editVisible = false;
      this.api({
        url: "/category/update",
        method: "post",
        data: this.categoryInfo
      }).then(() => {
        this.getTableData();
      });
    },
    handleDeleteConfirm() {
      this.deleteVisible = false;
      this.api({
        url: "/category/delete",
        method: "delete",
        data: {
          id: this.categoryInfo.id
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
