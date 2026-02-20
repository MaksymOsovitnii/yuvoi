<script lang="ts">
  import { Field, Checkbox } from "$modules/ui/shadcn";
  import type { WithElementRef } from "$lib/utils";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    value = $bindable(false),
    class: className = "",
    id,
    label = "",
    hint = "",
    disabled = false,
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    id: string;
    label?: string;
    hint?: string;
    disabled?: boolean;
    value?: boolean;
    error?: string;
    class?: string;
  } = $props();
</script>

<Field.Field bind:ref class="flex flex-row gap-3 items-start {className}">
  <Checkbox.Root {id} bind:checked={value} {disabled} class="!w-5 !h-5" />
  <div class="flex flex-col gap-2 justify-center min-h-5">
    <Field.Label for={id}>{label}</Field.Label>
    {#if hint}
      <Field.Description>{hint}</Field.Description>
    {/if}
  </div>
</Field.Field>
