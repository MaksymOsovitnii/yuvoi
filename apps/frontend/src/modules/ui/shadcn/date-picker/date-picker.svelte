<script lang="ts">
  import CalendarIcon from "@lucide/svelte/icons/calendar";
  import { DateFormatter, type DateValue, getLocalTimeZone } from "@internationalized/date";
  import { cn } from "$lib/utils.js";
  import { buttonVariants } from "../button/index.js";
  import { Calendar } from "../calendar/index.js";
  import * as Popover from "../popover/index.js";

  type Props = {
    value?: DateValue | undefined;
    onValueChange?: (value: DateValue | undefined) => void;
    placeholder?: string;
    class?: string;
  };

  let {
    value = $bindable(),
    onValueChange,
    placeholder = "Pick a date",
    class: className,
  }: Props = $props();

  const df = new DateFormatter("en-US", {
    dateStyle: "long",
  });

  let contentRef = $state<HTMLElement | null>(null);
</script>

<Popover.Root>
  <Popover.Trigger
    class={cn(
      buttonVariants({
        variant: "outline",
        class: "w-[280px] justify-start text-start font-normal",
      }),
      !value && "text-muted-foreground",
    )}
  >
    <CalendarIcon />
    {value ? df.format(value.toDate(getLocalTimeZone())) : placeholder}
  </Popover.Trigger>
  <Popover.Content bind:ref={contentRef} class="w-auto p-0">
    <Calendar type="single" bind:value captionLayout="dropdown" />
  </Popover.Content>
</Popover.Root>
