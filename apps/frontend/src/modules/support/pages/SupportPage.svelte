<script lang="ts">
  import { SupportHero, type SupportPageConfig } from "$modules/support";

  interface Props {
    config: SupportPageConfig;
  }

  let { config }: Props = $props();
</script>

<div class="relative flex justify-center w-full h-full py-10 z-[0]">
  <SupportHero {config} />
</div>
