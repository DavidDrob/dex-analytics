<template>
  <div style="height: 100vh">
    <aside
      class="w-1/12 font-semibold flex flex-col justify-start h-screen fixed"
      style="background-color: #424656"
    >
      <div class="h-24 flex items-left justify-center flex-col pl-4">
        <div class="flex items-center">
          <img src="./assets/logo.png" class="w-6 h-6 mr-2" />
          <p class="text-2xl font-bold text-white">Sushi</p>
        </div>
        <p class="text-md text-white">Analytics</p>
      </div>
      <ul class="text-gray-400">
        <li class="pl-4 mb-1">
          <router-link to="/">Ecosystem</router-link>
        </li>
        <li class="pl-4 mb-1">
          <router-link to="/tokens">Tokens</router-link>
        </li>
        <li class="pl-4 mb-1"><router-link to="/pools">Pools</router-link></li>
      </ul>
      <div class="fixed bottom-4 pl-4">
        <label class="block text-left text-black">
          <select
            class="form-select block w-full mt-1 bg-white"
            v-model="chainId"
          >
            <option label="Ethereum">1</option>
            <option label="Polygon">137</option>
            <option label="Avalanche">43114</option>
            <option label="BSC">56</option>
          </select>
        </label>
      </div>
    </aside>
    <main class="bg-gray-50 w-11/12 ml-auto">
      <PriceBar :API_KEY="API_KEY" />
      <router-view :chainId="chainId" :API_KEY="API_KEY"></router-view>
    </main>
    <footer
      class="
        bg-gradient-to-l
        from-main-pink
        to-main-blue
        h-16
        flex
        items-center
        justify-center
        text-white
      "
    >
      Powered by&nbsp;<a href="https://www.covalenthq.com/">COVALENT</a>
    </footer>
  </div>
</template>

<script>
import PriceBar from "./components/PriceBar.vue";

export default {
  name: "App",
  components: {
    PriceBar,
  },
  data() {
    return {
      chainId: 1,
      API_KEY: "",
    };
  },
};
</script>

<style>
.router-link-active {
  color: white;
}
</style>