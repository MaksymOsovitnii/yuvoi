<script lang="ts">
  import type { CreatorPageConfig } from "$modules/creator";
  import Icon from "@iconify/svelte";

  interface Props {
    config: CreatorPageConfig;
  }

  let { config }: Props = $props();

  const icons: { [key: string]: string } = {
    charge: "banknote",
    equipment: "mic",
    reach: "wrench",
  };
</script>

<div class="container flex flex-col mb-10 pt-16 pb-8 md:pt-20 sm:pb-10">
  <h2
    class="mb-7 text-[44px] sm:text-[50px] md:text-[56px] font-bold leading-[120%] lg:leading-[105%] text-pretty text-center text-shadow-sm max-lg:text-center"
  >
    {config.creatorMotivation.title}
  </h2>
  <p class="mb-8 sm:mb-12 text-dark-grey text-center">{config.creatorMotivation.text}</p>

  <div class="flex max-sm:flex-col gap-3">
    {#each config.creatorMotivation.creatorMotivationItem as item}
      <div
        class="flex-1 flex sm:flex-col max-sm:gap-4 px-5 lg:px-6 py-5 bg-white shadow-sm rounded-lg"
      >
        <div
          class="flex items-center justify-center w-12 min-w-12 h-12 sm:mb-4 bg-primary/10 rounded-md"
        >
          <Icon icon="lucide:{icons[item.type]}" class="text-primary w-6 h-6" />
        </div>
        <div>
          <p class="mb-1 sm:mb-2 font-bold">{item.title}</p>
          <p class="text-sm text-dark-grey">{item.text}</p>
        </div>
      </div>
    {/each}
  </div>
</div>
