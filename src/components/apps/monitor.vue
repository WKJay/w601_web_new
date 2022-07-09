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
      <div class="dataTable">
        <b-overlay :show="recordLoading" rounded="sm">
          <b-card style="margin-top:20px;">
            <b-card-title>
              <b-row>
                <b-col md="6">
                  <span>数据记录</span>
                </b-col>
                <b-col md="6">
                  <div style="text-align:right;">
                    <b-button variant="outline-info" @click="recordRefresh" :disabled="recordLoading" :size="smallScreen?'sm':''">
                      <b-icon-arrow-counterclockwise></b-icon-arrow-counterclockwise>
                    </b-button>
                    &nbsp;
                    <b-button variant="outline-secondary" @click="recordPrev" :disabled="recordLoading" :size="smallScreen?'sm':''">
                      <b-icon-caret-left></b-icon-caret-left>
                    </b-button>
                    &nbsp;
                    <b-button variant="outline-secondary" @click="recordNext" :disabled="recordLoading||isLastRecord" :size="smallScreen?'sm':''">
                      <b-icon-caret-right></b-icon-caret-right>
                    </b-button>
                  </div>
                </b-col>
              </b-row>
            </b-card-title>
            <b-card-sub-title>
              <span>
                {{recordDateStr}}
                {{recordHasData?'':'无数据'}}
              </span>
            </b-card-sub-title>
            <div style="height:400px">
              <v-chart :options="options_5" class="card-chart" autoresize />
            </div>
          </b-card>
        </b-overlay>
      </div>
    </b-col>
  </div>
</template>

<script>
//记录周期（秒）
const RECORD_INTERVAL_SECONDS = 60 * 10 + 5;

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/axis'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/axisPointer'
import 'echarts/lib/chart/bar'
import csv from 'jquery-csv/src/jquery.csv.min.js'
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
          data: [],
          show: false
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
          smooth: true,
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
          data: [],
          show: false
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
          data: [],
          show: false
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
          data: [],
          show: false
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
      options_5: {
        grid: {
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        legend: {},
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: []
        },
        yAxis: [{
          type: 'value',
          name: '温度',
          axisLabel: {
            formatter: '{value} °C',
          }
        }, {
          type: 'value',
          name: '湿度',
          axisLabel: {
            formatter: '{value} %'
          }
        }, {
          type: 'value',
          name: '光照',
          position: 'right',
          offset: 50,
          axisLabel: {
            formatter: '{value} Lux'
          }
        }],
        series: [{
          name: '温度',
          data: [],
          type: 'line',
          symbol: 'none',
          areaStyle: {
            color: 'rgba(102,102,153,.3)'
          },
          color: '#666699',
          smooth: true,
        }, {
          name: '湿度',
          data: [],
          yAxisIndex: 1,
          symbol: 'none',
          type: 'line',
          color: '#660000',
          lineStyle: {
            type: 'dotted'
          },
          smooth: true,
        }, {
          name: '光照强度',
          data: [],
          yAxisIndex: 2,
          type: 'bar',
          color: 'rgba(153,102,102,.5)',

        }]
      },
      tempTimer: null,
      curTemp: 0,
      curHumi: 0,
      curMem: 0,
      curLight: 0,
      maxMem: 0,
      recordYear: 0,
      recordMonth: 0,
      recordDate: 0,
      lastRecordts: 0, //最后一次记录的时标
      recordUpdateCnt: 0, //记录连续获取次数
      recordHasData: false,
      recordLoading: true,
    }
  },
  methods: {
    timeShow(time) {
      return time < 10 ? ('0' + time) : time;
    },
    initDate() {
      let cur_date = new Date();
      this.recordYear = cur_date.getFullYear();
      this.recordMonth = cur_date.getMonth() + 1;
      this.recordDate = cur_date.getDate();
    },
    getScreenSize() {
      if (this.smallScreen) {
        this.options_5.yAxis[2].axisLabel.show = false;
      }
    },
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
          this.options_1.xAxis.data.push(Date().toString().substr(16, 8));

          this.options_2.series[0].data.push(data.data.humi);
          this.options_2.xAxis.data.push(Date().toString().substr(16, 8));

          this.options_3.series[0].data.push(data.data.used_mem);
          this.options_3.xAxis.data.push(Date().toString().substr(16, 8));

          this.options_4.series[0].data.push(data.data.light);
          this.options_4.xAxis.data.push(Date().toString().substr(16, 8));
        } else {
          this.options_1.series[0].data.shift();
          this.options_1.xAxis.data.shift();

          this.options_2.series[0].data.shift();
          this.options_2.xAxis.data.shift();

          this.options_3.series[0].data.shift();
          this.options_3.xAxis.data.shift();

          this.options_4.series[0].data.shift();
          this.options_4.xAxis.data.shift();

          this.options_1.series[0].data.push(data.data.temp);
          this.options_1.xAxis.data.push(Date().toString().substr(16, 8));

          this.options_2.series[0].data.push(data.data.humi);
          this.options_2.xAxis.data.push(Date().toString().substr(16, 8));

          this.options_3.series[0].data.push(data.data.used_mem);
          this.options_3.xAxis.data.push(Date().toString().substr(16, 8));

          this.options_4.series[0].data.push(data.data.light);
          this.options_4.xAxis.data.push(Date().toString().substr(16, 8));
        }
        this.checkRecordUpdate(data.data.ts)
      }).catch(() => { });
    },
    getSavedData() {
      let url =
        `/data/${this.recordYear}/${this.recordMonth}/${this.recordDate}.csv`;
      this.axios({
        method: 'get',
        url,
        timeout: 10000,
        headers: {
          'Cache-Control': 'no-cache'
        }
      }).then((data) => {
        let jsonObj = csv.toObjects(data.data);
        this.options_5.series[0].data = [];
        this.options_5.series[1].data = [];
        this.options_5.series[2].data = [];
        this.options_5.xAxis.data = [];
        this.recordHasData = true;
        for (let item in jsonObj) {
          let itemTime = new Date(parseInt(jsonObj[item].time) * 1000);
          let itemTimeStr = `${this.timeShow(itemTime.getUTCHours())}:${this.timeShow(itemTime.getUTCMinutes())}`;

          this.options_5.series[0].data.push(jsonObj[item].temp);
          this.options_5.series[1].data.push(jsonObj[item].humi);
          this.options_5.series[2].data.push(jsonObj[item].light);
          this.options_5.xAxis.data.push(itemTimeStr);
          this.lastRecordts = jsonObj[item].time;
        }

        this.recordLoading = false;
      }).catch(() => {
        this.options_5.series[0].data = [0];
        this.options_5.series[1].data = [0];
        this.options_5.series[2].data = [0];
        this.options_5.xAxis.data = [0];
        this.recordHasData = false;
        this.recordLoading = false;
      })

    },
    recordPrev() {
      if (this.recordDate > 1) {
        this.recordDate--;
      } else {
        if (this.recordMonth > 1) {
          this.recordMonth--;
          this.recordDate = new Date(this.recordYear, this.recordMonth, 0).getDate();
        } else {
          if (this.recordYear > 1900) {
            this.recordYear--;
            this.recordMonth = 12;
            this.recordDate = new Date(this.recordYear, this.recordMonth, 0).getDate();
          }
        }
      }
      this.recordLoading = true;
      this.getSavedData();
    },
    recordNext() {
      let maxDate = new Date(this.recordYear, this.recordMonth, 0).getDate();
      if (this.recordDate < maxDate) {
        this.recordDate++;
      } else {
        if (this.recordMonth < 12) {
          this.recordMonth++;
          this.recordDate = 1;
        } else {
          this.recordYear++;
          this.recordMonth = 1;
          this.recordDate = 1;
        }
      }
      this.recordLoading = true;
      this.getSavedData();
    },
    checkRecordUpdate(ts) {
      let cur_date = new Date(ts * 1000).getUTCDate();
      if (cur_date == this.recordDate) {
        if ((ts - this.lastRecordts) > RECORD_INTERVAL_SECONDS * (1 + this.recordUpdateCnt)) {
          this.recordUpdateCnt++;
          this.getSavedData();
        } else {
          if ((ts - this.lastRecordts) < RECORD_INTERVAL_SECONDS) {
            this.recordUpdateCnt = 0;
          }
        }
      }
    },
    recordRefresh() {
      this.recordLoading = true;
      this.getSavedData();
    }
  },
  computed: {
    tempData() {
      return `${this.curTemp} ℃`;
    },
    humiData() {
      return `${this.curHumi} %`;
    },
    usedMem() {
      return `${this.curMem} B`;
    },
    lightData() {
      return `${this.curLight} Lux`;
    },
    recordDateStr() {
      return `${this.recordYear}/${this.recordMonth}/${this.recordDate}`;
    },
    smallScreen() {
      return document.body.clientWidth < 800 ? true : false;
    },
    isLastRecord() {
      let current_date = new Date().getDate();
      return (current_date == this.recordDate);
    }
  },
  created() {
    this.initDate();
    this.getScreenSize();
    this.getSavedData();
    this.tempTimer = window.setInterval(this.getAhtData, 1100);
  },
  destroyed() {
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

.dataTable > .b-overlay-wrap > .card > .card-body > .card-title {
  color: #3c4b64;
}

.dataTable > .b-overlay-wrap > .card > .card-body > .text-muted {
  color: #979fad !important;
}

.card-chart {
  width: 100%;
  height: 100%;
}

.card {
  box-shadow: 0 1px 1px 0 rgba(60, 75, 100, 0.14),
    0 2px 1px -1px rgba(60, 75, 100, 0.12), 0 1px 3px 0 rgba(60, 75, 100, 0.2);
  margin-top: 10px;
}

button:disabled:hover {
  cursor: not-allowed;
}
</style>