<script lang="ts">
  import { LegalNoticeContent, type LegalNoticePageConfig } from "$modules/legal-notice";

  interface Props {
    config: LegalNoticePageConfig;
  }

  let { config }: Props = $props();
</script>

<div class="relative flex justify-center w-full h-full py-10 z-[0]">
  <LegalNoticeContent {config} />
</div>