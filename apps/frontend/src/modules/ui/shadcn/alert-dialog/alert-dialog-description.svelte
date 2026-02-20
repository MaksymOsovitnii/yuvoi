<script lang="ts">
  import { AlertDialog } from "bits-ui";
  import { cn, type WithoutChild } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: WithoutChild<AlertDialog.DescriptionProps> = $props();
</script>

<AlertDialog.Description
  bind:ref
  data-slot="alert-dialog-description"
  class={cn("text-sm text-muted-foreground", className)}
  {...restProps}
/>
