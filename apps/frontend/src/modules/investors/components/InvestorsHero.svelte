<script lang="ts">
  import type { InvestorsPageConfig } from "$modules/investors";
  import Icon from "@iconify/svelte";

  interface Props {
    config: InvestorsPageConfig;
  }

  let { config }: Props = $props();

  const titleParts = $derived(() => {
    const parts = config.title.split(".");
    return [parts.slice(0, -1).join("."), parts.slice(-1)?.[0]];
  });
</script>

<div class="container flex flex-col justify-center items-center pt-16 pb-6 md:pt-20 sm:pb-4">
  <p
    class="flex items-center gap-1 pl-3 pr-4 py-1 mx-auto mb-8 text-sm text-primary bg-primary/10 rounded-full border border-primary/25"
  >
    <Icon icon="lucide:star-half" />
    {config.badge}
  </p>
  <h2
    class="max-w-[1000px] mb-6 text-[44px] sm:text-[50px] md:text-[52px] font-bold leading-[120%] lg:leading-[105%] text-pretty text-center text-shadow-sm"
  >
    {titleParts()[0]}.
    <span class="text-primary">{titleParts()[1]}</span>
  </h2>
  <p class="max-w-[900px] mb-8 sm:mb-12 text-warm-grey text-center">{config.text}</p>
</div>
