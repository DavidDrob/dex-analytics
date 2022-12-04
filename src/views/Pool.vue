<template>
  <div class="w-11/12 m-auto">
    <p class="w-11/12 text-3xl text-main font-semibold text-green-600 py-4">
      {{ name ? name : "Pools" }}
    </p>
    <div
      class="w-full grid place-items-center"
      style="height: 165px"
      v-if="loading"
    >
      <div class="spinner"></div>
    </div>
    <div v-else>
      <main
        class="bg-white border-2 rounded-2xl p-6 md:mt-6 w-full h-full py-6"
      >
        <p class="font-semibold text-xl ml-2">
          {{ name }}
        </p>
        <section
          class="flex flex-col md:flex-row justify-around flex-wrap mt-4"
        >
          <div class="text-center flex flex-col text-xl mb-8">
            <span class="font-semibold"> {{ liquidity }} </span>
            <span class="font-light">Total Liquidity</span>
          </div>
          <div class="text-center flex flex-col text-xl mb-8">
            <span class="font-semibold"> {{ volume_24h_quote }} </span>
            <span class="font-light">Volume (24h)</span>
          </div>
          <div class="text-center flex flex-col text-xl mb-8">
            <span class="font-semibold"> {{ fees_24h_quote }} </span>
            <span class="font-light">Fees (24h)</span>
          </div>
          <div class="text-center flex flex-col text-xl mb-8">
            <span class="font-semibold">
              {{ (annual_fees * 10).toFixed(4) }}%
            </span>
            <span class="font-light">Annualized fees</span>
          </div>
          <div class="text-center flex flex-col text-xl mb-8">
            <span class="font-semibold">
              ${{ token_one.price.toFixed(2) }}
            </span>
            <span class="font-light">{{ token_one.name }} Price</span>
          </div>
          <div class="text-center flex flex-col text-xl">
            <span class="font-semibold">
              ${{ token_two.price.toFixed(2) }}
            </span>
            <span class="font-light">{{ token_two.name }} Price</span>
          </div>
        </section>
      </main>
      <div class="w-full flex flex-col md:flex-row justify-between mt-12">
        <div
          class="
            w-full
            md:w-5/12
            flex flex-col
            justify-center
            bg-white
            border-2
            rounded-2xl
            p-6
          "
        >
          <apexchart
            type="area"
            height="500"
            width="100%"
            :options="liquidityOptions"
            :series="liquidityOptions.series"
          >
          </apexchart>
        </div>
        <div
          class="
            w-full
            md:w-5/12
            flex flex-col
            justify-center
            bg-white
            border-2
            rounded-2xl
            p-6
            mt-12
            md:mt-0
          "
        >
          <apexchart
            type="area"
            height="500"
            width="100%"
            :options="volumeOptions"
            :series="volumeOptions.series"
          >
          </apexchart>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import config from "../assets/config";
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "Pool",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      name: "",
      liquidity: 0,
      volume_24h_quote: 0,
      fees_24h_quote: 0,
      annual_fees: 0,
      reserve: [],
      token_one: {},
      token_two: {},
      loading: true,
      liquidityOptions: {
        series: [
          {
            name: "Liquidity",
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
            seriesName: "Liquidity",
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
        colors: ["#076BD9"],
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
      volumeOptions: {
        series: [
          {
            name: "Volume",
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
        colors: ["#34d399"],
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
  props: {
    chainId: {
      type: Number,
      default: 1,
    },
    API_KEY: {
      type: String,
    },
  },
  methods: {
    getPool(address) {
      fetch(
        `https://api.covalenthq.com/v1/${this.chainId}/xy=k/diffusion/pools/address/${address}/?key=${this.API_KEY}`,
        config
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data.items[0]);

          this.name =
            data.data.items[0].token_0.contract_ticker_symbol +
            "-" +
            data.data.items[0].token_1.contract_ticker_symbol;
          this.liquidity =
            data.data.items[0].total_liquidity_quote.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            });
          this.volume_24h_quote =
            data.data.items[0].volume_24h_quote.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            });
          this.fees_24h_quote = data.data.items[0].fee_24h_quote.toLocaleString(
            "en-US",
            {
              style: "currency",
              currency: "USD",
            }
          );
          this.annual_fees = data.data.items[0].annualized_fee;

          this.token_one = {
            name: data.data.items[0].token_0.contract_name,
            price: data.data.items[0].token_0.quote_rate,
          };
          this.token_two = {
            name: data.data.items[0].token_1.contract_name,
            price: data.data.items[0].token_1.quote_rate,
          };

          data.data.items[0].liquidity_timeseries_30d.forEach((element) => {
            this.liquidityOptions.series[0].data.push([
              Date.parse(element.dt),
              element.liquidity_quote,
            ]);
          });

          data.data.items[0].volume_timeseries_30d.forEach((element) => {
            this.volumeOptions.series[0].data.push([
              Date.parse(element.dt),
              element.volume_quote,
            ]);
          });

          this.loading = false;
        });
    },
  },
  mounted() {
    this.getPool(this.$route.params.address);
  },
};
</script>