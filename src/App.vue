<template>
  <div style="height: 100vh">
    <aside
      class="
        font-semibold
        w-full
        md:w-1/12
        flex
        justify-around
        bg-gray-800
        md:flex-col md:justify-start md:h-screen md:fixed
      "
    >
      <div class="h-24 flex items-left justify-center flex-col pl-4">
        <div class="flex items-center">
          <img src="./assets/diffusion.png" class="w-6 h-6 mr-2" />
          <p class="text-2xl font-bold text-white">Diffusion</p>
        </div>
        <p class="text-md text-white">Analytics</p>
      </div>
      <ul class="text-white flex items-center md:inline">
        <li class="pl-4 mb-1">
          <router-link to="/">Ecosystem</router-link>
        </li>
        <li class="pl-4 mb-1">
          <router-link to="/tokens">Tokens</router-link>
        </li>
        <li class="pl-4 mb-1"><router-link to="/pools">Pools</router-link></li>
      </ul>
    </aside>
    <main class="bg-gray-50 w-11/12 md:ml-auto">
      <router-view :chainId="chainId" :API_KEY="API_KEY"></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      chainId: 9001,
      API_KEY: import.meta.env.VITE_COVALENT_API,
    };
  },
};
</script>

<style>
.router-link-active {
  color: white;
}

.spinner {
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #34d399;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: s3 1s infinite linear;
}
@keyframes s3 {
  to {
    transform: rotate(1turn);
  }
}
</style>