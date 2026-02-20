<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { AboutPageConfig } from "$modules/about";
  import { slide } from "svelte/transition";

  interface Props {
    config: AboutPageConfig;
  }

  let { config }: Props = $props();

  const openedItems = $state<string[]>([]);

  const toggle = (id: string) => {
    if (openedItems.includes(id)) {
      openedItems.splice(openedItems.indexOf(id), 1);
    } else {
      openedItems.push(id);
    }
  };
</script>

<div class="container pt-8 sm:pt-16 px-4 sm:px-8">
  <div
    class="relative flex items-center sm:justify-end gap-3 mb-6 sm:mb-4 max-w-[1000px] mx-auto sm:pr-7"
  >
    <div
      class="max-sm:hidden flex-1 h-[1px] bg-gradient-to-r from-dark-grey/2 to-dark-grey/20 mr-3"
    ></div>
    <Icon icon="lucide:check-circle" class="max-sm:hidden min-w-5 w-5 h-5 text-primary" />
    <p
      class="sm:min-w-max max-sm:mx-auto text-sm text-center text-dark-grey/60 uppercase font-light"
    >
      {config.benefitsTitle}
    </p>
    <div
      class="sm:hidden absolute bottom-[-6px] left-[calc(50%-28px)] w-14 h-[2px] bg-primary rounded-full"
    ></div>
  </div>

  <div class="flex flex-col mx-auto max-w-[1000px]">
    {#each config.benefits as item}
      <!-- TODO: remove hidden from item.type !== 'info' when needed. Ready to join block -->
      <button
        class="
          group flex flex-col px-5 py-4 lg:px-6 lg:py-5 duration-150
          {item.type === 'info'
          ? 'cursor-pointer rounded-xl hover:bg-dark-grey/4'
          : '!hidden items-center justify-center'}
        "
        onclick={() => toggle(item.id)}
      >
        {#if item.type === "info"}
          <div class="flex items-center gap-3">
            <div class="flex min-w-10 w-10 h-10 bg-primary/0 rounded-md">
              <Icon icon="lucide:{item.icon}" class="m-auto min-w-6 sm:w-7 h-7 text-primary" />
            </div>
            <p class="font-semibold">{item.title}</p>
            <Icon
              icon="lucide:chevron-down"
              class="
                min-w-5 w-5 h-5 ml-auto text-dark-grey/50 duration-150 group-hover:text-dark-grey/80
                {openedItems.includes(item.id) ? 'rotate-180' : ''}
              "
            />
          </div>

          {#if openedItems.includes(item.id)}
            <p in:slide out:slide class="mt-2 text-sm text-left text-dark-grey">{item.text}</p>
          {/if}
        {:else}
          <p class="mb-5 mt-4 font-bold text-lg text-dark/90">{item.title}</p>
          <a
            href={item.ctaButtonLink}
            class="
              flex items-center justify-center gap-2 max-sm:w-full max-w-full w-max min-h-11 py-2 px-8
              text-center uppercase text-sm text-white leading-[120%] font-semibold bg-primary rounded-md
            "
          >
            <Icon icon="lucide:{item.ctaButtonIcon}" class="min-w-5 w-5 h-5" />
            {item.ctaButtonLabel}
          </a>
        {/if}
      </button>
    {/each}
  </div>

  <div
    class="max-w-2xl relative mx-auto mt-14 mb-6 px-8 py-5 bg-white rounded-2xl shadow-md border border-gray-100 flex gap-3 items-start"
  >
    <Icon
      icon="lucide:quote"
      class="quote min-w-5 w-5 h-5 mt-[-26px] ml-[-42px] text-primary opacity-80 shrink-0 absolute"
    />
    <p class="italic text-dark-grey/75 text-center w-full">
      {config.benefitsUnderText}
    </p>
  </div>
</div>

<style>
    :global(svg.quote > path) {
        fill: var(--color-primary);
    }
</style>