<template>
  <div>
    <div class="mt-10">
      <VolumeLiquidity :chainId="chainId" :API_KEY="API_KEY" />
    </div>
    <div class="mt-10">
      <Health :API_KEY="API_KEY" />
    </div>
  </div>
</template>

<script>
import VolumeLiquidity from "../components/VolumeLiquidity.vue";
import Health from "../components/Health.vue";

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
  },
};
</script>