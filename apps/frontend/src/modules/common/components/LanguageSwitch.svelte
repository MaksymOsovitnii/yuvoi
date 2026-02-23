<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { languageStore } from "$modules/common/stores/app.svelte";
  import { UiLanguage } from "$modules/common";
  import Icon from "@iconify/svelte";

  interface Props {
    class?: string;
  }

  const { class: className = "" }: Props = $props();

  const changeLang = (newLang: UiLanguage) => {
    const path = $page.url.pathname.replace(/^\/(en|de)/, "");
    goto(`/${newLang}${path}`);
  };
</script>

<div class="flex gap-3 px-4 py-2 cursor-pointer {className || ''}">
  <button
    class="
      {$languageStore === UiLanguage.EN ? '' : 'text-dark/40 hover:text-dark/70'}
      font-semibold text-sm duration-150 cursor-pointer
    "
    onclick={() => changeLang(UiLanguage.EN)}
  >
    ENG
  </button>

  <div class="relative w-5 h-5">
    <Icon icon="lucide:globe" class="w-5 h-5 z-[1]" />
    <Icon
      icon="lucide:globe"
      class="absolute top-0 w-5 h-5 text-white/40 {$languageStore === UiLanguage.EN
        ? '[clip-path:inset(0_0_0_50%)]'
        : '[clip-path:inset(0_50%_0_0)]'}"
    />
  </div>

  <button
    class="
      {$languageStore === UiLanguage.DE ? '' : 'text-dark/40 hover:text-dark/70'}
      font-semibold text-sm duration-150 cursor-pointer
    "
    onclick={() => changeLang(UiLanguage.DE)}
  >
    GER
  </button>
</div>
