<template>
    <div>
        <div style="padding-bottom:15px;">
            <el-button round icon="el-icon-circle-plus" type="primary" @click="dialogFormVisible = true">添加用户</el-button>
        </div>
        <div v-loading="loading2">
            <el-table :data="tableData.slice((currentPage4-1)*pagesize,currentPage4*pagesize)" style="width: 100%;border:1px solid #ebebeb;border-radius:3px;transition:.2s;">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="add_time" label="添加时间" sortable width="180">
                </el-table-column>
                <el-table-column prop="admin" label="账号" width="180">
                </el-table-column>
                <el-table-column prop="pwd" label="密码" width="180">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                        <el-button size="mini" type="success" @click="userroles(scope.row)">角色</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="padding:20px 0 20px 0;float:right;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
            </el-pagination>
        </div>
        <div>
            <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
                <el-form :model="form" :rules="rules" ref="form">
                    <el-form-item label="账号" :label-width="formLabelWidth" prop="admin">
                        <el-input v-model="form.admin" style="width:80%" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" :label-width="formLabelWidth" prop="pwd">
                        <el-input type="password" style="width:80%" v-model="form.pwd" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" :label-width="formLabelWidth" prop="rpwd">
                        <el-input type="password" style="width:80%" v-model="form.rpwd" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="resetForm('form')">取 消</el-button>
                    <el-button type="primary" @click.native.prevent="addusers('form')" :loading="logining">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div>
            <el-dialog title="编辑用户" :visible.sync="editdialogFormVisible">
                <el-form :model="form" :rules="rules" ref="form">
                    <el-form-item label="账号" :label-width="formLabelWidth" prop="admin">
                        <el-input v-model="form.admin" style="width:80%" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" :label-width="formLabelWidth" prop="pwd">
                        <el-input type="password" style="width:80%" v-model="form.pwd" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" :label-width="formLabelWidth" prop="rpwd">
                        <el-input type="password" style="width:80%" v-model="form.rpwd" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="resetForm('form')">取 消</el-button>
                    <el-button type="primary" @click.native.prevent="editusers('form')" :loading="logining">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div>
            <el-dialog title="角色" :visible.sync="userrole">
                <div>
                    <el-transfer filterable :filter-method="filterMethod" :titles="['总列表', '已拥有']" :props="{
              key: 'rid',
              label: 'names'
            }" @change="handleChange" filter-placeholder="请输入角色名称" v-model="value2" :data="data2">
                    </el-transfer>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="userrole = false">取 消</el-button>
                    <el-button type="primary" @click="adduserrole()" :loading="logining">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {
        axiosGet,
        axiosPost,
        showMsg,
        confirm
    } from '../common/common.js'
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if(value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if(this.form.rpwd !== '') {
                        this.$refs.form.validateField('rpwd');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if(value === '') {
                    callback(new Error('请再次输入密码'));
                } else if(value !== this.form.pwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                currentPage4: 1,
                pagesize: 10,
                logining: false,
                rightrid: [], //右侧公共角色rid
                uid: '', //右侧公共用户uid
                data2: [],
                value2: [],
                filterMethod(query, item) {
                    return item.names.indexOf(query) > -1;
                },
                loading2: false,
                formLabelWidth: '120px',
                dialogFormVisible: false,
                editdialogFormVisible: false,
                userrole: false,
                form: {
                    admin: '',
                    pwd: '',
                    rpwd: '',
                    uid: '',
                },
                rules: {
                    admin: [{
                            required: true,
                            message: '请输入账号',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 6,
                            message: '长度在 3 到 6 个字符',
                            trigger: 'blur'
                        }
                    ],
                    pwd: [{
                        required: true,
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    rpwd: [{
                        required: true,
                        validator: validatePass2,
                        trigger: 'blur'
                    }],
                },
                tableData: []
            }
        },
        created() {
            this.getuserlist();
            this.rolelist();
        },
        methods: {
            handleSizeChange(val) {
                this.pagesize = val;
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage4 = val;
                console.log(`当前页: ${val}`);
            },
            //添加用户对应的角色
            adduserrole() {
                this.logining = true;
                let data = {
                    uid: this.uid,
                    rid: this.rightrid,
                }
                axiosPost({
                    url: 'adduser_role',
                    data: data,
                    success: (response) => {
                        this.logining = false;
                        if(response.data.isok == 1) {
                            this.userrole = false;
                            showMsg('角色设置成功', 'success');
                        } else {
                            this.userrole = false;
                            showMsg('您没有修改角色', 'warning');
                        };
                    }
                });
            },
            //当角色左侧变化时
            handleChange(value, direction, movedKeys) {
                console.log(value, direction, movedKeys);
                this.rightrid = value;
            },
            //角色
            userroles(row) {
                this.userrole = true;
                this.uid = row.uid;
                axiosGet({
                    url: 'getuserrole?uid=' + row.uid,
                    success: (response) => {
                        //有则返回 无则返回空数组
                        if(response.data.list) {
                            this.value2 = response.data.list;
                        } else {
                            this.value2 = [];
                        };
                    }
                });
            },
            //获取角色列表
            rolelist() {
                axiosGet({
                    url: 'getrolelist',
                    success: (response) => {
                        if(response.data.list) {
                            this.data2 = response.data.list;
                        } else {
                            this.data2 = [];
                        };
                    }
                });
            },
            resetForm(form) {
                this.$refs[form].resetFields();
                this.form.admin = '';
                this.form.pwd = '';
                this.form.rpwd = '';
                this.form.uid = '';
                this.dialogFormVisible = false;
                this.editdialogFormVisible = false;
            },
            //添加用户
            addusers(form) {
                this.$refs[form].validate((valid) => {
                    if(valid) {
                        this.logining = true;
                        let data = {
                            admin: this.form.admin,
                            pwd: this.form.pwd,
                        }
                        axiosPost({
                            url: 'addusers',
                            data: data,
                            success: (response) => {
                                this.logining = false;
                                if(response.data.isok == 1) {
                                    this.getuserlist();
                                    this.resetForm(form);
                                    showMsg('添加成功', 'success');
                                } else if(response.data.isok == 2) {
                                    this.getuserlist();
                                    this.resetForm(form);
                                    showMsg('账号和密码已存在', 'warning');
                                } else {
                                    this.getuserlist();
                                    this.resetForm(form);
                                    showMsg('添加失败', 'error');
                                };
                            },
                            error: (error) => {
                                this.logining = false;
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //获取用户列表
            getuserlist() {
                this.loading2 = true;
                axiosGet({
                    url: 'getuserlist',
                    success: (response) => {
                        this.loading2 = false;
                        if(response.data.list) {
                            this.tableData = response.data.list;
                        } else {
                            this.tableData = [];
                        };
                    }
                });
            },
            handleEdit(row) {
                this.editdialogFormVisible = true;
                this.form.admin = row.admin;
                this.form.pwd = row.pwd;
                this.form.rpwd = row.pwd;
                this.form.uid = row.uid;
            },
            //删除角色
            handleDelete(row) {
                confirm('此操作将永久删除, 是否继续?', () => {
                    axiosGet({
                        url: 'deleteuser?uid=' + row.uid,
                        success: (response) => {
                            if(response.data.isok == 1) {
                                this.getuserlist();
                                showMsg('删除成功', 'success');
                            } else {
                                this.getuserlist();
                                showMsg('删除失败', 'error');
                            };
                        }
                    });
                })
            },
            //编辑角色
            editusers(form) {
                this.$refs[form].validate((valid) => {
                    if(valid) {
                        this.logining = true;
                        let data = {
                            admin: this.form.admin,
                            pwd: this.form.pwd,
                            uid: this.form.uid,
                        }
                        axiosPost({
                            url: 'edituser',
                            data: data,
                            success: (response) => {
                                this.logining = false;
                                if(response.data.isok == 1) {
                                    this.getuserlist();
                                    this.resetForm(form);
                                    showMsg('编辑成功', 'success');
                                } else {
                                    this.getuserlist();
                                    this.resetForm(form);
                                    showMsg('没有编辑新内容', 'warning');
                                };
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>