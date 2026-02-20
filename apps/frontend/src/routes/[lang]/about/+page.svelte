<script lang="ts">
  import { AboutPage, type AboutPageConfig } from "$modules/about";

  interface Props {
    data: {
      config: AboutPageConfig;
    };
  }

  const { data }: Props = $props();
</script>

<AboutPage config={data.config} />
