<script lang="ts">
  import { Dialog } from "bits-ui";
  import { cn, type WithoutChild } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: WithoutChild<Dialog.TitleProps> = $props();
</script>

<Dialog.Title
  bind:ref
  data-slot="sheet-title"
  class={cn("text-lg font-semibold text-foreground", className)}
  {...restProps}
/>
