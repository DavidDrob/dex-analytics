<template>
  <div class="flex flex-wrap w-full">
    <div
      class="
        bg-white
        border-2
        rounded-2xl
        p-6
        mt-6
        w-11/12
        grid
        place-items-center
      "
    >
      <p class="font-light text-gray-600 w-full">Health Overview</p>
      <div
        class="w-full grid place-items-center"
        style="height: 165px"
        v-if="loading"
      >
        <div class="spinner"></div>
      </div>
      <ul class="flex flex-col md:flex-row items-center w-full" v-else>
        <li
          class="
            w-full
            md:w-1/2
            h-24
            md:h-40
            flex
            justify-center
            items-center
            flex-col
            text-center
          "
        >
          <p class="font-semibold text-xl">
            {{ latest_block }}
          </p>
          <p class="font-light">Latest Block Height</p>
        </li>

        <li
          class="
            w-full
            md:w-1/2
            h-24
            md:h-40
            flex
            justify-center
            items-center
            flex-col
            text-center
          "
        >
          <p class="font-semibold text-xl">
            {{ synced_block }}
          </p>
          <p class="font-light">Synced Block Height</p>
        </li>
        <li
          class="
            w-full
            md:w-1/2
            h-24
            md:h-40
            flex
            justify-center
            items-center
            flex-col
            text-center
          "
        >
          <p class="font-semibold text-xl">
            {{
              new Date(latest_block_signed_at).toLocaleString("en-US", options)
            }}
          </p>
          <p class="font-light">Latest Block signed at</p>
        </li>
        <li
          class="
            w-full
            md:w-1/2
            h-24
            md:h-40
            flex
            justify-center
            items-center
            flex-col
            text-center
          "
        >
          <p class="font-semibold text-xl">
            {{
              new Date(synced_block_signed_at).toLocaleString("en-US", options)
            }}
          </p>
          <p class="font-light">Synced Block signed at</p>
        </li>
      </ul>
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
      options: {
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      },
      loading: true,
    };
  },
  methods: {
    getHealth() {
      fetch(
        `https://api.covalenthq.com/v1/9001/xy=k/diffusion/health/?key=${this.API_KEY}`,
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
          this.loading = false;
        });
    },
  },
  created() {
    this.getHealth();
  },
};
</script>
