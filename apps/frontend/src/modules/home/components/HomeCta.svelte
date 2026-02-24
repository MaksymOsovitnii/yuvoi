<script lang="ts">
  import type { HomePageConfig } from "$modules/home";
  import { getImageUrl } from "$modules/common";
  import type { StrapiMedia } from "$modules/common/types/api";
  import AppStoreIcon from "$lib/assets/icons/AppStoreIcon.svelte";
  import PlayStoreIcon from "$lib/assets/icons/PlayStoreIcon.svelte";

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

  const openLink = (link: string) => {
    window.open(link, "_blank");
  };
</script>

<div class="relative flex my-[100px] md:my-[120px] h-full">
  <div
    class="
      absolute left-0 w-full h-[calc(100%+72px)] -mt-[36px] bg-petrol-blue/3 z-[-1]
      md:h-[calc(100%+72px+64px)] md:-mt-[72px]
    "
  ></div>
  <div class="container flex h-max max-md:flex-col-reverse">
    <div
      class="
        flex
        max-xs:flex-col max-xs:!min-h-max
        max-sm:h-[140px] max-sm:max-h-[140px] max-sm:w-full
        max-md:-ml-8 max-md:my-4 max-md:w-[calc(100%+64px)]
        max-xs:!-ml-4 max-xs:!w-[calc(100%+32px)]
        md:gap-4 md:w-[45%] md:mr-15
      "
    >
      <div class="flex flex-1 max-xs:!w-full max-md:w-[50%] md:flex-col md:gap-4">
        <img
          alt="Action"
          src={images()[0]}
          class="max-md:max-w-[50%] object-cover md:rounded-lg shadow-sm md:aspect-3/2"
        />
        <img
          alt="Action"
          src={images()[1]}
          class="max-md:max-w-[50%] object-cover md:rounded-lg shadow-sm md:aspect-2/3 md:max-h-[240px]"
        />
      </div>
      <div class="flex flex-1 max-xs:!w-full max-md:w-[50%] md:flex-col md:gap-4 md:pt-8">
        <img
          alt="Action"
          src={images()[2]}
          class="max-xs:max-h-[140px] max-sm:min-w-[100%] max-md:max-w-[50%] object-cover md:rounded-lg shadow-sm md:aspect-2/3 md:max-h-[240px]"
        />
        <img
          alt="Action"
          src={images()[3]}
          class="max-sm:hidden max-md:max-w-[50%] object-cover md:rounded-lg shadow-sm md:aspect-3/2"
        />
      </div>
    </div>

    <div class="flex flex-col md:w-[55%]">
      <h2 class="mt-4 md:mt-12 mb-6 text-[40px] font-bold leading-[105%] text-shadow-2xs">
        {titleParts()[0]}
        <span class="text-primary">{titleParts()[1]}</span>
      </h2>
      <p class="mb-auto text-dark-grey/70">{config.callToAction.text}</p>

      <div
        class="flex max-md:flex-wrap gap-4 sm:gap-6 mb-6 sm:mb-8 max-sm:flex-col max-md:mt-10 md:mb-3 md:gap-y-2 md: mt-4"
      >
        <button
          class="max-md:flex-1 flex items-center gap-3 pl-6 pr-7 text-[15px] py-3 text-dark/90 bg-white shadow-sm shadow-petrol-blue/15 hover:shadow-petrol-blue/25 rounded-xl md:rounded-full cursor-pointer"
          onclick={() => openLink(config.callToAction.appStoreUrl)}
        >
          <span class="w-8 h-8"><AppStoreIcon /></span>
          App Store
        </button>
        <button
          class="max-md:flex-1 flex items-center gap-3 pl-6 pr-7 text-[15px] py-3 text-dark/90 bg-white shadow-sm shadow-petrol-blue/15 hover:shadow-petrol-blue/25 rounded-xl md:rounded-full cursor-pointer"
          onclick={() => openLink(config.callToAction.playMarketUrl)}
        >
          <span class="w-8 h-8"><PlayStoreIcon /></span>
          Play Store
        </button>
      </div>
    </div>
  </div>
</div>
