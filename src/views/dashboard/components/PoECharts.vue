<template>
    <div ref="chartContainer" class="PoE-chart-container"></div>
</template>

<script>
import axios from 'axios';
import * as echarts from 'echarts';

export default {
    name: 'PoECharts',
    props: {
        dataPath: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            myChart: null,
            chartTitle: "",
            seriesTail: "",
            data: []
        }
    },
    created() {
        window.addEventListener('resize', this.handleResize);
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
            if (this.myChart) {
                this.myChart.resize();
            }
        },
        parseData(rawData) {
            const XdataArray = rawData[0].split('\n').map(line => parseFloat(line));
            const YdataArray = rawData[1].split('\n');
            
            const totalRows = XdataArray.length;
            const data = [[],[],[]];
            for (let i = 0; i < totalRows; ++i) {
                const [col1, col2, col3] = YdataArray[i].split(' ');

                data[0].push([XdataArray[i], parseFloat(col1)]);
                data[1].push([XdataArray[i], parseFloat(col2)]);
                data[2].push([XdataArray[i], parseFloat(col3)]);
            }
            return data;
        },
        async loadData() {
            try {
                let pos = this.dataPath.lastIndexOf('/');
                let rootPath = this.dataPath.substring(0, pos+1);
                let filename = this.dataPath.substring(pos+1);
                if (filename === 'Frgl_B.txt') {
                    this.chartTitle = "Blade";
                    this.seriesTail = "B";
                } else if (filename === 'Frgl_N.txt') {
                    this.chartTitle = "Nacelle";
                    this.seriesTail = "N";
                } else if (filename === 'Frgl_S.txt') {
                    this.chartTitle = "Substructure";
                    this.seriesTail = "S";
                } else if (filename === 'Frgl_T.txt') {
                    this.chartTitle = "Tower";
                    this.seriesTail = "T";
                }
                let XDataPath = rootPath + "IM.txt";
                let YDataPath = this.dataPath;
                axios.all([
                    axios.get(XDataPath),
                    axios.get(YDataPath)
                ]).then(axios.spread((responseX, responseY) => {
                    const rawData = [responseX.data, responseY.data];
                    this.data = this.parseData(rawData);
                    this.setChart();
                }));
            } catch (error) {
                console.log('Failed to load data:', error);
            }
        },
        setChart() {
            const option = {
                grid: { show: false, top: 10 },
                title: {
                    text: this.chartTitle,
                    left: 'center',
                    top: -5,
                    textStyle: { fontSize: 8 },
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { animation: false }
                },
                legend: {
                    top: '20%',
                    left: '10%',
                    itemWidth: 20,
                    itemHeight: 10,
                    textStyle: { fontSize: 8 },
                    orient: 'vertical'
                },
                xAxis: {
                    type: 'value',
                    name: 'Wind Speed(m/s)',
                    nameLocation: 'center',
                    nameGap: 20,
                    nameTextStyle: { fontSize: 8 },
                    axisTick: { show: true, inside: true },
                    axisLabel: { fontSize: 8 },
                    splitLine: { show: false },
                    max: value => value.max + 0.5
                },
                yAxis: {
                    type: 'value',
                    name: 'Fragility',
                    nameLocation: 'center',
                    nameGap: 30,
                    nameTextStyle: { fontSize: 8 },
                    axisLabel: { fontSize: 8 },
                    axisTick: { show: true, inside: true },
                    splitLine: { show: false },
                    max: value => value.max + 0.05
                },
                series: [
                    { name: 'DS1-' + this.seriesTail, data: this.data[0], type: 'line', showSymbol: false },
                    { name: 'DS2-' + this.seriesTail, data: this.data[1], type: 'line', showSymbol: false },
                    { name: 'DS3-' + this.seriesTail, data: this.data[2], type: 'line', showSymbol: false },
                ]
            };

            if (!this.myChart) {
                this.myChart = echarts.init(this.$refs.chartContainer);
            }
            this.myChart.clear();
            this.myChart.setOption(option);
        },
        resize() {
            if (this.myChart) {
                this.myChart.resize();
            }
        }
    },
    mounted() {
        this.loadData();
    }
};
</script>

<style>
.PoE-chart-container {
    width: 100%;
    height: 100%;
}
</style>
