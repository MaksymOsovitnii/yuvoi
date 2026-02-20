<script lang="ts">
  import { page } from "$app/state";
  import { fieldToZod, type Button, type FormField } from "$modules/common";
  import { z } from "zod";
  import { Form, FormInput, FormTextarea } from "$modules/ui/shadcn";
  import { toast } from "$lib/toast";
  import Icon from "@iconify/svelte";

  interface Props {
    config: {
      formFields: FormField[];
      submitButton: Button;
      underForm?: string;
    };
    submitAction?: (values: Record<string, string>) => Promise<unknown>;
  }

  let { config, submitAction }: Props = $props();

  const buildInitialData = (formFields: FormField[]): Record<string, string> =>
    Object.fromEntries((formFields ?? []).map((f) => [f.fieldId, ""]));

  let formKey = $state(0);
  let isLoading = $state(false);

  const locale = $derived(() => (page.url.pathname.startsWith("/en") ? "en" : "de"));

  const formData = $derived(buildInitialData(config.formFields));

  const schema = $derived(() =>
    z.object(
      Object.fromEntries(
        (config.formFields ?? []).map((field) => [field.fieldId, fieldToZod(field)]),
      ),
    ),
  );

  const computeColSpans = (fields: FormField[]): Map<number, string> => {
    const result = new Map<number, string>();

    let i = 0;
    while (i < fields.length) {
      const field = fields[i];

      if (field.type === "textarea") {
        result.set(i, "col-span-2");
        i++;
        continue;
      }

      const groupStart = i;
      while (i < fields.length && fields[i].type === "input") {
        i++;
      }
      const groupEnd = i;
      const groupSize = groupEnd - groupStart;

      for (let j = groupStart; j < groupEnd; j++) {
        if (groupSize % 2 !== 0 && j === groupEnd - 1) {
          result.set(j, "col-span-2");
        } else {
          result.set(j, "");
        }
      }
    }

    return result;
  };

  const colSpans = $derived(computeColSpans(config.formFields));

  const submitForm = async (values: Record<string, string>) => {
    isLoading = true;

    for (const field of config.formFields) {
      if (field.required && !values[field.fieldId]) {
        toast(`"${field.label}" is required.`, "error");
        isLoading = false;
        return;
      }
    }

    try {
      await submitAction?.({ ...values, userLocale: locale() });
      toast("Your form was successfully submitted. We will get back to you soon.", "success");
      formKey++;
    } catch (error) {
      toast(error?.message || "Something went wrong. Try again later", "error");
    } finally {
      isLoading = false;
    }
  };
</script>

{#if config.formFields?.length}
  <div class="container flex flex-col items-center mb-10">
    {#key formKey}
      <Form.Root
        schema={schema()}
        initialData={formData}
        action={submitForm}
        class="flex flex-col justify-center w-full max-w-[700px]"
      >
        {#snippet children({ values, errors })}
          <div class="grid grid-cols-2 gap-x-4 gap-y-6 bg-white p-6 shadow-md rounded-lg">
            {#each config.formFields as field, ind (field.id)}
              {#if field.type === "input"}
                <FormInput.Root
                  id={field.fieldId}
                  label={field.label}
                  placeholder={field.placeholder}
                  type="text"
                  required={field.required}
                  bind:value={values[field.fieldId]}
                  error={errors[field.fieldId]}
                  class={colSpans.get(ind)}
                />
              {:else if field.type === "textarea"}
                <FormTextarea.Root
                  id={field.fieldId}
                  label={field.label}
                  placeholder={field.placeholder}
                  required={field.required}
                  bind:value={values[field.fieldId]}
                  error={errors[field.fieldId]}
                  class={colSpans.get(ind)}
                />
              {/if}
            {/each}
          </div>
        {/snippet}

        {#snippet buttons()}
          <button
            class="
              flex items-center gap-3 w-max mx-auto my-4 bg-primary h-14 pl-6 pr-4 text-white rounded-full font-semibold
              cursor-pointer hover:shadow-inner {isLoading ? 'opacity-50 pointer-events-none' : ''}
            "
            type="submit"
            disabled={isLoading}
          >
            {config.submitButton.label}
            <span class="flex w-10 h-10 rounded-full bg-white/25">
              <Icon
                icon="lucide:{isLoading ? 'loader' : 'send'}"
                class="w-5 h-5 m-auto text-white {isLoading ? 'animate-spin' : ''}"
              />
            </span>
          </button>

          {#if config.underForm}
            <p class="text-center text-dark-grey/70">{config.underForm}</p>
          {/if}
        {/snippet}
      </Form.Root>
    {/key}
  </div>
{/if}

<style>
  :global(textarea) {
    min-height: 120px;
  }
</style>
