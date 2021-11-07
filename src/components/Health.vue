<template>
  <div class="w-11/12 m-auto">
    <p class="text-2xl text-main font-semibold text-black">Health</p>
    <div class="flex justify-between flex-wrap">
      <div class="w-full bg-white border-2 rounded-2xl p-6 mt-6">
        <p class="font-light text-gray-600">Health Overview</p>
        <ul class="flex">
          <li class="w-1/2 h-40 flex justify-center items-center flex-col">
            <p class="font-light text-3xl">
              {{ latest_block }}
            </p>
            <p class="font-semibold">Latest Block Height</p>
          </li>
          <li class="w-1/2 h-40 flex justify-center items-center flex-col">
            <p class="font-light text-3xl">
              {{ new Date(latest_block_signed_at).toLocaleString() }}
            </p>
            <p class="font-semibold">Latest Block signed at</p>
          </li>
          <li class="w-1/2 h-40 flex justify-center items-center flex-col">
            <p class="font-light text-3xl">
              {{ synced_block }}
            </p>
            <p class="font-semibold">Synced Block Height</p>
          </li>
          <li class="w-1/2 h-40 flex justify-center items-center flex-col">
            <p class="font-light text-3xl">
              {{ new Date(synced_block_signed_at).toLocaleString() }}
            </p>
            <p class="font-semibold">Synced Block signed at</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import config from "../assets/config";

export default {
  name: "Health",
  props: {
    API_KEY: {
      type: String,
    },
  },
  data() {
    return {
      latest_block: undefined,
      latest_block_signed_at: undefined,
      synced_block: undefined,
      synced_block_signed_at: undefined,
    };
  },
  methods: {
    getHealth() {
      fetch(
        `https://api.covalenthq.com/v1/1/xy=k/sushiswap/health/?key=${this.API_KEY}`,
        config
      )
        .then((response) => response.json())
        .then((data) => {
          this.latest_block = data.data.items[0].latest_block_height;
          this.latest_block_signed_at =
            data.data.items[0].latest_block_signed_at;
          this.synced_block = data.data.items[0].synced_block_height;
          this.synced_block_signed_at =
            data.data.items[0].synced_block_signed_at;
        });
    },
  },
  created() {
    this.getHealth();
  },
};
</script>
