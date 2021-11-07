<template>
  <nav
    class="
      hidden
      md:block
      w-full
      text-white
      bg-gradient-to-l
      from-main-pink
      to-main-blue
    "
  >
    <div class="flex justify-between items-center h-16 w-11/12 m-auto">
      <div
        v-for="(contract, id) in contract_list"
        :key="id"
        class="flex items-center"
      >
        <img :src="contract.image" class="w-6 h-6 mx-4 rounded-full" />
        <div>
          <p>{{ contract.name }}</p>
          <p class="font-semibold">${{ contract.quote_rate.toFixed(2) }}</p>
        </div>
      </div>
    </div>
  </nav>
  <nav class="block md:hidden bg-purple-400 text-white overflow-x-scroll">
    <div class="flex h-24 m-auto">
      <div
        v-for="(contract, id) in contract_list"
        :key="id"
        class="flex items-center"
      >
        <img :src="contract.image" class="w-6 h-6 mx-2" />
        <div class="flex">
          <p>{{ contract.name }}</p>
          <p class="font-semibold ml-2 mr-8">
            ${{ contract.quote_rate.toFixed(2) }}
          </p>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
// import axios from "axios";
import config from "../assets/config";

export default {
  name: "PriceBar",
  props: {
    API_KEY: {
      type: String,
    },
  },
  data() {
    return {
      contract_list: [],
      tickers: ["BTC", "BNB", "WETH", "AAVE", "ICE", "1INCH", "SUSHI", "CVX"],
    };
  },
  methods: {
    getSpotPrices() {
      fetch(
        `https://api.covalenthq.com/v1/pricing/tickers/?tickers=${this.tickers}&key=${this.API_KEY}`,
        config
      )
        .then((response) => response.json())
        .then((data) => {
          data.data.items.forEach((contract) => {
            const contract_data = {};
            contract_data["name"] = contract.contract_ticker_symbol;
            contract_data["quote_rate"] = contract.quote_rate;
            contract_data["image"] = contract.logo_url;
            this.contract_list.push(contract_data);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getSpotPrices();
  },
};
</script>
