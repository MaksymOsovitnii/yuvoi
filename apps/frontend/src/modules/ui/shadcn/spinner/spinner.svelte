<script lang="ts">
  import { cn } from "$lib/utils.js";
  import { Loader2 } from "@lucide/svelte";

  type Props = {
    class?: string;
    size?: number | string;
  };

  let { class: className, size = 16, ...restProps }: Props = $props();
</script>

<Loader2
  role="status"
  aria-label="Loading"
  class={cn("animate-spin", className)}
  {size}
  {...restProps}
/>
