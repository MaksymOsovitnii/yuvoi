<script lang="ts">
  import type { LegalNoticePageConfig } from "$modules/legal-notice";

  interface Props {
    config: LegalNoticePageConfig;
  }

  let { config }: Props = $props();
</script>

<div class="content max-w-[800px] w-full mx-4 py-6 px-8 bg-white rounded-lg shadow-sm">
  {@html config.content}
</div>


<style>
    .content {
        :global(h3) {
            margin-bottom: 0.5rem;
        }
    }
</style>
