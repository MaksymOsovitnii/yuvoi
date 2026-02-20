<script lang="ts">
  import { AlertDialog } from "bits-ui";
  import { cn, type WithoutChild } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: WithoutChild<AlertDialog.TriggerProps> = $props();
</script>

<AlertDialog.Trigger
  bind:ref
  data-slot="alert-dialog-trigger"
  class={cn("", className)}
  {...restProps}
/>
