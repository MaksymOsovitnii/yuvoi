<script lang="ts">
  import { AlertDialog } from "bits-ui";
  import { cn, type WithoutChild } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    portalProps,
    children,
    ...restProps
  }: WithoutChild<AlertDialog.ContentProps> & {
    portalProps?: AlertDialog.PortalProps;
  } = $props();
</script>

<AlertDialog.Portal {...portalProps}>
  <AlertDialog.Overlay
    class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
  />
  <AlertDialog.Content
    bind:ref
    data-slot="alert-dialog-content"
    class={cn(
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-h-[95vh] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 rounded-md sm:rounded-lg overflow-y-auto",
      className,
    )}
    {...restProps}
  >
    {@render children?.()}
  </AlertDialog.Content>
</AlertDialog.Portal>
