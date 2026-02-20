<script lang="ts">
  import type { PrivacyPolicyPageConfig } from "$modules/privacy-policy";

  interface Props {
    config: PrivacyPolicyPageConfig;
  }

  let { config }: Props = $props();
</script>

<div class="content max-w-[800px] w-full h-full mx-4 py-6 px-8 bg-white rounded-lg shadow-sm">
  {@html config.content}
</div>

<style>
    :global(iframe) {
        height: 100% !important;
    }

    :global(.wrapper:has(iframe)) {
        height: 100%;
    }
</style>
