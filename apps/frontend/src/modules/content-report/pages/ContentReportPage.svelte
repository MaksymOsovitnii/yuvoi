<script lang="ts">
  import { Form } from "$modules/common";
  import {
    ContentReportHero,
    contentReportStore,
    type ContentReportPageConfig,
  } from "$modules/content-report";

  interface Props {
    config: ContentReportPageConfig;
  }

  let { config }: Props = $props();
</script>

<div class="relative w-full h-full z-[0]">
  <ContentReportHero {config} />
  <Form {config} submitAction={contentReportStore.submitForm} />
</div>
