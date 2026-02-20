<script lang="ts">
  import { Button } from "$modules/ui/shadcn";
  import type { MouseEventHandler, HTMLButtonAttributes } from "svelte/elements";

  type Props = HTMLButtonAttributes & {
    class?: string;
    page?: number;
    totalPages?: number;
    onclick?: MouseEventHandler<HTMLButtonElement>;
  };

  let { class: className, page = $bindable(1), totalPages = 1, onclick }: Props = $props();

  let disabled = $derived(page >= totalPages);

  const handleClick = (e: any) => {
    if (!disabled) {
      page = page + 1;
      onclick?.(e);
    }
  };
</script>

<Button.Button variant="outline" size="icon" {disabled} class={className} onclick={handleClick}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
  <span class="sr-only">Go to next page</span>
</Button.Button>
