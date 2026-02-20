<script lang="ts">
  import { HomePage } from "$modules/home";

  const { data } = $props();
</script>

<HomePage config={data.config} />
