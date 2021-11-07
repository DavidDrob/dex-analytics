<template>
  <div class="w-11/12 mt-10 m-auto">
    <!-- {{ tokenList }} -->
    <p class="text-2xl text-main font-semibold text-black">Tokens</p>
    <div class="flex justify-between flex-wrap">
      <div class="w-full bg-white border-2 rounded-2xl p-6 mt-6">
        <p class="font-light text-gray-600">Most Traded Tokens in last 24h</p>
        <div class="flex my-4 text-lg font-semibold justify-between">
          <div class="flex items-center">
            <p class="mr-4">#</p>
            <div>
              <p class="mr-4 flex">Token</p>
            </div>
          </div>
          <div class="flex items-center justify-end w-4/6 text-right">
            <p class="w-2/12">Swaps (24h)</p>
            <p class="w-4/12">Volumes (24h)</p>
            <p class="w-3/12">Quote Rate</p>
          </div>
        </div>
        <ul v-for="(token, index) in tokens" :key="index" class="text-bg-light">
          <div
            class="flex mb-2 justify-between border-gray-400 border-solid pt-1"
            style="border-top-width: 1px"
          >
            <div class="flex items-center">
              <li class="mr-4">{{ index + 1 }}</li>
              <div>
                <div class="flex">
                  <li class="mr-4 font-semibold">{{ token.name }}</li>
                  <li class="text-gray-600">{{ token.symbol }}</li>
                </div>
                <li class="font-light text-xs">{{ token.address }}</li>
              </div>
            </div>
            <div class="flex items-center justify-end w-4/6 text-right">
              <li class="w-1/12">{{ token.swaps }}</li>
              <li class="w-4/12">{{ token.volume }} {{ token.symbol }}</li>
              <li class="w-3/12">
                {{
                  token.quote_rate.toLocaleString("en-US", {
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
</template>

<script>
import config from "../assets/config";

export default {
  name: "Tokens",
  data() {
    return {
      tokens: [],
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
    getTokens() {
      fetch(
        `https://api.covalenthq.com/v1/${this.chainId}/xy=k/sushiswap/tokens/?key=${this.API_KEY}`,
        config
      )
        .then((response) => response.json())
        .then((data) => {
          data.data.items.forEach((element) => {
            const item = {
              name: element.contract_name,
              symbol: element.contract_ticker_symbol,
              swaps: element.swap_count_24h,
              liquidity: element.total_liquidity,
              quote_rate: element.quote_rate,
              volume: element.total_volume_24h,
              address: element.contract_address,
            };
            this.tokens.push(item);
          });
          this.tokens.sort((a, b) => {
            if (a.swaps > b.swaps) return -1;
            if (a.swaps < b.swaps) return 1;
            return 0;
          });
        });
    },
  },
  mounted() {
    this.getTokens();
  },
  watch: {
    chainId(newValue, oldValue) {
      if (newValue != oldValue) {
        this.tokens = [];
        this.getTokens();
      }
    },
  },
};
</script>