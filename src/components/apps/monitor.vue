<template>
  <div>
    <b-col>
      <b-row>
        <b-col md="3">
          <b-card :title="tempData" sub-title="当前温度" class="wCard1">
            <div class="card-content">
              <v-chart :options="options_1" class="card-chart" autoresize />
            </div>
          </b-card>
        </b-col>
        <b-col md="3">
          <b-card :title="humiData" sub-title="当前湿度" class="wCard2">
            <div class="card-content">
              <v-chart :options="options_2" class="card-chart" autoresize />
            </div>
          </b-card>
        </b-col>
        <b-col md="3">
          <b-card :title="usedMem" sub-title="使用内存" class="wCard3">
            <div class="card-content">
              <v-chart :options="options_3" class="card-chart" autoresize />
            </div>
          </b-card>
        </b-col>
        <b-col md="3">
          <b-card :title="lightData" sub-title="光照强度" class="wCard4">
            <div class="card-content">
              <v-chart :options="options_4" class="card-chart" autoresize />
            </div>
          </b-card>
        </b-col>
      </b-row>
      <b-card style="margin-top:20px">

      </b-card>

    </b-col>
  </div>
</template>

<script>
  import ECharts from 'vue-echarts'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/chart/pie'

  export default {
    components: {
      'v-chart': ECharts
    },
    data() {
      return {
        options_1: {
          xAxis: {
            type: 'category',
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            data: []
          },
          yAxis: {
            type: 'value',
            show: false,
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            scale: true
          },
          series: [{
            data: [],
            type: 'line',
            smooth: true
          }],
          color: "#ced2d8",
          tooltip: {
            trigger: 'item'
          },
        },
        options_2: {
          xAxis: {
            type: 'category',
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            data: []
          },
          yAxis: {
            type: 'value',
            show: false,
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            scale: true
          },
          series: [{
            data: [],
            type: 'line',
            smooth: true
          }],
          color: "rgba(221, 214, 214, 0.637)",
          tooltip: {
            trigger: 'item'
          },
        },
        options_3: {
          xAxis: {
            type: 'category',
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            boundaryGap: false,
            data: []
          },
          yAxis: {
            type: 'value',
            show: false,
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
          },
          series: [{
            data: [],
            type: 'line',
            smooth: true,
          }],
          color: "rgba(221, 214, 214, 0.637)",
          tooltip: {
            trigger: 'item'
          },
        },
        options_4: {
          xAxis: {
            type: 'category',
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            boundaryGap: false,
            data: []
          },
          yAxis: {
            type: 'value',
            show: false,
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
          },
          series: [{
            data: [],
            type: 'line',
            smooth: true,
          }],
          color: "rgba(221, 214, 214, 0.637)",
          tooltip: {
            trigger: 'item'
          },
        },
        tempTimer: null,
        curTemp: 0,
        curHumi: 0,
        curMem: 0,
        curLight: 0,
        maxMem: 0,
      }
    },
    methods: {
      getAhtData() {
        this.axios({
          method: 'get',
          url: '/cgi-bin/get_info',
          timeout: 1000,
        }).then((data) => {
          this.curTemp = data.data.temp;
          this.curHumi = data.data.humi;
          this.curMem = data.data.used_mem;
          this.curLight = data.data.light;
          if (this.options_1.series[0].data.length < 10) {
            this.options_1.series[0].data.push(data.data.temp);
            this.options_2.series[0].data.push(data.data.humi);
            this.options_3.series[0].data.push(data.data.used_mem);
            this.options_4.series[0].data.push(data.data.light);
          } else {
            this.options_1.series[0].data.shift();
            this.options_2.series[0].data.shift();
            this.options_3.series[0].data.shift();
            this.options_4.series[0].data.shift();
            this.options_1.series[0].data.push(data.data.temp);
            this.options_2.series[0].data.push(data.data.humi);
            this.options_3.series[0].data.push(data.data.used_mem);
            this.options_4.series[0].data.push(data.data.light);
          }
        }).catch(() => {});
      }
    },
    computed: {
      tempData() {
        return `${this.curTemp} ℃`;
      },
      humiData() {
        return `${this.curHumi} ℃`;
      },
      usedMem() {
        return `${this.curMem} B`;
      },
      lightData() {
        return `${this.curLight} Lux`;
      }
    },
    created() {
      console.log('create');

      this.tempTimer = window.setInterval(this.getAhtData, 1100);
    },
    destroyed() {
      console.log('des');

      window.clearInterval(this.tempTimer);
    }
  }
</script>

<style scoped>
  .wCard1 {
    background: linear-gradient(45deg, #321fdb 0%, #1f1498 100%);

  }

  .wCard2 {
    background: linear-gradient(45deg, #39f 0%, #2982cc 100%);
  }

  .wCard3 {
    background: linear-gradient(45deg, #f9b115 0%, #f6960b 100%);
  }

  .wCard4 {
    background: linear-gradient(45deg, #e55353 0%, #d93737 100%);
  }

  .card-content {
    height: 70px;
  }

  .card-title {
    color: white;
  }

  .text-muted {
    color: white !important;
  }

  .card-chart {
    width: 100%;
    height: 100%;
  }

  .card {
    box-shadow: 0 1px 1px 0 rgba(60, 75, 100, .14), 0 2px 1px -1px rgba(60, 75, 100, .12), 0 1px 3px 0 rgba(60, 75, 100, .2);
    margin-top: 10px;
  }
</style>