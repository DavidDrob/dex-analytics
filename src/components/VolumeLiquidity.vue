<template>
  <div class="w-11/12 m-auto">
    <div class="flex justify-between flex-wrap">
      <div class="w-4/12 bg-white border-2 rounded-2xl p-6 mt-6">
        <p class="font-light text-gray-600">Volumes, Liquidity, Swaps</p>
        <ul class="flex flex-wrap">
          <li class="w-1/2 h-40 flex justify-center items-center flex-col">
            <p class="font-light text-3xl">-</p>
            <p class="font-semibold">Active Pools</p>
          </li>
          <li class="w-1/2 h-40 flex justify-center items-center flex-col">
            <p class="font-light text-3xl">-</p>
            <p class="font-semibold">Total Value Locked (TVL)</p>
          </li>
          <li class="w-1/2 h-40 flex justify-center items-center flex-col">
            <p class="font-light text-3xl">
              {{ liquidity_24h }}
            </p>
            <p class="font-semibold">Liquidity (24h)</p>
          </li>
          <li class="w-1/2 h-40 flex justify-center items-center flex-col">
            <p class="font-light text-3xl">
              {{ total_swaps_24h }}
            </p>
            <p class="font-semibold">24h Swaps</p>
          </li>
          <li class="w-1/2 h-40 flex justify-center items-center flex-col">
            <p class="font-light text-3xl">-</p>
            <p class="font-semibold">Most traded token (24h)</p>
          </li>
          <li class="w-1/2 h-40 flex justify-center items-center flex-col">
            <p class="font-light text-3xl">-</p>
            <p class="font-semibold">Total Fees (24h)</p>
          </li>
        </ul>
      </div>
      <div
        class="
          w-7/12
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
// import Area from "./Area.vue";
import Chart from "./Chart.vue";

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
          this.coins_length = data.data.items.length;
        });
    },
    getPools() {
      fetch(
        `https://api.covalenthq.com/v1/${this.chainId}/xy=k/diffusion/pools/?page-size=99999&key=${this.API_KEY}`,
        config
      )
        .then((response) => response.json())
        .then((data) => {
          this.pools_length = data.data.items.length;
        });
    },
  },
  created() {
    this.getVolumeAndSwapCount();
    this.getCoins();
    this.getPools();
  },
  watch: {
    chainId(newValue, oldValue) {
      if (newValue != oldValue) {
        this.getVolumeAndSwapCount();
        this.getCoins();
        this.getPools();
      }
    },
  },
};
</script>
