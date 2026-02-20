<script lang="ts">
  import { Field, Textarea } from "$modules/ui/shadcn";
  import type { WithElementRef } from "$lib/utils";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    value = $bindable(""),
    class: className = "",
    id,
    label = "",
    placeholder = "",
    hint = "",
    required = false,
    disabled = false,
    error = "",
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    id: string;
    label?: string;
    placeholder?: string;
    hint?: string;
    required?: boolean;
    disabled?: boolean;
    value?: string;
    error?: string;
    class?: string;
  } = $props();
</script>

<Field.Field bind:ref class={className}>
  {#if label}
    <Field.Label for={id}>
      {label}
      {#if required}
        <span class="-ml-1 text-red-700">*</span>
      {/if}
    </Field.Label>
  {/if}

  <Textarea.Root {id} {placeholder} {required} {disabled} bind:value class="bg-white" />

  {#if hint || error}
    <Field.Description class={error ? "text-red-600" : ""}>{error || hint}</Field.Description>
  {/if}
</Field.Field>
