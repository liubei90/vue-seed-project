<template>
  <div ref="chart" class="markline-chart"></div>
</template>

<script>
import * as echarts from 'echarts/src/echarts';
import 'echarts/src/chart/line';
import 'echarts/src/chart/bar';
import 'echarts/src/component/markLine';

export default {
  data() {
    return {
      instance: null,
    };
  },
  mounted() {
    this.init();
    this.drawChart();
  },
  beforeDestory() {
    if (this.instance) {
      this.instance.dispose();
      this.instance = null;
    }
  },
  methods: {
    init() {
      this.instance = echarts.init(this.$refs['chart']);
    },
    drawChart() {
      this.instance.clear();
      this.instance.setOption({
        animation: false,
        xAxis: {
          axisLine: {
            show: false,
          },
          type: 'category',
          data: ['2016', '2017', '2018'],
        },
        yAxis: [
          {
            axisLine: {
              show: false,
            },
            type: 'value',
          },
          {
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            type: 'value',
            min: 0,
            max: 100,
          }
        ],
        series: [
          {
            type: 'line',
            data: [100, 120, 164],
            // markLine: this.getNormalMarkLine(),
            // markLine: this.getMyyMarkLine(),
            markLine: this.getMarkLine3(),
          },
          {
            type: 'line',
            yAxisIndex: 1,
            data: [26, 55, 12],
            markLine: this.getMarkLine4(),
          }
        ]
      });

      console.log(this.instance.getOption());
    },
    getNormalMarkLine() {
      return {
        symbol: 'none',
        data: [
          [
            { name: '平均值', x: 0, y: 0, }, // 起点的坐标（相对于容器）
            { name: '平均值', x: 100, y: 100,} // 终点
          ],
          [
            { name: '均值', coord: ['2016', 129] }, // 起点对应的值（数组第一个对应x轴，第二个对应y轴）
            { name: '均值', coord: ['2018', 129] }, // 终点对应的值（数组第一个对应x轴，第二个对应y轴）
          ],
          // { name: '均值', coord: 129 },
        ]
      }
    },
    getMyyMarkLine() {
      return {
        symbol: 'none',
        data: [
          [
            { type: 'avavava', name: '均值', value: 129, coord: [0, 129] },
            { type: 'avavava', name: '均值', value: 129, coord: [2, 129] },
          ]
        ]
      }
    },
    getMarkLine3() {
      return {
        symbol: 'none',
        label: {
          position: 'start',
          formatter: '均值{c}',
        },
        data: [
          // {type: 'average'},
          { yAxis: 129 }
        ]
      }
    },
    getMarkLine4() {
      return {
        symbol: 'none',
        label: {
          position: 'end',
          formatter: '率均值{c}%',
        },
        data: [
          { yAxis: 80 },
        ]
      };
    }
  },
}
</script>

<style lang="scss">
.markline-chart {
  width: 100%;
  height: 400px;
}
</style>