<script lang="ts">
  import { CreatorCta, CreatorHero, CreatorForm, type CreatorPageConfig } from "$modules/creator";

  interface Props {
    config: CreatorPageConfig;
  }

  let { config }: Props = $props();
</script>

<div class="relative w-full h-full z-[0]">
  <CreatorHero {config} />
  <CreatorCta {config} />
  <CreatorForm {config} />
</div>
