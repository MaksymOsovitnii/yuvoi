<script lang="ts">
  import type { CreatorPageConfig } from "$modules/creator";
  import Icon from "@iconify/svelte";

  interface Props {
    config: CreatorPageConfig;
  }

  let { config }: Props = $props();

  const icons: { [key: string]: string } = {
    embed: "code",
    branding: "paintbrush",
    ai: "speech",
    retention: "chart-no-axes-combined",
  };
</script>

<div class="pt-16 lg:pt-20 pb-16 bg-dark">
  <div class="container flex flex-col gap-4">
    <div class="flex max-sm:flex-col justify-between gap-4 mb-8 lg:mb-12">
      <div class="flex flex-col gap-4">
        <h2
          class="text-white text-[36px] sm:text-[40px] font-bold leading-[105%] text-pretty text-shadow-2xs"
        >
          {config.creatorIntegration.title}
        </h2>
        <p class="text-white/80 text-sm font-light">
          {config.creatorIntegration.text}
        </p>
      </div>

      <a
        href={config.creatorIntegration.ctaButton.url}
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-3 h-12 min-w-max w-max max-sm:mx-auto mt-auto max-sm:mt-3 px-6 text-white bg-primary rounded-lg text-sm font-semibold"
      >
        {config.creatorIntegration.ctaButton.label}
        <Icon icon="lucide:square-arrow-out-up-right" class="w-4 h-4" />
      </a>
    </div>

    <div class="flex flex-wrap justify-center gap-4 mb-8">
      {#each config.creatorIntegration.creatorIntegrationItem as item}
        <div
          class="flex-1 flex sm:flex-col max-sm:gap-4 max-sm:!min-w-full max-lg:min-w-[calc(50%-1rem)] px-5 py-4 lg:px-6 lg:py-5 bg-white/8 rounded-lg border border-white/15 shadow-sm"
        >
          <Icon
            icon="lucide:{icons[item.type]}"
            class="min-w-6 sm:w-7 h-7 sm:m-1 sm:mb-3 text-primary"
          />
          <div>
            <p class="mb-2 text-white font-semibold">{item.title}</p>
            <p class="text-white/70 text-sm">{item.text}</p>
          </div>
        </div>
      {/each}
    </div>

    <div
      class="flex max-sm:flex-col gap-4 p-5 sm:p-6 bg-petrol-blue/50 rounded-md border border-white/15"
    >
      <div
        class="flex max-sm:w-full w-14 min-w-14 h-14 my-auto bg-petrol-blue rounded-sm sm:rounded-full"
      >
        <Icon icon="lucide:shield-check" class="w-8 h-8 m-auto text-white" />
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-lg sm:text-xl text-white font-semibold">{config.creatorInfoBox.title}</p>
        <p class="text-sm text-white/80">{config.creatorInfoBox.text}</p>
      </div>
    </div>
  </div>
</div>
