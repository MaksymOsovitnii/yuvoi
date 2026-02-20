<script lang="ts">
  import { Field, Input, InputGroup } from "$modules/ui/shadcn";
  import { Eye, EyeOff } from "@lucide/svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { type WithElementRef } from "$lib/utils.js";

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
    readonly = false,
    type = "text",
    error = "",
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    id: string;
    label?: string;
    placeholder?: string;
    hint?: string;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    type?: string;
    value?: string;
    error?: string;
    class?: string;
  } = $props();

  let showPassword = $state(false);
  const isPasswordType = $derived(type === "password");
  const inputType = $derived(isPasswordType && showPassword ? "text" : type);

  const togglePasswordVisibility = () => {
    if (!disabled) {
      showPassword = !showPassword;
    }
  };
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

  {#if isPasswordType}
    <InputGroup.Root class={error ? "border-red-600" : ""}>
      <InputGroup.Input
        {id}
        type={inputType}
        {placeholder}
        {required}
        {disabled}
        {readonly}
        {...restProps}
        bind:value
      />
      <InputGroup.Addon align="inline-end">
        <button
          type="button"
          onclick={togglePasswordVisibility}
          {disabled}
          class="mr-1 cursor-pointer hover:opacity-70 transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {#if showPassword}
            <EyeOff class="size-4" />
          {:else}
            <Eye class="size-4" />
          {/if}
        </button>
      </InputGroup.Addon>
    </InputGroup.Root>
  {:else}
    <Input.Root
      {id}
      {type}
      {placeholder}
      {required}
      {disabled}
      {readonly}
      {...restProps}
      bind:value
      class={error ? "border-red-600" : ""}
    />
  {/if}

  {#if hint || error}
    <Field.Description class={error ? "text-red-600" : ""}>
      {error || hint}
    </Field.Description>
  {/if}
</Field.Field>
