<template>
    <div>
        <el-input
                                    style="margin-bottom: 5px; width: 30%;"
                                    placeholder="Search"
                                    v-model="searchable"
                                    clearable>
                                    </el-input>
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Message</th>
                <th scope="col">Status</th>
                <th scope="col">Created At</th>
                <th scope="col">Handle</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in pagedTableData" :key="item.id">
                <th scope="row">{{item.activityCode}}</th>
                <td>{{item.activitymessage}}</td>
                <td>
                    <el-tag type="success" size="small">{{item.activtystatus}}</el-tag>
                </td>
                <td>{{item.createdAt | moment('calendar')}}</td>
                <td>
                    <el-button type="danger" plain size="small" @click="removelogs(item.id)">Remove</el-button>
                </td>
                </tr>
            </tbody>
            </table>
            <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="this.dataforprods.length" @current-change="setPage">
                                    </el-pagination>
    </div>
</template>

<script>
export default {
    props: {
        dataforprods: Array,
        removelogs: Function
    },
    data(){
        return{
            pageSize: 5,
              page: 1,
              searchable:''
        }
    },
    computed:{
    pagedTableData() {
       if(this.searchable){
      return this.dataforprods.filter((item)=>{
        return this.searchable.toLowerCase().split(' ').every(v => item.activityCode.toString().toLowerCase().includes(v))
      })
      }else{
        return this.dataforprods.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }

     }
    },
    methods: {
        setPage(val){
        this.page = val
      },
    }
}
</script>