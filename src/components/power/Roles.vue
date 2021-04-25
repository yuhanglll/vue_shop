<template>
  <div>
    <!--   面包屑导航区   -->
    <el-breadcrumb separator-class="/el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="openRole">添加角色</el-button>
        </el-col>
      </el-row>

      <el-table :data="roleList" border stripe>
        <!--    展开列    -->
        <el-table-column type="expand">
          <template v-slot:default="scope">
            <el-row :class="['bdbottom',i1 === 0 ? 'bdtop': '','vcenter']" v-for="(item1,i1) in scope.row.children"
                    :key="item1.id">
              <!--渲染一级权限              -->
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row,item1.id)">{{ item1.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!--渲染二级权限              -->
              <el-col :span="19">
                <el-row :class="[i2 === 0 ? '': 'bdtop','vcenter']" v-for="(item2,i2) in item1.children"
                        :key="item2.id">
                  <el-col :span="6">
                    <el-tag type="success" closable @close="removeRightById(scope.row,item2.id)">
                      {{ item2.authName }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag type="warning" v-for="(item3,i3) in item2.children" :key="item3.id" closable
                            @close="removeRightById(scope.row,item3.id)">
                      {{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" width="50px"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template v-slot:default="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="showRoleEditDialog(scope.row.id)">编辑
            </el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeRole(scope.row.id)">删除</el-button>
            <el-button size="mini" type="warning" icon="el-icon-setting" @click="showSetRightDialog(scope.row)">分配权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--  添加角色信息的对话框  -->
    <el-dialog
        title="添加角色"
        :visible.sync="addDialogVisible"
        width="50%" @close="addDialogClosed">
      <!--  内容主体区域    -->
      <el-form :model="role" ref="addRoleFormRef" label-width="70px">
        <el-form-item label="角色名称">
          <el-input v-model="role.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="role.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!--   内容底部区域   -->
      <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>
    <!--  修改角色信息的对话框  -->
    <el-dialog
        title="修改角色"
        :visible.sync="editDialogVisible"
        width="50%" @close="editDialogClosed">
      <!--  内容主体区域    -->
      <el-form :model="editRoleForm" ref="editRoleFormRef" label-width="70px">
        <el-form-item label="角色名称">
          <el-input v-model="editRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="editRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!--   内容底部区域   -->
      <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateRole">确 定</el-button>
      </span>
    </el-dialog>
    <!--  分配权限对话框  -->
    <el-dialog
        title="分配权限"
        :visible.sync="setRightDialogVisible"
        width="50%" @close="setRightDialogClosed">
      <!--  树形控件    -->
      <el-tree :data="rightsList" :props="treeProps" show-checkbox node-key="id" default-expand-all
               :default-checked-keys="defKeys" ref="treeRef"></el-tree>
      <span slot="footer" class="dialog-footer">
    <el-button @click="setRightDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="allotRights">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Roles",
  data() {
    return {
      roleList: [],
      addDialogVisible: false,
      editDialogVisible: false,
      role: {
        roleName: '',
        roleDesc: ''
      },
      editRoleForm: {roleId:''},
      setRightDialogVisible: false,
      //所有权限
      rightsList: [],
      //树形控件绑定对象
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      /*树形权限默认选中的权限id数组*/
      defKeys: [],
      /*即将分配权限的角色id*/
      roleId: ''
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    /*获取角色列表*/
    async getRoleList() {
      const {data: res} = await this.$http.get('roles')
      if (res.meta.status !== 200) return this.$message.error('获取角色列表失败')
      this.roleList = res.data
    },
    openRole() {
      this.role = {}
      this.addDialogVisible = true
    },
    /*添加角色*/
    async addRole() {
      const {data: res} = await this.$http.post('roles', this.role)
      if (res.meta.status !== 201) {
        return this.$message.error('添加角色失败')
      }
      this.addDialogVisible = false
      this.getRoleList()
      this.$message.success('添加角色成功')
    },
    addDialogClosed() {
      this.$refs.addRoleFormRef.resetFields()
    },
    editDialogClosed() {
      this.$refs.editRoleFormRef.resetFields()
    },
    /*角色回显*/
    async showRoleEditDialog(id) {
      const {data: res} = await this.$http.get('roles/' + id)
      if (res.meta.status !== 200) return this.$message.error('查询角色信息失败')
      this.editRoleForm = res.data
      console.log(this.editRoleForm);
      this.editDialogVisible = true
    },
    /*更新角色*/
    async updateRole() {
      const {data: res} = await this.$http.put('roles/' + this.editRoleForm.roleId,
          {roleName: this.editRoleForm.roleName, roleDesc: this.editRoleForm.roleDesc})
      console.log(this.editRoleForm.id);
      console.log(res);
      if (res.meta.status !== 200) return this.$message.error('修改角色信息失败')
      this.editDialogVisible = false
      this.getRoleList()
      this.$message.success('修改角色信息成功')
    },
    /*删除角色*/
    async removeRole(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消了删除')
      }
      const {data: res} = await this.$http.delete('roles/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('删除角色失败')
      }
      this.getRoleList()
      this.$message.success('删除角色成功')
    },
    /*删除权限*/
    async removeRightById(role, rightId) {
      const confirmResult = await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消了删除')
      }
      const {data: res} = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      if (res.meta.status !== 200) {
        return this.$message.error('删除权限失败')
      }
      this.$message.success('删除权限成功')
      role.children = res.data
    },
    /*展示分配权限*/
    async showSetRightDialog(role) {
      this.roleId = role.id
      const {data: res} = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限列表失败')
      }
      this.rightsList = res.data
      this.getLeafKeys(role, this.defKeys)
      this.setRightDialogVisible = true
    },
    /*通过递归的形式 获取角色的所有三级权限*/
    getLeafKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getLeafKeys(item, arr)
      })
    },
    setRightDialogClosed() {
      this.defKeys = []
    },
    //为角色分配权限 ...是展开运算符
    async allotRights() {
      const keys = [...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedKeys()]
      const idStr = keys.join(',')
      const {data: res} = await this.$http.post(`roles/${this.roleId}/rights`, {rids: idStr})
      if (res.meta.status !== 200) {
        return this.$message.error('分配权限失败')
      }
      this.$message.success('分配权限成功')
      this.getRoleList()
      this.setRightDialogVisible = false
    }
  }
}
</script>

<style Lang="less" scoped>
.el-tag {
  margin: 7px;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}
</style>