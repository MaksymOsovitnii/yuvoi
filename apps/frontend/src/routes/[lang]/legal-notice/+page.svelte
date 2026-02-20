<script lang="ts">
  import { LegalNoticePage, type LegalNoticePageConfig } from "$modules/legal-notice";

  interface Props {
    data: {
      config: LegalNoticePageConfig;
    };
  }

  const { data }: Props = $props();
</script>

<LegalNoticePage config={data.config} />
