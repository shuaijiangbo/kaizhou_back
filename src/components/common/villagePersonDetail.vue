<template>
    <div>
        <div class="dz-expert-box">
            <el-table
                  ref="multipleTable"
                  :data="info"
                  tooltip-effect="dark"
                  style="width: 100%;"
                  border
                  v-loading="listLoading">
                <el-table-column
                      type="index"
                      width="40">
                </el-table-column>
                <el-table-column
                      label="人员照片">
                    <template slot-scope="scope">
                            <span v-if="scope.row.headPortraitUrl!=null&&scope.row.headPortraitUrl!=''">
                                <img :src="scope.row.headPortraitUrl" alt="" style="width: 50px;">
                            </span>
                        <span v-else>
                                <img src="@/assets/img/headimg.png" alt="" style="width: 50px">
                            </span>
                    </template>
                </el-table-column>
                <el-table-column
                      prop="userName"
                      label="人员名称">
                </el-table-column>
                <el-table-column
                      prop="userRoleName"
                      label="人员类型">
                </el-table-column>
                <el-table-column
                      label="联系电话"
                      prop="tel">
                </el-table-column>
                <el-table-column
                      label="所属区域"
                      prop="areaName">
                </el-table-column>
                <!--<el-table-column-->
                      <!--prop="telInstancy"-->
                      <!--label="紧急联系方式">-->
                <!--</el-table-column>-->
            </el-table>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import bus from '../common/bus';
    import {get, post} from '@/api/fetch.js';
    import url from '@/api/serviceAPI.config.js';
    export default {
        props: ['id','type'],
        data() {
            return {
                info:null,
                listLoading:false
            };
        },
        created(){
        },
        computed: {

        },
        mounted(){
            if(this.type=='village') {
                this.getInfo()
            }else{
                this.getNum()
            }
        },
        methods: {
            getInfo(){
                get(url.task.villageTeam,{villageId:this.id} ).then((res) => {
                    this.info=res.data;
                })
            },
            getNum(){
                get(url.task.areaNum+this.id).then((res) => {
                    this.info=res;
                })
            }
        },
    };
</script>
<style scoped>
    .dz-expert-box{
        padding: 20px;
    }
</style>
