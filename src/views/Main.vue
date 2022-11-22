<template>
  <div>
    <!-- <h1 class="text-2xl font-bold">Diffusion - Overview</h1> -->
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
  </div>
</template>

<script>
import VolumeLiquidity from "../components/VolumeLiquidity.vue";
import Health from "../components/Health.vue";
import HeatMap from "../components/HeatMap.vue";

export default {
  name: "Main",
  props: {
    chainId: {},
    API_KEY: {
      type: String,
    },
  },
  components: {
    VolumeLiquidity,
    Health,
    HeatMap,
  },
};
</script>