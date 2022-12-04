<template>
  <div class="bg-white border-2 rounded-2xl p-6 md:mt-6 w-full md:w-1/4 h-full">
    <p class="font-light text-gray-600 w-full">Governance token</p>
    <div
      class="w-full grid place-items-center"
      style="height: 165px"
      v-if="loading"
    >
      <div class="spinner"></div>
    </div>
    <main class="w-full py-6" v-else>
      <div class="flex mb-4 items-center">
        <img src="../assets/diffusion.png" :alt="govToken.symbol" />
        <p class="font-semibold text-xl ml-2">
          {{ govToken.name }} ({{ govToken.symbol }})
        </p>
      </div>
      <section class="flex flex-col">
        <div class="text-center flex flex-col text-xl mb-8">
          <span class="font-semibold"> ${{ govToken.quote_rate }} </span>
          <span class="font-light">Token price</span>
        </div>
        <div class="text-center flex flex-col text-xl mb-8">
          <span class="font-semibold">
            ${{ govToken.symbol }} {{ totalSupply }}
          </span>
          <span class="font-light">Total supply</span>
        </div>
        <div class="text-center flex flex-col text-xl -mb-4">
          <span class="font-semibold">
            ${{ govToken.symbol }} {{ format(liquidity) }}
          </span>
          <span class="font-light">Liquidity in Diffusion DEX</span>
        </div>
      </section>
    </main>
  </div>
</template>
  
  <script>
import { ethers } from "ethers";

export default {
  name: "Governance",
  data() {
    return {
      loading: true,
      API_KEY: "ckey_ba34fd216fce4a408160dfc598c",
      totalSupply: 0,
      liquidity: 0,
    };
  },
  props: {
    govToken: {
      type: Object,
      default: {
        name: "Diffusion",
        symbol: "DIFF",
        address: "?",
        logo: "https://via.placeholder.com/32",
        quote_rate: "?",
        liquidity: 0,
      },
    },
  },
  async created() {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://evmos-mainnet.public.blastapi.io"
    );

    const abi = ["function totalSupply()  view returns (uint256)"];

    const contract = new ethers.Contract(
      "0x3f75ceabcdfed1aca03257dc6bdc0408e2b4b026",
      abi,
      provider
    );

    const ts = parseInt(
      (await contract.totalSupply()).toString().substring(0, 9)
    );

    this.totalSupply = ts
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
      .replace(".00", "");
  },
  watch: {
    govToken(newValue, oldValue) {
      if (this.govToken.quote_rate != "?") this.loading = false;
      this.liquidity = this.govToken.liquidity
        .substring(0, 9)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        .replace(".00", "");
    },
  },
  methods: {
    format(value) {
      const n = value?.toString();
      return parseInt(n)
        .toFixed(2)
        ?.toString()
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        .replace(".00", "");
    },
  },
};
</script>