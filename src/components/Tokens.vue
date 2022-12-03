<template>
  <div class="bg-white border-2 rounded-2xl p-6 mt-6 w-8/12 flex flex-col">
    <p class="font-light text-gray-600 w-full">Top tokens</p>
    <div
      class="w-full h-full grid place-items-center"
      style="height: 100%"
      v-if="loading"
    >
      <div class="spinner"></div>
    </div>
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
};
</script>