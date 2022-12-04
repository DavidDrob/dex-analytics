<template>
  <div class="w-11/12 m-auto">
    <p class="w-11/12 text-3xl text-main font-semibold text-green-600 py-4">
      Pools
    </p>
    <div class="flex justify-between flex-wrap">
      <div class="w-full bg-white border-2 rounded-2xl p-6 mt-6">
        <p class="font-light text-gray-600">Top pairs by liquidity</p>
        <div class="flex my-4 text-lg font-semibold justify-between">
          <div class="flex items-center">
            <p class="mr-4">#</p>
            <div>
              <p class="mr-4 flex">Pool</p>
            </div>
          </div>
          <div class="flex items-center justify-end w-4/6 text-right">
            <p class="w-3/12">Liquidity</p>
            <p class="w-4/12">Volume (24h)</p>
            <p class="w-4/12">Fees (24h)</p>
            <p class="w-3/12">Fees (Annualized)</p>
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
              <div class="flex items-center font-semibold">
                <li class="mr-4">{{ index + 1 }}</li>
                <div>
                  <div class="flex">
                    <li class="mr-2">{{ pool.symbol_0 }}</li>
                    ⇋
                    <li class="ml-2">{{ pool.symbol_1 }}</li>
                  </div>
                  <li class="font-light text-xs text-blue-500 underline">
                    <router-link :to="`/pools/${pool.address}`">
                      {{ pool.address }}
                    </router-link>
                  </li>
                </div>
              </div>
              <div class="flex items-center justify-end w-4/6 text-right">
                <li class="w-3/12">
                  {{ pool.liquidity }}
                </li>
                <li class="w-4/12">
                  {{ pool.volume }}
                </li>
                <li class="w-4/12">
                  {{ pool.fees }}
                </li>
                <li class="w-3/12">
                  {{ (pool.annual_fees * 10).toFixed(2) }}%
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
        `https://api.covalenthq.com/v1/${this.chainId}/xy=k/diffusion/pools/?key=${this.API_KEY}`,
        config
      )
        .then((response) => response.json())
        .then((data) => {
          data.data.items.forEach((element) => {
            const item = {
              address: element.exchange,
              liquidity: element.total_liquidity_quote.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              }),
              volume: element.volume_24h_quote.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              }),
              fees: element.fee_24h_quote.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              }),
              annual_fees: element.annualized_fee,
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