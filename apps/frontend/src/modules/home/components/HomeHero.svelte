<script lang="ts">
  import { getImageUrl } from "$modules/common/index.js";
  import type { HomePageConfig } from "$modules/home";
  import { resolve } from "$app/paths";
  import { goto } from "$app/navigation";
  import Icon from "@iconify/svelte";

  interface Props {
    config: HomePageConfig;
  }

  let { config }: Props = $props();

  const titleParts = $derived((): string[] => {
    const parts = config.intro?.title?.split(".") || [];
    const result: string[] = [];
    if (parts.length) {
      result.push(parts[0]?.split(" ")?.slice(0, -1)?.join(" "));
      result.push(parts[0]?.split(" ")?.slice(-1)?.[0]);

      if (parts?.[1]) {
        result.push(parts[1]);
      }
    }

    return result;
  });
</script>

<div
  class="
    container relative flex items-center w-full z-[0]
    max-lg:flex-col lg:gap-6
  "
>
  <div class="flex flex-col gap-8 max-lg:items-center my-10 lg:my-20">
    <h2
      class="md:w-[600px] max-md:text-[50px] md:text-[58px] font-bold leading-[120%] lg:leading-[105%] text-shadow-md max-lg:text-center"
    >
      {titleParts()[0]} <span class="text-primary">{titleParts()[1]}.</span>
      {#if titleParts()?.[2]}
        <br />
        {titleParts()[2]}
      {/if}
    </h2>

    <p
      class="max-lg:max-w-[860px] lg:w-[600px] lg:mb-8 text-dark-grey/70 md:text-balance text-base max-lg:text-center"
    >
      {config.intro.text}
    </p>

    <button
      class="max-lg:hidden group flex items-center gap-3 min-w-[150px] w-max h-[58px] bg-primary duration-150 rounded-full cursor-pointer hover:shadow-inner hover:shadow-dark/15"
      onclick={() => goto(resolve(config.becomeCreatorButton.url))}
    >
      <p class="pl-5 text-lg text-white">
        {config.becomeCreatorButton.label}
      </p>
      <div class="w-10 h-10 mr-3 ml-auto rounded-full bg-white">
        <Icon
          icon="lucide:arrow-right"
          class="mt-2 ml-2 w-6 h-6 text-primary duration-150 group-hover:ml-2.5"
        />
      </div>
    </button>
  </div>

  <div class="flex flex-col items-center w-full">
    <button
      class="lg:hidden mb-4 group flex items-center gap-3 w-max h-[58px] bg-primary duration-150 rounded-full cursor-pointer hover:shadow-inner hover:shadow-dark/15"
      onclick={() => goto(resolve(config.becomeCreatorButton.url))}
    >
      <p class="pl-5 text-lg text-white">
        {config.becomeCreatorButton.label}
      </p>
      <div class="w-10 h-10 mr-3 rounded-full bg-white">
        <Icon
          icon="lucide:arrow-right"
          class="mt-2 ml-2 w-6 h-6 text-primary duration-150 group-hover:ml-2.5"
        />
      </div>
    </button>
  </div>
  <img
    alt="Home hero"
    src={getImageUrl(config.intro.image)}
    class="
      h-[320px] object-cover object-center shadow-sm rounded-3xl z-[-1]
      md:h-[400px]
      max-lg:w-full max-lg:opacity-75
      lg:absolute lg:right-8 lg:rounded-xl lg:max-w-[calc(100%-680px)] lg:aspect-3/3 lg:h-[calc(100%-40px)]
    "
  />
</div>
