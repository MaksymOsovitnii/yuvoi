<script lang="ts">
  import { getImageUrl } from "$modules/common/index.js";
  import type { HomePageConfig } from "$modules/home";
  import Icon from "@iconify/svelte";

  interface Props {
    config: HomePageConfig;
  }

  let { config }: Props = $props();

  const activeStatements = $derived(() => config.statements?.items?.filter(s => s.active) || []);
</script>

<div
  class="container relative flex flex-col items-center gap-6 w-full max-xs:mt-[100px] mb-10 md:mb-20 z-[0]"
>
  <h2 class="md:mt-6 text-[32px] font-bold leading-[105%] text-shadow-2xs max-sm:text-center">
    {config.statements.title}
  </h2>
  <div class="h-[3px] -mt-2 mb-4 md:mb-8 bg-primary w-[80px] rounded-full"></div>

  <div class="flex flex-wrap justify-center gap-5">
    {#each activeStatements() as statement}
      <div
        class="flex flex-col gap-4 w-full sm:w-[calc(50%-1rem)] lg:w-[30%] p-4 md:px-6 md:py-5 bg-white shadow-sm rounded-xl"
      >
        <div class="flex gap-4">
          {#if statement?.avatar}
            <img
              alt="Statement author"
              src={getImageUrl(statement.avatar)}
              class="w-16 h-16 object-cover object-center rounded-lg shadow-inner shadow-dark"
            />
          {:else}
            <div class="flex min-w-16 w-16 h-16 rounded-lg bg-light-grey">
              <Icon icon="lucide:circle-user-round" class="w-10 h-10 m-auto text-dark-grey" />
            </div>
          {/if}
          <div class="flex flex-col gap-1">
            <p class="font-semibold leading-[120%]">{statement.name}</p>
            <p class="text-sm text-warm-grey italic">{statement.role}</p>
          </div>
        </div>

        <p class="text-sm">{statement.text}</p>
      </div>
    {/each}
  </div>
</div>
