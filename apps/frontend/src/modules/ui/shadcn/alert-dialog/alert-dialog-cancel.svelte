<script lang="ts">
  import { AlertDialog } from "bits-ui";
  import { cn, type WithoutChild } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: WithoutChild<AlertDialog.CancelProps> = $props();
</script>

<AlertDialog.Cancel
  bind:ref
  data-slot="alert-dialog-cancel"
  class={cn("", className)}
  {...restProps}
/>
