<template>
  <div class="w-11/12 m-auto">
    <div class="flex flex-col md:flex-row justify-between flex-wrap">
      <div class="w-full md:w-4/12 bg-white border-2 rounded-2xl p-6 mt-6">
        <p class="font-light text-gray-600">Volumes, Liquidity, Swaps</p>
        <div class="w-full h-full grid place-items-center" v-if="loading">
          <div class="spinner"></div>
        </div>
        <div v-else>
          <ul
            class="flex flex-col items-center text-center md:flex-row flex-wrap"
          >
            <li class="w-1/2 h-40 flex justify-center items-center flex-col">
              <p class="font-semibold text-3xl">{{ pools_length }}</p>
              <p class="font-light">Active Pools (7d)</p>
            </li>
            <li class="w-1/2 h-40 flex justify-center items-center flex-col">
              <p class="font-semibold text-3xl">{{ TVL }}</p>
              <div class="tooltip font-light text-center">
                <p class="flex">
                  TVL
                  <img
                    class="pl-1 pb-3 w-5"
                    src="../assets/help-circle.svg"
                    alt="tooltip"
                  />
                </p>
                <span class="tooltiptext"
                  >Total Value Locked excluding governance tokens</span
                >
              </div>
            </li>
            <li class="w-1/2 h-40 flex justify-center items-center flex-col">
              <p class="font-semibold text-3xl">
                {{ liquidity_24h }}
              </p>
              <p class="font-light">Liquidity (24h)</p>
            </li>
            <li class="w-1/2 h-40 flex justify-center items-center flex-col">
              <p class="font-semibold text-3xl">{{ fees_24h }}</p>
              <p class="font-light">Total Fees (24h)</p>
            </li>
            <li class="w-1/2 h-40 flex justify-center items-center flex-col">
              <p class="font-semibold text-3xl">{{ most_traded }}</p>
              <p class="font-light">Most traded token (24h)</p>
            </li>
            <li class="w-1/2 h-40 flex justify-center items-center flex-col">
              <p class="font-semibold text-3xl">
                {{ total_swaps_24h }}
              </p>
              <p class="font-light">24h Swaps</p>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="
          w-full
          md:w-7/12
          flex flex-col
          justify-center
          bg-white
          border-2
          rounded-2xl
          p-6
          mt-6
        "
      >
        <Chart :data="volumes_30d" ref="child" />
      </div>
    </div>
  </div>
</template>

<script>
import config from "../assets/config";
import Chart from "./Chart.vue";
import { useDataStore } from "../stores/useDataStore";

export default {
  name: "VolumeLiquidity",
  components: {
    // Area,
    Chart,
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
  data() {
    return {
      volumes_30d: undefined,
      volume_24h: undefined,
      liquidity_24h: undefined,
      fees_24h: null,
      coins: [],
      coins_length: null,
      pools_length: null,
      total_swaps_24h: null,
      TVL: 0,
      most_traded: 0,
      API_KEY: "ckey_ba34fd216fce4a408160dfc598c",
      useData: useDataStore(),
      loading: true,
    };
  },
  methods: {
    getVolumeAndSwapCount() {
      fetch(
        `https://api.covalenthq.com/v1/${this.chainId}/xy=k/diffusion/ecosystem/?key=${this.API_KEY}`,
        config
      )
        .then((response) => response.json())
        .then((data) => {
          this.useData.volume_30d = data.data.items[0].volume_chart_30d;

          this.pools_length = data.data.items[0].total_active_pairs_7d;
          this.volumes_30d = data.data.items[0].volume_chart_30d;
          this.volume_24h = this.volumes_30d[0].volume_quote.toLocaleString(
            "en-US",
            {
              style: "currency",
              currency: "USD",
            }
          );
          this.fees_24h = data.data.items[0].total_fees_24h.toLocaleString(
            "en-US",
            {
              style: "currency",
              currency: "USD",
            }
          );
          this.liquidity_24h =
            data.data.items[0].liquidity_chart_7d[0].liquidity_quote.toLocaleString(
              "en-US",
              {
                style: "currency",
                currency: "USD",
              }
            );
          this.total_swaps_24h = data.data.items[0].total_swaps_24h;
        })
        .then(() => {
          this.$refs.child.updateOptions();
        });
    },
    getCoins() {
      fetch(
        `https://api.covalenthq.com/v1/${this.chainId}/xy=k/diffusion/tokens/?page-size=99999&key=${this.API_KEY}`,
        config
      )
        .then((response) => response.json())
        .then((data) => {
          let sum = 0;
          let highestVolume = data.data.items[0];

          this.coins_length = data.data.items.length;
          data.data.items.forEach((token) => {
            sum += token.total_liquidity_quote;
            if (
              token.total_volume_24h_quote >
              highestVolume.total_volume_24h_quote
            )
              highestVolume = token;
          });
          this.TVL = sum.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          });
          this.most_traded = highestVolume.contract_name;
          this.loading = false;
        });
    },
  },
  created() {
    this.getVolumeAndSwapCount();
    this.getCoins();
  },
};
</script>

<style scoped>
.tooltip {
  position: relative;
  display: inline-block;
}
/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  background-color: #555;
  color: #fff;
  text-align: center;
  width: 300px;
  padding: 5px 20px;
  border-radius: 6px;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 0%;
  left: 125%;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}

/* Tooltip arrow */
.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
