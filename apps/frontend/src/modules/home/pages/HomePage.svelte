<script lang="ts">
  import { HomeCta, HomeHero, type HomePageConfig, HomeStatements } from "$modules/home";

  interface Props {
    config: HomePageConfig;
  }

  let { config }: Props = $props();
</script>

<div class="relative w-full h-full py-10 z-[0]">
  <HomeHero {config} />
  <HomeCta {config} />
  <HomeStatements {config} />
</div>
