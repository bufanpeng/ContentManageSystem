<template>
    <div>
        <div style="padding-bottom:15px;">
            <el-button round icon="el-icon-circle-plus" type="primary" @click="addroles">添加角色</el-button>
        </div>
        <div>
            <el-table v-loading="loading2" :data="tableData.slice((currentPage4-1)*pagesize,currentPage4*pagesize)" style="width: 100%;border:1px solid #ebebeb;border-radius:3px;transition:.2s;">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="dates" label="添加时间" sortable width="180">
                </el-table-column>
                <el-table-column prop="names" label="角色名称" width="180">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                        <el-button size="mini" type="success" @click="handleauth(scope.row)">权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="padding:20px 0 20px 0;float:right;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
            </el-pagination>
        </div>
        <div>
            <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
                <el-form :model="form" :rules="rules" ref="form">
                    <el-form-item label="角色名称" :label-width="formLabelWidth" prop="names">
                        <el-input v-model="form.names" style="width:80%" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click.native.prevent="addrole('form')" :loading="logining">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div>
            <el-dialog title="编辑角色" :visible.sync="editdialogFormVisible">
                <el-form :model="form" :rules="rules" ref="form">
                    <el-form-item label="角色名称" :label-width="formLabelWidth" prop="names">
                        <el-input v-model="form.names" style="width:80%" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editdialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click.native.prevent="editrole('form')" :loading="logining">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div>
            <el-dialog title="权限" :close-on-click-modal='false' :show-close='true' :close-on-press-escape='false' :visible.sync="authdialogFormVisible">
                <el-tree :data="data2" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps">
                </el-tree>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="guanbi()">取 消</el-button>
                    <el-button type="primary" @click="addrole_auth" :loading="logining">保 存</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {axiosGet, axiosPost, showMsg, confirm} from '../common/common.js'
    import {mapState, mapMutations} from 'vuex'
    export default {
        data() {
            return {
                currentPage4: 1,
                pagesize: 10,
                loading2: false,
                logining: false,
                tableData: [],
                dialogFormVisible: false,
                editdialogFormVisible: false,
                authdialogFormVisible: false,
                form: {
                    names: '',
                    rid: '',
                },
                rules: {
                    names: [{
                            required: true,
                            message: '请输入角色名称',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 6,
                            message: '长度在 3 到 6 个字符',
                            trigger: 'blur'
                        }
                    ],
                },
                formLabelWidth: '120px',
                data2: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                rid: '',
            }
        },
        created() {
            this.getrolelist(),
                this.getnavlist()
        },
        methods: {
            ...mapMutations([
                'NAVLIST',
            ]),
            handleSizeChange(val) {
                this.pagesize = val;
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage4 = val;
                console.log(`当前页: ${val}`);
            },
            //关闭权限弹窗并清空权限
            guanbi() {
                this.$nextTick(() => {
                    this.$refs.tree.setCheckedKeys([]);
                });
                this.authdialogFormVisible = false;
            },
            addrole_auth() {
                var datas = this.$refs.tree.getCheckedNodes();
                var arr = [];
                for(var i = this.$refs.tree.getCheckedNodes().length - 1; i >= 0; i--) {
                    var id = datas[i]['id'];
                    var isid = arr.indexOf(id);
                    if(isid == -1) {
                        arr.push(id);
                    };
                    var pid = parseInt(datas[i]['pid']);
                    var ispid = arr.indexOf(pid);
                    if(ispid == -1 && pid != 0) {
                        arr.push(pid);
                    };
                };
                this.logining = true;
                axiosPost({
                    url: 'addrole_auth',
                    data: {
                        rid: this.rid,
                        aid: arr, //真正左侧菜单数组
                        showaid: this.$refs.tree.getCheckedKeys(), //只为了展示看
                    },
                    success: (response) => {
                        this.logining = false;
                        if(response.data.isok == 1) {
                            this.authdialogFormVisible = false;
                            showMsg('权限设置成功', 'success');
                        } else {
                            this.authdialogFormVisible = false;
                            showMsg('您没有修改权限!', 'warning');
                        };
                    }
                });
            },
            handleEdit(row) {
                console.log(row);
                this.editdialogFormVisible = true;
                this.form.names = row.names;
                this.form.rid = row.rid;
            },
            handleauth(row) {
                this.rid = row.rid;
                this.authdialogFormVisible = true;
                axiosGet({
                    url: 'getauthlist?rid=' + row.rid,
                    success: (response) => {
                        this.$nextTick(() => {
                            this.$refs.tree.setCheckedKeys(response.data.list);
                        });
                    }
                });
            },
            addroles() {
                this.dialogFormVisible = true;
                this.form.names = '';
            },
            handleDelete(row) {
                confirm('此操作将永久删除, 是否继续?', () => {
                    axiosGet({
                        url: 'deleterole?rid=' + row.rid,
                        success: (response) => {
                            if(response.data.isok == 1) {
                                this.getrolelist();
                                showMsg('删除成功!', 'success');
                            } else {
                                this.getrolelist();
                                showMsg('删除失败!', 'error');
                            };
                        }
                    });
                });
            },
            //添加角色
            addrole(form) {
                this.$refs[form].validate((valid) => {
                    if(valid) {
                        this.logining = true;
                        axiosPost({
                            url: 'addrole',
                            data: {names: this.form.names},
                            success: (response) => {
                                this.logining = false;
                                if(response.data.isok == 1) {
                                    this.dialogFormVisible = false;
                                    this.getrolelist();
                                    this.form.names = "";
                                    showMsg('添加成功!', 'success');
                                } else {
                                    this.dialogFormVisible = false;
                                    this.getrolelist()
                                    this.form.names = "";
                                    showMsg('添加失败!', 'error');
                                };
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //编辑角色
            editrole(form) {
                this.$refs[form].validate((valid) => {
                    if(valid) {
                        this.logining = true;
                        axiosPost({
                            url: 'editrole',
                            data: {
                                names: this.form.names,
                                rid: this.form.rid,
                            },
                            success: (response) => {
                                this.logining = false;
                                if(response.data.isok == 1) {
                                    this.editdialogFormVisible = false;
                                    this.getrolelist();
                                    this.form.names = "";
                                    this.form.rid = "";
                                    showMsg('编辑成功!', 'success');
                                } else {
                                    this.editdialogFormVisible = false;
                                    this.getrolelist()
                                    this.form.names = "";
                                    this.form.rid = "";
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
            //获取角色列表
            getrolelist() {
                this.loading2 = true;
                axiosGet({
                    url: 'getrolelist',
                    success: (response) => {
                        if(response.data.list) {
                            this.tableData = response.data.list;
                        } else {
                            this.tableData = [];
                        };
                        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                            this.loading2 = false;
                        });
                    }
                });
            },
            //获取左侧菜单列表
            getnavlist() {
                var isnavlist = this.navlist;
                console.log(this.navlist)
                if(isnavlist.length > 0) {
                    this.data2 = JSON.parse(isnavlist); 
                } else {
                    axiosGet({
                        url: 'getnav',
                        success: (response) => {
                            this.data2 = response.data.navlist;
                            this.NAVLIST(JSON.stringify(response.data.navlist));
                        }
                    });
                };
            },
        },
        computed: {
            ...mapState([
                'navlist',
            ])
        }
    }
</script>

<style scoped>

</style>