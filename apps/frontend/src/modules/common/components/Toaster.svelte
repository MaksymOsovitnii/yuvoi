<script lang="ts">
  import { toastStore } from "$lib/toast-store.js";
  import { CheckCircle2, XCircle, Info, AlertTriangle, X } from "@lucide/svelte";
  import { cn } from "$lib/utils.js";

  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case "success":
        return "bg-green-50 border-green-200 text-green-900 [&_svg]:text-green-600";
      case "error":
        return "bg-red-50 border-red-200 text-red-900 [&_svg]:text-red-600";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-900 [&_svg]:text-yellow-600";
      case "info":
      default:
        return "bg-blue-50 border-blue-200 text-blue-900 [&_svg]:text-blue-600";
    }
  };

  const getIcon = (variant: string) => {
    switch (variant) {
      case "success":
        return CheckCircle2;
      case "error":
        return XCircle;
      case "warning":
        return AlertTriangle;
      case "info":
      default:
        return Info;
    }
  };
</script>

<div
  class="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-max max-w-[calc(100%-32px)] pointer-events-none"
  role="region"
  aria-label="Notifications"
>
  {#each $toastStore as toastItem (toastItem.id)}
    {@const Icon = getIcon(toastItem.variant)}
    <div
      class={cn(
        "pointer-events-auto flex items-start gap-3 rounded-lg border p-4 shadow-lg transition-all animate-in slide-in-from-right-full",
        getVariantStyles(toastItem.variant),
      )}
      role="alert"
    >
      <Icon class="size-5 shrink-0 mt-0.5" />
      <div class="flex-1 min-h-6 text-sm font-medium place-content-center">{toastItem.message}</div>
      <button
        type="button"
        class="shrink-0 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer"
        onclick={() => toastStore.remove(toastItem.id)}
        aria-label="Close notification"
      >
        <X class="size-4" />
      </button>
    </div>
  {/each}
</div>

<style>
  @keyframes slide-in-from-right-full {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  .animate-in {
    animation: slide-in-from-right-full 0.3s ease-out;
  }
</style>
