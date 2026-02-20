<script lang="ts">
  import type { InvestorsPageConfig } from "$modules/investors";
  import { getImageUrl } from "$modules/common";

  interface Props {
    config: InvestorsPageConfig;
  }

  let { config }: Props = $props();
</script>

{#if config.partnerCards?.length}
  <div class="container flex flex-col items-center py-12">
    <p class="mb-8 text-sm text-warm-grey uppercase tracking-widest font-medium">
      {config.partnerTitle}
    </p>
    <div class="flex flex-wrap justify-center gap-6 w-full">
      {#each config.partnerCards as card}
        <div
          class="flex flex-col items-center gap-3 p-6 rounded-2xl border border-border bg-card text-center min-w-56 flex-1"
        >
          <img
            src={getImageUrl(card.logo, "thumbnail")}
            alt={card.logo.alternativeText ?? card.name}
            class="h-10 object-contain"
          />
          <p class="font-semibold text-foreground">{card.name}</p>
          <p class="text-sm text-warm-grey">{card.description}</p>
        </div>
      {/each}
    </div>
  </div>
{/if}
