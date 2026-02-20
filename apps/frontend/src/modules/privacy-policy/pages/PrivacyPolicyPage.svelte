<script lang="ts">
  import PrivacyPolicyContent from "$modules/privacy-policy/components/PrivacyPolicyContent.svelte";
  import type { PrivacyPolicyPageConfig } from "$modules/privacy-policy";

  interface Props {
    config: PrivacyPolicyPageConfig;
  }

  let { config }: Props = $props();
</script>

<div class="relative flex justify-center w-full h-full py-10 z-[0]">
  <PrivacyPolicyContent {config} />
</div>
