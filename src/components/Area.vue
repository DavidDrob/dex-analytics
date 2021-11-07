<template>
  <apexchart
    type="area"
    height="350"
    width="100%"
    :options="data.chartOptions"
    :series="data.series"
  >
  </apexchart>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      data: {
        series: [
          {
            data: [
              [1327359600000, 30.95],
              [1327446000000, 31.34],
              [1327532400000, 31.18],
              [1327618800000, 31.05],
              [1327878000000, 31.0],
              [1327964400000, 30.95],
              [1328050800000, 31.24],
              [1328137200000, 31.29],
            ],
          },
        ],
        chartOptions: {
          chart: {
            id: "area-datetime",
            type: "area",
            height: 350,
            zoom: {
              autoScaleYaxis: true,
            },
          },
          annotations: {
            yaxis: [
              {
                y: 30,
                borderColor: "#999",
                label: {
                  show: true,
                  text: "Support",
                  style: {
                    color: "#fff",
                    background: "#00E396",
                  },
                },
              },
            ],
            xaxis: [
              {
                x: new Date("14 Nov 2012").getTime(),
                borderColor: "#999",
                yAxisIndex: 0,
                label: {
                  show: true,
                  text: "Rally",
                  style: {
                    color: "#fff",
                    background: "#775DD0",
                  },
                },
              },
            ],
          },
          dataLabels: {
            enabled: false,
          },
          markers: {
            size: 0,
            style: "hollow",
          },
          xaxis: {
            type: "datetime",
            min: new Date("01 Mar 2012").getTime(),
            tickAmount: 6,
          },
          tooltip: {
            x: {
              format: "dd MMM yyyy",
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 100],
            },
          },
        },

        selection: "one_year",
      },
      methods: {
        updateData: function (timeline) {
          this.selection = timeline;

          switch (timeline) {
            case "one_month":
              this.$refs.chart.zoomX(
                new Date("28 Jan 2013").getTime(),
                new Date("27 Feb 2013").getTime()
              );
              break;
            case "six_months":
              this.$refs.chart.zoomX(
                new Date("27 Sep 2012").getTime(),
                new Date("27 Feb 2013").getTime()
              );
              break;
            case "one_year":
              this.$refs.chart.zoomX(
                new Date("27 Feb 2012").getTime(),
                new Date("27 Feb 2013").getTime()
              );
              break;
            case "ytd":
              this.$refs.chart.zoomX(
                new Date("01 Jan 2013").getTime(),
                new Date("27 Feb 2013").getTime()
              );
              break;
            case "all":
              this.$refs.chart.zoomX(
                new Date("23 Jan 2012").getTime(),
                new Date("27 Feb 2013").getTime()
              );
              break;
            default:
          }
        },
      },
    };
  },
  methods: {
    testMethod() {
      var chart = new ApexCharts(
        document.querySelector("#chart"),
        this.options
      );

      chart.render();
    },
  },
  mounted() {
    this.testMethod();
  },
};
</script>
