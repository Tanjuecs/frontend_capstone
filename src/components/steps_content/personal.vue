<template>
    <div>
        <el-card shadow="always" style="margin-top: 20px;">
                        <div class="row">
                        <div class="col-sm">
                            <label>Firstname (required)</label>
                            <el-input
                            placeholder="Please input firstname"
                            v-model="personal_task.firstname"
                            clearable>
                            </el-input>
                        </div>
                        <div class="col-sm">
                            <label>Lastname (required)</label>
                            <el-input
                            placeholder="Please input lastname"
                            v-model="personal_task.lastname"
                            clearable>
                            </el-input>
                            
                        </div>
                        
                    </div>
                   
                    </el-card>
    </div>
</template>

<script>
export default {
   props: {
       personal_task: Object,
       
   },
}
</script>