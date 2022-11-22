<template>
  <div class="flex flex-wrap w-full">
    <div class="bg-white border-2 rounded-2xl p-6 mt-6 w-full">
      <p class="font-light text-gray-600">
        Volume on certain weekdays (last 7 days)
      </p>
      <apexchart
        type="heatmap"
        height="200"
        width="100%"
        :options="options"
        :series="options.series"
      >
      </apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "HeatMap",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      options: {
        series: [
          {
            name: "Volume",
            data: [
              {
                x: "MO",
                y: 22,
              },
              {
                x: "TU",
                y: 29,
              },
              {
                x: "WE",
                y: 13,
              },
              {
                x: "TH",
                y: 32,
              },
              {
                x: "FR",
                y: 32,
              },
              {
                x: "SA",
                y: 32,
              },
              {
                x: "SU",
                y: 32,
              },
            ],
          },
        ],
      },
    };
  },
};
//TODO: possibly add gas to heatmap
</script>

<style lang="scss" scoped>
</style>