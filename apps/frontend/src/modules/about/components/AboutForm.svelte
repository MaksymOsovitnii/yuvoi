<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Form, FormInput, FormTextarea } from "$modules/ui/shadcn";
  import { z } from "zod";
  import { toast } from "$lib/toast";
  import { page } from "$app/stores";
  import type { AboutPageConfig } from "$modules/about";
  import { fieldToZod } from "$modules/common";
  import { aboutStore } from "$modules/about/stores/about.svelte";

  interface Props {
    config: AboutPageConfig;
  }

  let { config }: Props = $props();

  let formData = $state<{ [key: string]: string }>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
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
      Object.fromEntries(config.formFields.map((field) => [field.fieldId, fieldToZod(field)])),
    ),
  );

  const submitForm = async (values: Record<string, string>) => {
    isLoading = true;

    for (const field of config.formFields) {
      if (field.required && !values[field.fieldId]) {
        toast(`"${field.label}" is required.`, "error");
        isLoading = false;
        return;
      }
    }

    // todo: internationalize?
    try {
      await aboutStore.submitForm({ ...values, userLocale: locale() });
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

<div
  class="flex-1 flex flex-col items-center max-w-[500px] max-lg:mt-4 max-lg:w-full max-lg:mx-auto py-5 sm:py-7 px-4 sm:px-8 bg-white shadow-md rounded-2xl"
>
  <p class="w-full mb-6 text-left text-2xl font-bold">{config.formTitle}</p>
  {#key formKey}
    <Form.Root
      schema={schema()}
      initialData={formData}
      action={submitForm}
      class="flex flex-col justify-center w-full"
    >
      {#snippet children({ values, errors })}
        <div class="grid grid-cols-2 gap-x-4 gap-y-4 xl:gap-y-6">
          {#each config.formFields as field, idx (field.id)}
            {#if field.type === "input"}
              <FormInput.Root
                id={field.fieldId}
                label={field.label}
                placeholder={field.placeholder}
                type="text"
                required={field.required}
                bind:value={values[field.fieldId]}
                error={errors[field.fieldId]}
                class={idx >= 2 ? "col-span-2" : "max-xl:col-span-2"}
              />
            {:else if field.type === "textarea"}
              <FormTextarea.Root
                id={field.fieldId}
                label={field.label}
                placeholder={field.placeholder}
                required={field.required}
                bind:value={values[field.fieldId]}
                error={errors[field.fieldId]}
                class={idx >= 2 ? "col-span-2" : ""}
              />
            {/if}
          {/each}
        </div>
      {/snippet}

      {#snippet buttons()}
        <button
          class="
            flex items-center justify-center gap-3 w-full mt-4 bg-primary h-10 text-white rounded-md font-semibold
            cursor-pointer hover:shadow-inner {isLoading ? 'opacity-50 pointer-events-none' : ''}
          "
          type="submit"
          disabled={isLoading}
        >
          <Icon
            icon="lucide:{isLoading ? 'loader' : 'send'}"
            class="w-4 h-4 text-white {isLoading ? 'animate-spin' : ''}"
          />
          {config.submitButton.label}
        </button>

        {#if config.underForm}
          <p class="text-center text-dark-grey/70">{config.underForm}</p>
        {/if}
      {/snippet}
    </Form.Root>
  {/key}
</div>

<style>
  :global(textarea) {
    min-height: 120px;
  }
</style>
