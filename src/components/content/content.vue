 <template>
  <el-carousel :interval="4000" type="card" height="400px">
    <el-carousel-item v-for="item in 4" :key="item">
      <h3 class="medium">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
</template>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 400px;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    margin: 0;
  }
  .el-carousel__item:nth-child{
    height: 100vh;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    opacity: 0.7;
  }

  .el-carousel__item:nth-child(1n) {
    background-image: url(../../assets/1.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }
  .el-carousel__item:nth-child(2n) {
    background-image: url(../../assets/2.png);
    background-repeat: no-repeat;
  }
  .el-carousel__item:nth-child(3n) {
    background-image: url(../../assets/3.png);
    background-repeat: no-repeat;
  }
  .el-carousel__item:nth-child(4n) {
    background-image: url(../../assets/4.png);
    background-repeat: no-repeat;
  }

</style>

