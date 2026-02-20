<script lang="ts">
  import { AlertDialog } from "bits-ui";
  import { cn, type WithoutChild } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: WithoutChild<AlertDialog.TitleProps> = $props();
</script>

<AlertDialog.Title
  bind:ref
  data-slot="alert-dialog-title"
  class={cn("text-lg font-semibold", className)}
  {...restProps}
/>
