<script lang="ts">
  import { resolve } from "$app/paths";
  import Icon from "@iconify/svelte";
  import LogoIcon from "$lib/assets/icons/LogoIcon.svelte";
  import LanguageSwitch from "$modules/common/components/LanguageSwitch.svelte";
  import type { NavItem } from "$modules/common/types/ui";
  import { page } from "$app/stores";
  import { slide } from "svelte/transition";

  interface Props {
    navItems: NavItem[];
  }

  const { navItems } = $props();

  let isMenuOpened = $state(false);
  let activeItem = $state("");
  let openedItems = $state([] as string[]);
  let isEntered = false;

  const isActive = (item: NavItem) => {
    const path = $page.url.pathname.replace(/^\/(en|de)/, "");

    // If home page is active
    if (path === "" && (item.url === "" || item.url === "/")) {
      return true;
    }

    return path === item.url;
  };

  const onNavItemMouseEnter = (e: Event, item: NavItem) => {
    isEntered = true;
    activeItem = item.title;
    return false;
  };

  const onNavItemMouseLeave = () => {
    activeItem = "";
  };

  const onNavItemClick = (e: Event, item: NavItem) => {
    if (isEntered) {
      isEntered = false;
    } else {
      activeItem = activeItem === item.title ? "" : item.title;
    }
  };

  //const setNavItemState = ()

  const toggleMenuItem = (item: NavItem) => {
    if (openedItems.includes(item.title)) {
      openedItems = openedItems.filter((i) => i !== item.title);
    } else {
      openedItems.push(item.title);
    }
  };
</script>

<header class="sticky top-0 flex flex-col bg-white md:bg-white/90 shadow-sm shadow-warm-grey/20 z-[100]">
  <div class="flex items-center justify-between px-5 py-2 md:py-3">
    <div class="flex items-center gap-2 mt-[1px] cursor-pointer">
      <a
        href={resolve("/")}
        class="flex items-center gap-2 w-[100px] hover:opacity-80 transition-opacity"
      >
        <img alt="Logo" src="/icons/yuvoi/logo.png" class="h-7 md:h-10 object-contain object-center" />
      </a>
    </div>

    <div class="max-md:hidden flex items-center gap-3 h-full">
      {#each navItems as navItem, key (key)}
        <div
          role="button"
          tabindex={key}
          class="flex relative px-4 py-1 duration-150 rounded-sm cursor-pointer overflow-visible"
          onmouseenter={(e) => onNavItemMouseEnter(e, navItem)}
          onmouseleave={() => onNavItemMouseLeave()}
          onclick={(e) => onNavItemClick(e, navItem)}
          onkeydown={(e) => e.key === "Enter" && onNavItemClick(e, navItem)}
        >
          <div
            class="flex items-center gap-2 {activeItem === navItem.title
              ? '!text-dark-grey'
              : ''} {isActive(navItem) ? '!text-primary' : 'text-warm-grey'}"
          >
            {#if navItem.child.length}
              <p class="font-semibold text-[15px]">{navItem.title}</p>
              <Icon
                icon="lucide:chevron-down"
                class="h-4 w-4 mt-[2px] -mr-1 rotate-0 duration-150 {activeItem === navItem.title
                  ? 'mt-[1px] rotate-180'
                  : ''}"
              />
            {:else}
              <a href={resolve(navItem.url)} class="font-semibold text-[15px]">
                {navItem.title}
              </a>
            {/if}
          </div>

          {#if navItem.child.length}
            <div
              class="{activeItem === navItem.title
                ? 'flex'
                : 'hidden'} absolute top-0 left-0 pt-10 z-0"
            >
              <div
                class="flex flex-col min-w-[180px] w-max px-4 py-1 bg-white shadow-sm rounded-md"
              >
                {#each navItem.child as children, ch_key (ch_key)}
                  <a
                    href={resolve(children.url)}
                    class="text-sm text-left leading-8 font-light hover:font-medium"
                  >
                    {children.title}
                  </a>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <LanguageSwitch class="max-md:hidden" />

    <button
      class="md:hidden flex h-10 w-10 cursor-pointer"
      onclick={() => (isMenuOpened = !isMenuOpened)}
    >
      {#if !isMenuOpened}
        <Icon icon="lucide:menu" class="w-5 h-5 m-auto text-primary" />
      {:else}
        <Icon icon="lucide:x" class="w-5 h-5 m-auto" />
      {/if}
    </button>
  </div>

  {#if isMenuOpened}
    <div
      transition:slide
      class="
        absolute top-[56px] md:top-[65px] flex flex-col gap-10 w-full
        h-[calc(var(--vh)*100-56px)] md:h-[calc(var(--vh)*100-65px)] p-6 bg-white
      "
    >
      <div class="flex flex-col items-center h-full">
        {#each navItems as navItem, key (key)}
          {#if navItem.child.length}
            <button
              class="flex justify-between w-full h-12"
              onclick={() => toggleMenuItem(navItem)}
            >
              <p class="leading-12 {isActive(navItem) ? '!text-primary' : 'text-dark-grey'}">
                {navItem.title}
              </p>
              <div
                class="flex w-10 h-10 -mr-1 duration-150 {openedItems.includes(navItem.title)
                  ? 'rotate-180'
                  : ''}"
              >
                <Icon icon="lucide:chevron-down" class="h-4 w-4 m-auto" />
              </div>
            </button>
          {:else}
            <a
              href={resolve(navItem.url)}
              class="flex w-full h-12"
              onclick={() => (isMenuOpened = false)}
            >
              <p class="leading-12 {isActive(navItem) ? '!text-primary' : 'text-dark-grey'}">
                {navItem.title}
              </p>
            </a>
          {/if}

          {#if navItem.child.length && openedItems.includes(navItem.title)}
            <div transition:slide class="flex flex-col w-full pl-8 pb-3">
              {#each navItem.child as children, ch_key (ch_key)}
                <a
                  href={resolve(children.url)}
                  class="leading-10 font-light hover:font-medium"
                  onclick={() => (isMenuOpened = false)}
                >
                  {children.title}
                </a>
              {/each}
            </div>
          {/if}
        {/each}
      </div>

      <LanguageSwitch />
    </div>
  {/if}
</header>
