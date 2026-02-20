<script lang="ts">
  import { InvestorsPage, type InvestorsPageConfig } from "$modules/investors";

  interface Props {
    data: {
      config: InvestorsPageConfig;
    };
  }

  const { data }: Props = $props();
</script>

<InvestorsPage config={data.config} />
