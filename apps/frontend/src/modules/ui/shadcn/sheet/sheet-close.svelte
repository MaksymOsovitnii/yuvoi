<script lang="ts">
  import { Dialog } from "bits-ui";
  import { X } from "@lucide/svelte";
  import { cn, type WithoutChild } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: WithoutChild<Dialog.CloseProps> = $props();
</script>

<Dialog.Close
  bind:ref
  data-slot="sheet-close"
  class={cn(
    "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
    className,
  )}
  {...restProps}
>
  <X class="size-4" />
  <span class="sr-only">Close</span>
</Dialog.Close>
