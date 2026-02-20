<script lang="ts">
  import { CreatorPage, type CreatorPageConfig } from "$modules/creator/index.js";

  interface Props {
    data: {
      config: CreatorPageConfig;
    };
  }

  const { data }: Props = $props();
</script>

<CreatorPage config={data.config} />
