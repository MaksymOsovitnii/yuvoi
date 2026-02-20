<script lang="ts">
  import { cn } from "$lib/utils.js";
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  type Props = HTMLAnchorAttributes & {
    class?: string;
    isActive?: boolean;
    children?: Snippet;
  };

  let { class: className, isActive = false, children, ...restProps }: Props = $props();
</script>

<a
  class={cn(
    "inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    isActive && "bg-primary text-primary-foreground cursor-pointer",
    className,
  )}
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</a>
