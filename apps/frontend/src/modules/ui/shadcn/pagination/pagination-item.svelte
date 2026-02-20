<script lang="ts">
  import { cn } from "$lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  type Props = HTMLAttributes<HTMLLIElement> & {
    class?: string;
    children?: Snippet;
  };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<li class={cn("", className)} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</li>
