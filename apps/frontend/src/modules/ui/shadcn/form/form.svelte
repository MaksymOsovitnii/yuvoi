<script lang="ts">
  import { createEventDispatcher, type Snippet } from "svelte";
  import type { ZodSchema } from "zod";
  import { toast } from "$lib/toast";
  import type { WithElementRef } from "$lib/utils";
  import type { HTMLAttributes } from "svelte/elements";
  import { Button } from "$modules/ui/shadcn/button";

  interface ChildrenParams {
    values: Record<string, any>;
    errors: Record<string, string>;
  }

  interface FormProps extends Omit<WithElementRef<HTMLAttributes<HTMLDivElement>>, "children"> {
    schema: ZodSchema<any>;
    initialData: Record<string, any>;
    values?: Record<string, any>;
    errors?: Record<string, string>;
    action: (data: Record<string, any>) => void;
    children: Snippet<[ChildrenParams]>;
    buttons?: Snippet;
    class?: string;
  }

  let {
    ref = $bindable(null),
    schema,
    action,
    initialData = $bindable({}),
    values = $bindable({}),
    errors = $bindable({}),
    children,
    buttons,
    class: className = "",
  }: FormProps = $props();

  values = { ...initialData };

  const dispatch = createEventDispatcher();

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    errors = {};

    try {
      const parsed = schema.parse(values);

      dispatch("submit", parsed);

      if (action) {
        action(parsed);
      }
    } catch (err: any) {
      if (err?.issues) {
        errors = Object.fromEntries(err.issues.map((issue: any) => [issue.path[0], issue.message]));
      } else {
        toast("Something went wrong while parsing your data", "error");
      }
    }
  };
</script>

<form class="space-y-4 {className}" onsubmit={handleSubmit}>
  {@render children({ values, errors })}

  {#if buttons}
    {@render buttons()}
  {:else}
    <Button type="submit">Submit</Button>
  {/if}
</form>
