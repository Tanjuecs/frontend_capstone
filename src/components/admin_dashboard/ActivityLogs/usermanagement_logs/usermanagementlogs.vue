<template>
    <div>
        <table class="table table-hover table-bordered">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Activity Message</th>
      <th scope="col">Status</th>
      <th scope="col">Created At</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in listoflogs" :key="item.id">
      <th scope="row">{{item.activityCode}}</th>
      <td>{{item.activitymessage}}</td>
      <td><el-tag type="success" size="small" effect="dark">{{item.activtystatus}}</el-tag></td>
      <td>{{item.createdAt | moment("calendar")}}</td>
      <td>
          <el-button type="danger" size="small" plain style="width: 100%;">Remove</el-button>
      </td>
    </tr>
  </tbody>
</table>
    </div>
</template>

<script>
export default {
    props: {
        listoflogs: Array
    }
}
</script>