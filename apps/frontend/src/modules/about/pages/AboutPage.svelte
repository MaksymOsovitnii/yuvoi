<script lang="ts">
  import { AboutBenefits, AboutForm, AboutHero, type AboutPageConfig } from "$modules/about";
  import AboutPR from "$modules/about/components/AboutPR.svelte";

  interface Props {
    config: AboutPageConfig;
  }

  let { config }: Props = $props();
</script>

<div class="relative w-full h-full z-[0]">
  <AboutHero {config} />
  <AboutBenefits {config} />
  <div class="relative bg-dark py-10">
    <div class="container flex flex-col lg:flex-row gap-14">
      <AboutPR {config} />
      <AboutForm {config} />
    </div>
  </div>
</div>
