<script lang="ts">
  import type { FooterItems } from "$modules/common/types/ui";
  import LogoMiniIcon from "$lib/assets/icons/LogoMiniIcon.svelte";
  import { goto } from "$app/navigation";
  import AppStoreIcon from "$lib/assets/icons/AppStoreIcon.svelte";
  import PlayStoreIcon from "$lib/assets/icons/PlayStoreIcon.svelte";
  import { resolve } from "$app/paths";
  import Icon from "@iconify/svelte";
  import { Tooltip } from "$modules/ui/shadcn";
  import { cn } from "$lib/utils";

  interface Props {
    items: FooterItems;
  }

  const { items }: Props = $props();

  const icons: { [key: string]: string } = {
    instagram: "lucide:instagram",
    linkedin: "lucide:linkedin",
    tiktok: "streamline-flex:tiktok-logo-remix",
  };

  const openLink = (link: string, isInternal = true) => {
    if (isInternal) {
      goto(link);
    } else {
      window.open(link, "_blank");
    }
  };
</script>

{#snippet FooterAppButtons(className = "", buttonClassName = "")}
  {#if items.footerAppButtons?.length}
    <div class="flex gap-4 {className}">
      {#each items.footerAppButtons as appButton (appButton.type)}
        <Tooltip.Provider delayDuration={100}>
          <Tooltip.Root>
            <Tooltip.Trigger>
              <button
                class={cn(
                  'max-md:flex-1 flex items-center gap-3 px-2 xl:px-3 text-sm xl:text-[15px] py-2 text-white bg-white/10 hover:text-primary/80 rounded-lg cursor-pointer',
                  buttonClassName,
                  appButton.disabled ? 'opacity-50 hover:!text-white/80' : '',
                )}
                onclick={() => !appButton.disabled && openLink(appButton.url, false)}
              >
                <span class="w-5 h-5 xl:w-6 xl:h-6">
                  {#if appButton.type === "appStore"}
                    <AppStoreIcon />
                  {:else}
                    <PlayStoreIcon />
                  {/if}
                </span>
                <span class="max-md:inline hidden lg:inline min-w-max mr-1">{appButton.label}</span>
              </button>
            </Tooltip.Trigger>

            {#if appButton.disabled}
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
  {/if}
{/snippet}

{#snippet FooterItems(className = "")}
  {#if items.footerItems?.length}
    <div class={className}>
      {#each items.footerItems as item}
        <button
          class="
            px-2 py-2 text-sm max-[855px]:text-[12px]/[140%] max-[778px]:px-1.5 max-md:px-2 max-md:text-sm xl:text-base text-light-grey font-light cursor-pointer hover:text-warm-grey
            {item.active ? '' : 'pointer-events-none opacity-20'}
          "
          disabled={!item.active}
          onclick={() => openLink(item.url, item.isInternal)}>{item.label}</button
        >
      {/each}
    </div>
  {/if}
{/snippet}

<footer class="flex max-md:flex-col gap-5 py-4 px-4 xl:px-8 bg-dark shadow-t shadow-sm">
  <div class="flex items-center gap-3 xl:gap-5 w-full">
    <a href={resolve("/")} class="min-w-10 w-10 h-10">
      <LogoMiniIcon />
    </a>

    {@render FooterItems("max-md:hidden flex gap-3 max-[1060px]:gap-1 max-[855px]:gap-0")}

    <div class="flex gap-4 items-center ml-auto">
      {@render FooterAppButtons("hidden md:flex")}

      {#if items.footerSocialItems?.length}
        <div class="flex gap-3">
          {#each items.footerSocialItems as social}
            <button
              class="flex items-center justify-center w-8 h-8 text-primary bg-primary/15 hover:bg-primary/25 rounded-md cursor-pointer"
              onclick={() => openLink(social.url, false)}
            >
              <Icon icon={icons[social.type]} class="w-5 h-5" />
            </button>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  {@render FooterItems("md:hidden flex flex-wrap gap-3 gap-y-1 -ml-3")}

  {@render FooterAppButtons("md:hidden", "justify-center")}
</footer>
