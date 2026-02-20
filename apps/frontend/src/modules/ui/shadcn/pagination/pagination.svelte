<script lang="ts">
  import { cn } from "$lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  type Props = HTMLAttributes<HTMLElement> & {
    class?: string;
    count?: number;
    perPage?: number;
    page?: number;
    siblingCount?: number;
    children?: Snippet<[{ totalPages: number; page: number }]>;
  };
  let {
    class: className,
    count = 0,
    perPage = 10,
    page = $bindable(1),
    siblingCount = 1,
    children,
    ...restProps
  }: Props = $props();

  let totalPages = $derived(Math.ceil(count / perPage));
</script>

<nav
  aria-label="pagination"
  class={cn("mx-auto flex w-full justify-center", className)}
  {...restProps}
>
  {#if children}
    {@render children({ totalPages, page })}
  {/if}
</nav>
