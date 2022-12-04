<template>
  <div class="bg-white border-2 rounded-2xl p-6 mt-6 w-8/12 flex flex-col">
    <p class="font-light text-gray-600 w-full">15 Most traded tokens (24h)</p>
    <router-link class="font-light text-gray-600 mb-2" to="/tokens">
      See all
    </router-link>
    <table class="table-auto">
      <thead class="font-semibold text-left">
        <tr>
          <th>Token</th>
          <th>Volume (24h)</th>
          <th>Liquidity</th>
          <th class="text-right">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="token in tokensSortedByVolume"
          :key="token.symbol"
          class="border-b"
        >
          <td>{{ token.name }}</td>
          <td>${{ format(token.volume) }}</td>
          <td>${{ format(token.liquidityQuote) }}</td>
          <td class="text-right">${{ format(token.quote_rate) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
    
<script>
export default {
  name: "Top tokens",
  data() {
    return {
      loading: true,
      API_KEY: import.meta.env.VITE_COVALENT_API,
    };
  },
  props: ["tokens"],
  methods: {
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
  computed: {
    tokensSortedByVolume() {
      return this.tokens.slice(0, 15).sort((a, b) => {
        if (a.volume < b.volume) return 1;
        if (a.volume > b.volume) return -1;
        return 0;
      });
    },
  },
};
</script>