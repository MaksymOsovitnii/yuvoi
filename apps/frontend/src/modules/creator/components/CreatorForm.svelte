<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { CreatorPageConfig, CreatorSubmissionFormItem } from "$modules/creator/index.js";
  import { Form, FormInput, FormSelect } from "$modules/ui/shadcn";
  import { z } from "zod";
  import { toast } from "$lib/toast";
  import { creatorStore } from "$modules/creator/stores/creator.svelte";
  import { page } from "$app/stores";

  interface Props {
    config: CreatorPageConfig;
  }

  let { config }: Props = $props();

  let formData = $state<{ [key: string]: string }>({
    fullName: "",
    email: "",
    phone: "",
  });
  let formKey = $state(0);
  let isLoading = $state(false);

  const locale = $derived(() => {
    if ($page.url.pathname.startsWith("/en")) {
      return "en";
    } else {
      return "de";
    }
  });

  const schema = $derived(() =>
    z.object(
      Object.fromEntries(
        config.creatorSubmissionFormItem.map((field) => [field.fieldId, fieldToZod(field)]),
      ),
    ),
  );

  const fieldToZod = (field: CreatorSubmissionFormItem) => {
    let schema: any = z.string();

    if (field.fieldId === "email") {
      schema = z.email();
    }

    if (field.required) {
      schema = schema.min(1, `${field.label} is required`);
    }

    return schema;
  };

  const submitForm = async (values: Record<string, string>) => {
    isLoading = true;

    for (const field of config.creatorSubmissionFormItem) {
      if (field.required && !values[field.fieldId]) {
        toast(`"${field.label}" is required.`, "error");
        isLoading = false;
        return;
      }
    }

    // todo: internationalize?
    try {
      await creatorStore.submitForm({ ...values, userLocale: locale() });
      toast("Your form was successfully submitted. We will get back to you soon.", "success");

      // Reset form
      for (const key in formData) {
        formData[key] = "";
      }
      formKey++;
    } catch (error) {
      toast(error?.message || "Something went wrong. Try again later", "error");
    } finally {
      isLoading = false;
    }
  };
</script>

<div class="container flex flex-col items-center py-12">
  <p class="mb-6 text-2xl font-bold">{config.creatorButton.text}</p>
  {#key formKey}
    <Form.Root
      schema={schema()}
      initialData={formData}
      action={submitForm}
      class="flex flex-col justify-center w-full max-w-[500px]"
    >
      {#snippet children({ values, errors })}
        <div class="grid grid-cols-1 gap-x-4 gap-y-6 p-6 bg-white rounded-lg shadow-sm">
          {#each config.creatorSubmissionFormItem as field (field.id)}
            {#if field.type === "input"}
              <FormInput.Root
                id={field.fieldId}
                label={field.label}
                placeholder={field.placeholder}
                type="text"
                required={field.required}
                bind:value={values[field.fieldId]}
                error={errors[field.fieldId]}
              />
            {:else if field.type === "select"}
              <FormSelect.Root
                id={field.fieldId}
                label={field.label}
                placeholder={field.placeholder}
                required={field.required}
                options={field.options?.split(",")?.map((o) => ({ label: o, value: o })) || []}
                bind:value={values[field.fieldId]}
                error={errors[field.fieldId]}
              />
            {/if}
          {/each}
        </div>
      {/snippet}

      {#snippet buttons()}
        <button
          class="
            flex items-center gap-3 w-max mx-auto my-4 bg-primary py-4 pl-7 pr-8 text-white rounded-full font-semibold
            cursor-pointer hover:shadow-inner {isLoading ? 'opacity-50 pointer-events-none' : ''}
          "
          type="submit"
          disabled={isLoading}
        >
          <Icon
            icon="lucide:{isLoading ? 'loader' : 'sparkles'}"
            class="w-5 h-5 {isLoading ? 'animate-spin' : ''}"
          />
          {config.creatorButton.label}
        </button>

        {#if config.underForm}
          <p class="text-center text-dark-grey/70">{config.underForm}</p>
        {/if}
      {/snippet}
    </Form.Root>
  {/key}
</div>
