<script lang="ts">
  import { Tabs as TabsPrimitive } from "bits-ui";
  import { cn } from "$lib/utils.js";

  let { ref = $bindable(null), class: className, ...restProps }: TabsPrimitive.ListProps = $props();
</script>

<TabsPrimitive.List
  bind:ref
  data-slot="tabs-list"
  class={cn(
    "shadow-[inset_0_0_2px_#3333] bg-muted text-muted-foreground inline-flex items-center justify-center rounded-lg p-[3px]",
    "h-9 w-fit",
    "max-sm:flex-col max-sm:h-fit max-sm:gap-[3px]",
    className,
  )}
  {...restProps}
/>
