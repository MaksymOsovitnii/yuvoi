<script lang="ts">
  import { Form } from "$modules/common";
  import { InvestorsHero, InvestorsPartners, type InvestorsPageConfig } from "$modules/investors";
  import { investorsStore } from "../stores/investors.svelte";

  interface Props {
    config: InvestorsPageConfig;
  }

  let { config }: Props = $props();
</script>

<div class="relative w-full h-full z-[0]">
  <InvestorsHero {config} />
  <Form {config} submitAction={investorsStore.submitForm} />
  <InvestorsPartners {config} />
</div>
