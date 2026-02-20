<script lang="ts">
  import { Field, Select } from "$modules/ui/shadcn";
  import type { WithElementRef } from "$lib/utils";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    value = $bindable([]),
    options = $bindable([]),
    class: className = "",
    id,
    label = "",
    placeholder = "",
    hint = "",
    required = false,
    disabled = false,
    type = "single",
    error = "",
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    id: string;
    label?: string;
    placeholder?: string;
    hint?: string;
    required?: boolean;
    disabled?: boolean;
    type?: "single" | "multiple";
    value?: string[];
    options: { label: string; value: string }[];
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

  <Select.Root {type} {disabled} {required} bind:value={value as any} allowDeselect>
    <Select.Trigger class="w-[180px] bg-white {value?.[0] ? '' : 'text-muted-foreground'}" {id}>
      {#if type === "multiple"}
        {value?.length ? value.join(", ") : placeholder}
      {:else}
        {value?.[0] ? value : placeholder}
      {/if}
    </Select.Trigger>
    <Select.Content>
      {#each options as option, index (index)}
        <Select.Item value={option.value} label={option.label}></Select.Item>
      {/each}
    </Select.Content>
  </Select.Root>

  {#if hint || error}
    <Field.Description class={error ? "text-red-600" : ""}>{error || hint}</Field.Description>
  {/if}
</Field.Field>
