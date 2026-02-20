<script lang="ts">
  import { Dialog } from "bits-ui";
  import { cn, type WithoutChild } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: WithoutChild<Dialog.TriggerProps> = $props();
</script>

<Dialog.Trigger bind:ref data-slot="sheet-trigger" class={cn("", className)} {...restProps} />
