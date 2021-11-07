<template>
  <div class="w-11/12 mt-10 m-auto">
    <div class="flex justify-between flex-wrap">
      <div class="w-full bg-white border-2 rounded-2xl p-6 mt-6">
        <p class="font-light text-gray-600">Most used Pools in last 24h</p>
        <div class="flex my-4 text-lg font-semibold justify-between">
          <div class="flex items-center">
            <p class="mr-4">#</p>
            <div>
              <p class="mr-4 flex">Pool Tokens</p>
            </div>
          </div>
          <div class="flex items-center justify-end w-4/6 text-right">
            <p class="w-2/12">Swaps (24h)</p>
            <p class="w-4/12">Volumes (24h)</p>
            <p class="w-4/12">Quote Rate</p>
          </div>
        </div>
        <div v-if="!pools" class="flex justify-center">
          <div
            style="border-top-color: transparent"
            class="
              w-16
              h-16
              border-4 border-blue-400 border-solid
              rounded-full
              animate-spin
            "
          ></div>
        </div>
        <div v-if="pools">
          <ul v-for="(pool, index) in pools" :key="index" class="text-bg-light">
            <div
              class="
                flex
                mb-2
                justify-between
                border-gray-400 border-solid
                pt-1
              "
              style="border-top-width: 1px"
            >
              <div class="flex items-center">
                <li class="mr-4">{{ index + 1 }}</li>
                <div>
                  <div class="flex">
                    <li class="mr-2">{{ pool.symbol_0 }}</li>
                    ⇋
                    <li class="ml-2">{{ pool.symbol_1 }}</li>
                  </div>
                  <li class="font-light text-xs">{{ pool.address }}</li>
                </div>
              </div>
              <div class="flex items-center justify-end w-4/6 text-right">
                <li class="w-1/12">
                  {{ pool.swaps }}
                </li>
                <li class="w-4/12">
                  {{
                    pool.volume.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                  }}
                </li>
                <li class="w-4/12">
                  {{
                    pool.quote_rate.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                  }}
                </li>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from "../assets/config";

export default {
  name: "Pools",
  data() {
    return {
      pools: [],
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
    getPools() {
      fetch(
        `https://api.covalenthq.com/v1/${this.chainId}/xy=k/sushiswap/pools/?key=${this.API_KEY}`,
        config
      )
        .then((response) => response.json())
        .then((data) => {
          data.data.items.forEach((element) => {
            const item = {
              address: element.exchange,
              swaps: element.swap_count_24h,
              volume: element.volume_24h_quote,
              quote_rate: element.quote_rate,
              symbol_0: element.token_0.contract_ticker_symbol,
              symbol_1: element.token_1.contract_ticker_symbol,
            };
            this.pools.push(item);
          });
          this.pools.sort((a, b) => {
            if (a.swaps > b.swaps) return -1;
            if (a.swaps < b.swaps) return 1;
            return 0;
          });
        });
    },
  },
  mounted() {
    this.getPools();
  },
  watch: {
    chainId(newValue, oldValue) {
      if (newValue != oldValue) {
        this.pools = [];
        this.getPools();
      }
    },
  },
};
</script>