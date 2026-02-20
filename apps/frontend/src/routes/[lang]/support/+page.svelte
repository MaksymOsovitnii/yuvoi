<script lang="ts">
  import { SupportPage, type SupportPageConfig } from "$modules/support";

  interface Props {
    data: {
      config: SupportPageConfig;
    };
  }

  const { data }: Props = $props();
</script>

<SupportPage config={data.config} />
