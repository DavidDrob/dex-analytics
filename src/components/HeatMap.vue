<template>
  <div class="flex flex-wrap w-11/12">
    <div class="bg-white border-2 rounded-2xl p-6 mt-6 w-full">
      <p class="font-light text-gray-600">
        Average Volume on certain weekdays (last 30 days)
      </p>
      <div class="w-full h-full grid place-items-center" v-if="loading">
        <div class="spinner"></div>
      </div>
      <apexchart
        style="height: 165px"
        type="heatmap"
        height="150"
        width="100%"
        :options="options"
        :series="options.series"
        v-else
      >
      </apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import { useDataStore } from "../stores/useDataStore";
import { storeToRefs } from "pinia";

export default {
  name: "HeatMap",
  components: {
    apexchart: VueApexCharts,
  },
  setup() {
    const useData = useDataStore();
    const { volume_30d } = storeToRefs(useData);
    return { volume_30d };
  },
  data() {
    return {
      loading: true,
      options: {
        theme: {
          monochrome: {
            enabled: true,
            color: "#9925be",
            shadeTo: "light",
            shadeIntensity: 0.65,
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (value) {
            return value.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            });
          },
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return value.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              });
            },
          },
        },
        plotOptions: {
          heatmap: {
            formatter: function (value) {
              return value.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              });
            },
          },
        },
        series: [
          {
            name: "Volume",
            data: [
              {
                x: "MO",
                y: 0,
              },
              {
                x: "TU",
                y: 0,
              },
              {
                x: "WE",
                y: 0,
              },
              {
                x: "TH",
                y: 0,
              },
              {
                x: "FR",
                y: 0,
              },
              {
                x: "SA",
                y: 0,
              },
              {
                x: "SU",
                y: 0,
              },
            ],
          },
        ],
      },
    };
  },
  watch: {
    // TODO: adjust colors
    volume_30d(newValue, oldValue) {
      let dayRegistry = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
      };

      newValue.forEach((day) => {
        const dayOfWeek = new Date(day.dt).getDay();
        dayRegistry[dayOfWeek].push(day.volume_quote);
      });

      // take average of every day
      for (const property in dayRegistry) {
        let sum = 0;
        dayRegistry[property].forEach((item) => {
          sum += item;
        });
        this.options.series[0].data[property].y = sum;
      }

      this.loading = false;
    },
  },
};
//TODO: possibly add gas to heatmap
</script>

<style lang="scss" scoped>
</style>