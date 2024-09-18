<template>
    <div ref="chartContainer" class="Vnbl-chart-container"></div>
</template>

<script>
import axios from 'axios'
import * as echarts from 'echarts'

export default {
    name: 'VnblChart',
    props: {
        dataPath: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            myChart: null,
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
            const data = [[],[],[],[]];
            const totalRows = XdataArray.length;
            for (let i = 0; i < 4; ++i) {
                const YdataArray = rawData[i+1].split('\n').map(line => parseFloat(line));
                for (let j = 0; j < totalRows; ++j) {
                    data[i].push([XdataArray[j], YdataArray[j]]);
                }
            }
            return data;
        },
        async loadData() {
            try {
                let dataPathX = this.dataPath + "IM.txt";
                let dataPathYB = this.dataPath + "Vnbl_B.txt";
                let dataPathYN = this.dataPath + "Vnbl_N.txt";
                let dataPathYS = this.dataPath + "Vnbl_S.txt";
                let dataPathYT = this.dataPath + "Vnbl_T.txt";
                let [responseX, responseYB, responseYN, responseYS, responseYT] = await Promise.all([
                    axios.get(dataPathX),
                    axios.get(dataPathYB),
                    axios.get(dataPathYN),
                    axios.get(dataPathYS),
                    axios.get(dataPathYT)
                ]);

                let rawData = [responseX.data, responseYN.data, responseYB.data, responseYS.data, responseYT.data];
                this.data = this.parseData(rawData);
                this.setChart();
            } catch (error) {
                console.log('Failed to load data:', error);
            }
        },
        setChart() {
            const option = {
                grid: {
                    show: false,
                    top: 10,
                    borderColor: '#000',
                    borderWidth: 1
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                legend: {
                    top: '20%',
                    left: '10%',
                    itemWidth: 20,
                    itemHeight: 10,
                    textStyle: {
                        fontSize: 8
                    },
                    orient: 'vertical'
                },
                xAxis: {
                    type: 'value',
                    name: 'Wind Speed(m/s)',
                    nameLocation: 'center',
                    nameGap: 30,
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: true,
                        inside: true
                    },
                    max: 25.5
                },
                yAxis: {
                    type: 'value',
                    name: 'Fragility',
                    nameLocation: 'center',
                    nameGap: 30,
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: true,
                        inside: true
                    },
                    max: 1.05
                },
                series: [
                    {
                        name: 'Blade',
                        data: this.data[0],
                        type: 'line',
                        showSymbol: false,
                    },
                    {
                        name: 'Nacelle',
                        data: this.data[1],
                        type: 'line',
                        showSymbol: false,
                    },
                    {
                        name: 'Substructure',
                        data: this.data[2],
                        type: 'line',
                        showSymbol: false,
                    },
                    {
                        name: 'Tower',
                        data: this.data[3],
                        type: 'line',
                        showSymbol: false,
                    },
                ]
            };

            if (!this.myChart) {
                this.myChart = echarts.init(this.$refs.chartContainer);
            }
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
.Vnbl-chart-container {
    width: 100%;
    height: 100%;
}
</style>
