<script lang="ts">
  import { AlertDialog } from "bits-ui";
  import { cn, type WithoutChild } from "$lib/utils.js";
  import type { Snippet } from "svelte";

  interface Props extends WithoutChild<AlertDialog.ContentProps> {
    header?: Snippet;
    footer?: Snippet;
    portalProps?: AlertDialog.PortalProps;
  }

  let {
    ref = $bindable(null),
    class: className,
    portalProps,
    header,
    footer,
    children,
    ...restProps
  }: Props = $props();
</script>

<AlertDialog.Portal {...portalProps}>
  <AlertDialog.Overlay
    class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
  />
  <AlertDialog.Content
    bind:ref
    data-slot="alert-dialog-content-scrollable"
    class={cn(
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 w-full max-w-lg max-h-[90vh] translate-x-[-50%] translate-y-[-50%] border bg-background shadow-lg duration-200 sm:rounded-lg flex flex-col gap-2",
      className,
    )}
    {...restProps}
  >
    <div class="shrink-0 p-6 pb-0">
      {#if header}
        {@render header()}
      {/if}
    </div>

    <div class="flex-1 overflow-y-auto px-6 py-4 min-h-0">
      {@render children?.()}
    </div>

    <div class="shrink-0 p-6 pt-0">
      {#if footer}
        {@render footer()}
      {/if}
    </div>
  </AlertDialog.Content>
</AlertDialog.Portal>
