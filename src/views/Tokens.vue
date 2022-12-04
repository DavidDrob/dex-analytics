<template>
  <div class="w-11/12 m-auto">
    <p class="w-11/12 text-3xl text-main font-semibold text-indigo-600 py-4">
      Tokens
    </p>

    <div class="flex justify-between flex-wrap">
      <div class="w-full bg-white border-2 rounded-2xl p-6 mt-6">
        <p class="font-light text-gray-600">
          Most Traded Tokens in the last 24h
        </p>
        <div
          class="w-full h-full grid place-items-center"
          style="height: 100%"
          v-if="loading"
        >
          <div class="spinner"></div>
        </div>
        <table class="table-auto w-full" v-else>
          <thead class="font-semibold text-left">
            <tr>
              <th>Token</th>
              <th>Volume (24h)</th>
              <th>Liquidity</th>
              <th class="text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="token in tokens" :key="token.symbol" class="border-b">
              <td>{{ token.name }}</td>
              <td>${{ format(token.volume) }}</td>
              <td>${{ format(token.liquidityQuote) }}</td>
              <td class="text-right">${{ format(token.quote_rate) }}</td>
            </tr>
          </tbody>
        </table>
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
      loading: true,
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
        `https://api.covalenthq.com/v1/${this.chainId}/xy=k/diffusion/tokens/?key=${this.API_KEY}`,
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
              liquidityQuote: element.total_liquidity_quote,
              quote_rate: element.quote_rate,
              volume: element.total_volume_24h_quote,
              address: element.contract_address,
              logo: element.logo_url,
            };
            this.tokens.push(item);
          });
          this.tokens.sort((a, b) => {
            if (a.volume > b.volume) return -1;
            if (a.volume < b.volume) return 1;
            return 0;
          });
          console.log(this.tokens);
          this.loading = false;
        });
    },
    format(value) {
      if (value == undefined) return value;
      const n = value?.toString();
      return parseFloat(n)
        .toFixed(2)
        ?.toString()
        .substring(0, 9)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        .replace(".00", "");
    },
  },
  mounted() {
    this.getTokens();
  },
};
</script>