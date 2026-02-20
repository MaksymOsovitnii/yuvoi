<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  type Props = HTMLAttributes<HTMLUListElement> & {
    class?: string;
    totalPages?: number;
    page?: number;
    children?: Snippet<[{ totalPages: number; page: number }]>;
  };

  let { class: className, totalPages = 0, page = 1, children, ...restProps }: Props = $props();
</script>

<ul class="flex flex-row items-center gap-1" {...restProps}>
  {#if children}
    {@render children({ totalPages, page })}
  {/if}
</ul>
