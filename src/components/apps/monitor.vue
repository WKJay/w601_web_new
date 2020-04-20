<template>
  <div>
    <v-chart :options="options_1" />
  </div>
</template>

<script>
  import ECharts from 'vue-echarts'
  import 'echarts/lib/chart/line'

  export default {
    components: {
      'v-chart': ECharts
    },
    data() {
      return {
        options_1: {
          xAxis: {
            type: 'category',
            data: []
          },
          yAxis: {
            type: 'value',
            scale:true
          },
          series: [{
            data: [],
            type: 'line',
            smooth: true
          }]
        },
        tempTimer: null,
      }
    },
    methods: {
      getAhtData() {
        this.axios({
          method: 'get',
          url: '/cgi-bin/get_aht_data',
          timeout: 700,
        }).then((data) => {
          let date = new Date();          
          if (this.options_1.series[0].data.length < 20) {
            this.options_1.series[0].data.push(data.data.temp);
            this.options_1.xAxis.data.push(date.getMinutes()+':'+date.getSeconds());
          }else{
            this.options_1.series[0].data.shift(data.data.temp);
             this.options_1.xAxis.data.shift(date.getMinutes()+':'+date.getSeconds());
          }
        })

      }
    },
    created() {
      console.log('create');
      
      this.tempTimer = window.setInterval(this.getAhtData, 1000);
    },
    destroyed() {
      console.log('des');
      
      window.clearInterval(this.tempTimer);
    }
  }
</script>

<style scoped>
  .echarts {
    width: 100%;
  }
</style>