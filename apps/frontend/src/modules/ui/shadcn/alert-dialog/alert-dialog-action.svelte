<script lang="ts">
  import { AlertDialog } from "bits-ui";
  import { cn, type WithoutChild } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: WithoutChild<AlertDialog.ActionProps> = $props();
</script>

<AlertDialog.Action
  bind:ref
  data-slot="alert-dialog-action"
  class={cn("", className)}
  {...restProps}
/>
