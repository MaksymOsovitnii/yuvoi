<script lang="ts">
  import { Dialog } from "bits-ui";

  let { open = $bindable(false), ...restProps }: Dialog.RootProps = $props();
</script>

<Dialog.Root bind:open data-slot="sheet" {...restProps} />
