<script lang="ts">
  import Icon from "@iconify/svelte";

  type Props = {
    size?: "sm" | "md" | "lg";
    class?: string;
  };

  let { size = "md", class: className = "" }: Props = $props();

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };
</script>

<div class="flex items-center justify-center {className}">
  <Icon icon="svg-spinners:ring-resize" class="{sizeClasses[size]} text-primary animate-spin" />
</div>
