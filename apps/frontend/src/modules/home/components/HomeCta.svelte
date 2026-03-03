<script lang="ts">
  import type { HomePageConfig } from "$modules/home";
  import { getImageUrl } from "$modules/common";
  import type { StrapiMedia } from "$modules/common/types/api";
  import AppStoreIcon from "$lib/assets/icons/AppStoreIcon.svelte";
  import PlayStoreIcon from "$lib/assets/icons/PlayStoreIcon.svelte";
  import Icon from "@iconify/svelte";
  import { cn } from "$lib/utils";
  import { Tooltip } from "$modules/ui/shadcn";

  interface Props {
    config: HomePageConfig;
  }

  let { config }: Props = $props();

  const images = $derived((): string[] => {
    const images: string[] = [];

    for (let i = 0; i < 4; i++) {
      if (config.callToAction.images?.[i]) {
        images.push(getImageUrl(config.callToAction.images[i]));
      } else {
        images.push(getImageUrl({} as StrapiMedia));
      }
    }

    return images;
  });

  const titleParts = $derived((): string[] => {
    const parts = config.callToAction?.title?.split(" ") || [];

    return [parts.slice(0, -1).join(" "), parts.slice(-1)[0]];
  });

  const buttons = $derived(() => {
    return [config.callToAction.appStoreButton, config.callToAction.playStoreButton].filter(
      (i) => !!i,
    );
  });

  const openLink = (link: string) => {
    window.open(link, "_blank");
  };
</script>

<div class="relative flex my-[100px] md:my-[120px] h-full">
  <div
    class="
      absolute left-0 w-full h-[calc(100%+72px)] -mt-[36px] bg-dark z-[-1]
      md:h-[calc(100%+72px+64px)] md:-mt-[72px]
    "
  ></div>
  <div class="container flex h-max max-md:flex-col-reverse">
    <div
      class="
        flex
        max-xs:flex-col max-xs:!min-h-max
        max-sm:w-full
        max-md:-ml-8 max-md:my-4 max-md:w-[calc(100%+64px)]
        max-xs:!-ml-4 max-xs:!w-[calc(100%+32px)]
        md:gap-4 md:w-[45%] md:mr-15
      "
    >
      <div class="flex flex-1 max-xs:!w-full max-md:w-[50%] md:flex-col md:gap-4">
        <img
          alt="Action"
          src={images()[0]}
          class="max-md:w-[50%] max-sm:max-h-[160px] object-cover md:rounded-lg shadow-sm md:aspect-3/2 md:max-h-[240px]"
        />
        <img
          alt="Action"
          src={images()[1]}
          class="max-md:w-[50%] max-sm:max-h-[160px] object-cover md:rounded-lg shadow-sm md:aspect-2/3 md:max-h-[240px]"
        />
      </div>
      <div class="flex flex-1 max-xs:!w-full max-md:w-[50%] md:flex-col md:gap-4 md:pt-8">
        <img
          alt="Action"
          src={images()[2]}
          class="max-xs:max-h-[140px] max-sm:min-w-[100%] max-md:w-[50%] max-sm:max-h-[160px] object-cover md:rounded-lg shadow-sm md:aspect-2/3 md:max-h-[240px]"
        />
        <img
          alt="Action"
          src={images()[3]}
          class="max-sm:hidden max-md:max-w-[50%] object-cover md:rounded-lg shadow-sm md:aspect-3/2"
        />
      </div>
    </div>

    <div class="flex flex-col md:w-[55%]">
      <h2
        class="mt-4 md:mt-12 mb-6 text-[40px] font-bold text-white leading-[105%] text-shadow-2xs"
      >
        {titleParts()[0]}
        <span class="text-primary">{titleParts()[1]}</span>
      </h2>
      <p class="mb-8 text-white/80">{config.callToAction.text}</p>

      <div
        class={cn(
          "flex w-full max-sm:flex-col max-md:flex-wrap",
          "gap-4 sm:gap-6 md:gap-y-2",
          "mb-8 md:mb-12 lg:mb-8",
        )}
      >
        {#each buttons() as button, key (key)}
          <Tooltip.Provider delayDuration={100}>
            <Tooltip.Root>
              <Tooltip.Trigger>
                <button
                  class="w-full min-w-[200px] flex items-center gap-3 pl-4 pr-5 text-[15px] py-3 text-dark/90 bg-white/10 rounded-xl cursor-pointer duration-150"
                  class:opacity-50={button.disabled}
                  onclick={() => !button.disabled && openLink(button.url)}
                >
                  <span class="w-7 h-7">
                    {#if key === 0}
                      <AppStoreIcon />
                    {:else}
                      <PlayStoreIcon />
                    {/if}
                  </span>
                  <span class="mx-auto text-white">{button.label}</span>
                </button>
              </Tooltip.Trigger>

              {#if button.disabled}
                <Tooltip.Content
                  align="center"
                  alignOffset={0}
                  side="bottom"
                  sideOffset={0}
                  class="bg-light-grey text-black rounded-xl opacity-90"
                  arrowClasses="bg-light-grey"
                >
                  Coming soon...
                </Tooltip.Content>
              {/if}
            </Tooltip.Root>
          </Tooltip.Provider>
        {/each}
      </div>

      <button
        class="-mb-1 max-md:mb-10 mt-auto max-lg:mx-auto group flex items-center gap-3 w-max h-[58px] bg-primary duration-150 rounded-full cursor-pointer hover:shadow-inner hover:shadow-dark/15"
        onclick={() => openLink(config.callToAction.ctaButton.url)}
      >
        <p class="pl-5 text-lg text-white">
          {config.callToAction.ctaButton.label}
        </p>
        <div class="w-10 h-10 mr-3 rounded-full bg-white">
          <Icon
            icon="lucide:arrow-right"
            class="mt-2 ml-2 w-6 h-6 text-primary duration-150 group-hover:ml-2.5"
          />
        </div>
      </button>
    </div>
  </div>
</div>
