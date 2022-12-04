<template>
  <div class="w-full grid place-items-center" v-if="!data?.length">
    <div class="spinner"></div>
  </div>
  <!-- TODO: Calculate height by screen size -->
  <apexchart
    type="area"
    height="500"
    width="100%"
    :options="options"
    :series="options.series"
    v-else
  >
  </apexchart>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      options: {
        series: [
          {
            name: "Volume",
            data: [],
          },
          {
            name: "Swap Count",
            data: [],
          },
        ],
        chart: {
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        yaxis: [
          {
            seriesName: "Volume",
            labels: {
              style: {
                colors: "#A1A5AB",
              },
              formatter: function (value) {
                return value.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                });
              },
            },
          },
          {
            opposite: true,
            seriesName: "Swap Count",
            labels: {
              style: {
                colors: "#A1A5AB",
              },
            },
          },
        ],
        xaxis: {
          labels: {
            formatter: function (timestamp) {
              if (timestamp !== undefined) {
                let dt = new Date(timestamp).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });
                let day = dt.split(" ")[1].replace(",", "");
                return day % 2 == 1 ? dt : "";
                // TODO: fix this
              }
              return "";
            },
            style: {
              colors: "#A1A5AB",
            },
          },
        },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
        colors: ["#076BD9", "#BF0DC3"],
        legend: {
          labels: {
            colors: "#A1A5AB",
          },
        },
        responsive: [
          {
            breakpoint: 450,
            options: {
              yaxis: [
                {
                  show: false,
                },
                {
                  show: false,
                },
              ],
            },
          },
        ],
      },
    };
  },
  methods: {
    updateOptions() {
      this.options.series[0].data = [];
      this.options.series[1].data = [];
      this.data.forEach((element) => {
        this.options.series[0].data.push([
          Date.parse(element.dt),
          element.volume_quote,
        ]);
        this.options.series[1].data.push([
          Date.parse(element.dt),
          element.swap_count_24,
        ]);
      });
    },
  },
};
</script>

<style>
/* .apexcharts-toolbar {
  display: none;
} */
</style>