<template>
    <div>
        <div style="width:487px; float:left;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="">
                    <el-date-picker v-model="value7" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" :picker-options="pickerOptions2">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="onSubmit" icon="el-icon-search">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div style="width:230px;float:left; padding-right:30px;">
            <el-input placeholder="请输入学生姓名" v-model="input5" class="input-with-select">
                <el-button slot="append" :loading="stunamelogining" @click="onSubmitstuname" icon="el-icon-search"></el-button>
            </el-input>
        </div>

        <div style="float:right;">
            <el-button type="primary" @click="dialogFormVisible = true" icon="el-icon-circle-plus-outline">添加学生档案</el-button>
        </div>

        <div v-loading="loading2">
            <el-table height="500" style="width: 100%;border:1px solid #ebebeb;border-radius:3px;transition:.2s;" :data="tableData3.slice((currentPage4-1)*pagesize,currentPage4*pagesize)" @selection-change="handleSelectionChange" ref="multipleTable">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="一寸照片" width="120">
                    <template slot-scope="scope">
                        <img style="width:58px; height:58px;" :src="scope.row.stupic" alt>
                    </template>
                </el-table-column>
                <el-table-column prop="joindate" label="入学时间" width="120">
                </el-table-column>
                <el-table-column prop="stuname" label="学生姓名" width="120">
                </el-table-column>
                <el-table-column prop="stuschool" label="学校" width="120">
                </el-table-column>
                <el-table-column prop="stuclass" label="年级" width="120">
                </el-table-column>
                <el-table-column prop="parname" label="家长姓名" width="120">
                </el-table-column>
                <el-table-column prop="parphone" label="家长手机" width="120">
                </el-table-column>
                <el-table-column label="是否缴费" width="120">
                    <template slot-scope="scope">
                        <el-switch active-value="1" inactive-value="0" v-model="scope.row.ispay" disabled>
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row.stuid)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="padding:20px 0 20px 0">
                <el-button @click="pidelete">批量删除</el-button>
                <el-button @click="toggleSelection()">取消选择</el-button>
                <div style="float:right;">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData3.length">
                    </el-pagination>
                </div>
            </div>
        </div>

        <div>
            <el-dialog :fullscreen="false" title="学生档案" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" :visible.sync="dialogFormVisible">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="学生姓名" prop="stuname">
                        <el-input v-model="ruleForm.stuname"></el-input>
                    </el-form-item>
                    <el-form-item label="学生一寸照" prop="stupic">
                        <el-upload :file-list="fileList2" :limit="1" :on-exceed="handleExceed" name="image" action="http://myadmin.tjbolaimei.com/index.php/upload" list-type="picture-card" :on-success="successhand" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :modal="false" :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt>
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="学校" prop="stuschool">
                        <el-input v-model="ruleForm.stuschool"></el-input>
                    </el-form-item>
                    <el-form-item label="年级" prop="stuclass">
                        <el-select v-model="ruleForm.stuclass" placeholder="请选择年级">
                            <el-option label="一年级" value="一年级"></el-option>
                            <el-option label="二年级" value="二年级"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="班级" prop="stugrade">
                        <el-input v-model="ruleForm.stugrade"></el-input>
                    </el-form-item>
                    <el-form-item label="学生性别" prop="stusex">
                        <el-radio-group v-model="ruleForm.stusex">
                            <el-radio label="男" value="男"></el-radio>
                            <el-radio label="女" value="女"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="是否缴费" prop="ispay">
                        <el-switch active-value="1" inactive-value="0" v-model="ruleForm.ispay"></el-switch>
                    </el-form-item>
                    <el-form-item label="入学时间">
                        <el-col :span="11">
                            <el-form-item prop="joindate">
                                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="joindate" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-form-item prop="jointime">
                                <el-time-picker value-format="HH:mm:ss" type="fixed-time" placeholder="选择时间" v-model="jointime" style="width: 100%;"></el-time-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="家长姓名" prop="parname">
                        <el-input v-model="ruleForm.parname"></el-input>
                    </el-form-item>
                    <el-form-item label="家长手机" prop="parphone">
                        <el-input v-model="ruleForm.parphone"></el-input>
                    </el-form-item>
                    <el-form-item label="家长微信" prop="parwechat">
                        <el-input v-model="ruleForm.parwechat"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" v-model="ruleForm.remark"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :loading="logining" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">关闭</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import {axiosGet, axiosPost, showMsg, confirm} from '../common/common.js'
    export default {
        data() {
            return {
                fileList2: [],
                stunamelogining: false,
                //分页
                currentPage4: 1,
                pagesize: 10,
                loading2: false,
                logining: false,
                dialogImageUrl: '',
                dialogVisible: false,
                dialogFormVisible: false,
                joindate: '',
                jointime: '',
                ruleForm: {
                    stuid: '',
                    stuname: '',
                    stuschool: '',
                    stuclass: '',
                    stugrade: '',
                    stusex: '',
                    ispay: 0,
                    parname: '',
                    parphone: '',
                    parwechat: '',
                    remark: '',
                },
                rules: {
                    stuname: [{
                            required: true,
                            message: '请输入学生姓名',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 5,
                            message: '长度在 3 到 5 个字符',
                            trigger: 'blur'
                        }
                    ],
                    parname: [{
                            required: true,
                            message: '请输入家长姓名',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 5,
                            message: '长度在 3 到 5 个字符',
                            trigger: 'blur'
                        }
                    ],
                    parphone: [{
                            required: true,
                            message: '请输入家长手机',
                            trigger: 'blur'
                        },
                        {
                            pattern: /^1[34578]\d{9}$/,
                            message: '目前只支持中国大陆的手机号码'
                        }
                    ],
                    stuclass: [{
                        required: true,
                        message: '请选择年级',
                        trigger: 'change'
                    }],
                },
                input5: '',
                formInline: {
                    region: ''
                },
                activeName: 'first',
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value7: '',
                tableData3: [],
                multipleSelection: []
            };
        },
        created() {
            this.getstulist()
        },
        methods: {
            //编辑学生档案
            handleEdit(row) {
                this.ruleForm.stuid = row.stuid;
                this.ruleForm.stuname = row.stuname;
                this.ruleForm.stuschool = row.stuschool;
                this.ruleForm.stuclass = row.stuclass;
                this.ruleForm.stugrade = row.stugrade;
                this.ruleForm.stusex = row.stusex;
                this.ruleForm.parname = row.parname;
                this.ruleForm.parphone = row.parphone;
                this.ruleForm.parwechat = row.parwechat;
                this.ruleForm.remark = row.remark;
                this.ruleForm.ispay = row.ispay;
                if(row.stupic) {
                    //有图片则渲染 handlePictureCardPreview也需要改成相应的url
                    this.fileList2 = [{
                        url: row.stupic
                    }];
                };
                this.joindate = row.joindate;
                this.jointime = row.jointime;
                this.dialogImageUrl = row.stupic;
                this.dialogFormVisible = true;
                console.log(row);
            },
            //单个删除数据
            handleDelete(stuid) {
                confirm('此操作将永久删除, 是否继续?', () => {
                    axiosPost({
                        url: 'deletestu',
                        data: {stuid: stuid},
                        success: (response) => {
                            this.getstulist();
                            response.data.isok == 1 ? showMsg('删除成功', 'success') : showMsg('删除失败', 'error');
                            // if(response.data.isok == 1) {
                            //     this.getstulist();
                            //     showMsg('删除成功', 'success');
                            // } else {
                            //     this.getstulist();
                            //     showMsg('删除失败', 'error');
                            // };
                        }
                    });
                });
            },
            //批量删除
            pidelete() {
                let studl = this.multipleSelection.length;
                if(studl) {
                    confirm('已选择' + studl + '条数据, 此操作将永久删除, 是否继续?', () => {
                        axiosPost({
                            url: 'deletestu',
                            data: {stuid: this.multipleSelection},
                            success: (response) => {
                                if(response.data.isok == 1) {
                                    this.getstulist();
                                    showMsg('删除成功', 'success');
                                } else {
                                    this.getstulist();
                                    showMsg('删除失败', 'error');
                                };
                            }
                        });
                    });
                } else {
                    showMsg('还没有选择数据', 'warning');
                };
            },
            //取消选择
            toggleSelection(rows) {
                this.$refs.multipleTable.clearSelection();
            },
            //选中的存入变量
            handleSelectionChange(val) {
                this.multipleSelection = val.map(_ => _.stuid);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            successhand(response, file, fileList) {
                //this.$refs.upload.clearFiles();
                console.log(456);
                console.log(file);
                if(file.status = "success") {
                    this.dialogImageUrl = "http://myadmin.tjbolaimei.com/uploads/" + file.response;
                };
            },
            handleRemove(file, fileList) {
                this.dialogImageUrl = '';
            },
            //当有上传列表时有用  点击图片上加号 查看的函数
            handlePictureCardPreview(file) {
                console.log(123);
                console.log(file);
                if(file.status = "success") {
                    this.dialogImageUrl = file.url;
                    this.dialogVisible = true;
                };
            },
            //获取学生列表
            getstulist() {
                this.loading2 = true;
                axiosGet({
                    url: 'getstulist',
                    success: (response) => {
                        this.tableData3 = response.data.list;
                        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                            this.loading2 = false;
                        });
                    }
                });
            },
            //添加学生信息
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid) {
                        this.logining = true;
                        axiosPost({
                            url: 'addstu',
                            data: {
                                ruleForm: this.ruleForm,
                                stupic: this.dialogImageUrl,
                                joindate: this.joindate,
                                jointime: this.jointime,
                            },
                            success: (response) => {
                                if(response.data.isok == 1) {
                                    this.getstulist();
                                    this.ruleForm = {};
                                    this.fileList2 = [];
                                    this.joindate = '';
                                    this.jointime = '';
                                    this.dialogImageUrl = '';
                                    this.logining = false;
                                    this.dialogFormVisible = false;
                                    showMsg('恭喜您, 操作成功', 'success');
                                } else {
                                    this.logining = false;
                                    showMsg('没有修改内容', 'warning');
                                }
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(ruleForm) {
                console.log(ruleForm);
                this.$refs[ruleForm].resetFields();
                this.ruleForm = {};
                this.fileList2 = [];
                this.joindate = '';
                this.jointime = '';
                this.dialogImageUrl = '';
                this.dialogFormVisible = false;
            },
            //根据时间段查找列表
            onSubmit() {
                if(this.value7) {
                    axiosPost({
                        url: 'selectdate',
                        data: {datebt: this.value7},
                        success: (response) => {
                            this.input5 = '';
                            this.tableData3 = response.data.list;
                            showMsg('查询成功，共查到' + this.tableData3.length + '条数据', 'success');
                        }
                    });
                } else {
                    this.input5 = '';
                    showMsg('还没有选择日期', 'warning');
                };
            },
            //根据学生姓名查找
            onSubmitstuname() {
                this.stunamelogining = true;
                if(this.input5) {
                    axiosPost({
                        url: 'selectstuname',
                        data: {stuname: this.input5},
                        success: (response) => {
                            this.stunamelogining = false;
                            this.value7 = '';
                            this.tableData3 = response.data.list;
                            showMsg('查询成功，共查到' + this.tableData3.length + '条数据', 'success');
                        }
                    });
                } else {
                    this.stunamelogining = false;
                    this.value7 = '';
                    showMsg('还没有输入学生姓名', 'warning');
                };
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },

        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>