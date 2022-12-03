<template>
  <div>
    <p
      class="
        w-11/12
        m-auto
        text-3xl text-main
        font-semibold
        text-indigo-600
        py-4
      "
    >
      Diffusion Exchange
      <span class="font-light">Overview</span>
    </p>
    <VolumeLiquidity :chainId="chainId" :API_KEY="API_KEY" />
    <div class="w-11/12 m-auto mt-10 flex justify-between">
      <HeatMap />
      <Health class="flex justify-end" :API_KEY="API_KEY" />
    </div>
    <div class="w-11/12 m-auto mt-10 flex justify-between">
      <Governance :govToken="govToken" />
      <Tokens :tokens="tokens" class="flex justify-end" />
    </div>
  </div>
</template>

<script>
import VolumeLiquidity from "../components/VolumeLiquidity.vue";
import Health from "../components/Health.vue";
import HeatMap from "../components/HeatMap.vue";
import Governance from "../components/Governance.vue";
import Tokens from "../components/Tokens.vue";
import config from "../assets/config";

export default {
  name: "Main",
  props: {
    chainId: {},
    API_KEY: import.meta.env.VITE_COVALENT_API,
  },
  data() {
    return {
      govToken: {},
      tokens: [],
    };
  },
  components: {
    VolumeLiquidity,
    Health,
    HeatMap,
    Governance,
    Tokens,
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
            if (
              element.contract_address ==
              "0x3f75ceabcdfed1aca03257dc6bdc0408e2b4b026"
            )
              this.govToken = item;

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
};
</script>