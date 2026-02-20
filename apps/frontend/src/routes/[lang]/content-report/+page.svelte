<script lang="ts">
  import { ContentReportPage, type ContentReportPageConfig } from "$modules/content-report";

  interface Props {
    data: {
      config: ContentReportPageConfig;
    };
  }

  const { data }: Props = $props();
</script>

<ContentReportPage config={data.config} />
