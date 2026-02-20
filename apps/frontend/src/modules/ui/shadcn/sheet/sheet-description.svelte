<script lang="ts">
  import { Dialog } from "bits-ui";
  import { cn, type WithoutChild } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: WithoutChild<Dialog.DescriptionProps> = $props();
</script>

<Dialog.Description
  bind:ref
  data-slot="sheet-description"
  class={cn("text-sm text-muted-foreground", className)}
  {...restProps}
/>
