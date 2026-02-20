<script lang="ts">
  import { Field, InputGroup } from "$modules/ui/shadcn";
  import SearchIcon from "@lucide/svelte/icons/search";
  import type { HTMLAttributes } from "svelte/elements";
  import { type WithElementRef } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    value = $bindable(""),
    class: className = "",
    id,
    label = "",
    placeholder = "",
    amount,
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    id: string;
    label?: string;
    placeholder?: string;
    value?: string;
    error?: string;
    class?: string;
    amount?: number;
  } = $props();
</script>

<Field.Field bind:ref class={className}>
  {#if label}
    <Field.Label for={id}>{label}</Field.Label>
  {/if}

  <InputGroup.Root>
    <InputGroup.Input {placeholder} bind:value />
    <InputGroup.Addon>
      <SearchIcon />
    </InputGroup.Addon>
    <InputGroup.Addon align="inline-end">
      {amount ? amount : ""}
      {amount ? (amount === 1 ? "result" : "results") : ""}
    </InputGroup.Addon>
  </InputGroup.Root>
</Field.Field>
