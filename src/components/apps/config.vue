<template>
  <div class="info">
    <b-card no-body class="overflow-hidden">
      <b-row no-gutters>
        <b-col md="9">
          <b-card-img :src="img" alt="Image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="3">
          <b-card-body title="环境监测系统">
            <b-card-text>
              <br /><br />
              基于W601的环境监测系统<br /><br />
              <span>
                <b-icon-brightness-high-fill></b-icon-brightness-high-fill> 环境监测
              </span>
              <br />
              <span>
                <b-icon-clipboard-data></b-icon-clipboard-data> 实时数据
              </span>
              <br />
              <span>
                <b-icon-file-post></b-icon-file-post> 数据存储
              </span>
              <br />
              <span>
                <b-icon-graph-up></b-icon-graph-up> 历史图表
              </span>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        img: require('@/assets/imgs/W601.jpg'),
      }
    }
  }
</script>

<style scoped>
.card-text{
  color: rgb(68, 66, 66);
}

.info{
  margin: 0 auto;
  width: 70%;
  text-align: center;
}

@media screen and (max-width: 1000px) {
  .info{
    width: 90%;
  }
}
</style>