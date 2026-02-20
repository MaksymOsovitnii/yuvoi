<script lang="ts">
  import { Button } from "$modules/ui/shadcn";
  import Icon from "@iconify/svelte";
  import { toastError } from "$lib/toast";

  interface Props {
    selectedFile: File | null;
    accept?: string;
    maxSize?: number;
    onFileSelect: (file: File | null) => void;
  }

  let {
    selectedFile = $bindable(),
    accept = ".csv",
    maxSize = 10 * 1024 * 1024,
    onFileSelect,
  }: Props = $props();

  let isDragging = $state(false);
  let fileInputRef: HTMLInputElement;

  const validateFile = (file: File): boolean => {
    const extension = accept.replace(".", "");
    if (!file.name.endsWith(extension)) {
      toastError(`Please select a ${extension.toUpperCase()} file`);
      return false;
    }

    if (file.size > maxSize) {
      toastError(`File size must be less than ${(maxSize / 1024 / 1024).toFixed(0)}MB`);
      return false;
    }

    return true;
  };

  const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file && validateFile(file)) {
      selectedFile = file;
      onFileSelect(file);
    }
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    isDragging = true;
  };

  const handleDragLeave = () => {
    isDragging = false;
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    isDragging = false;

    const file = event.dataTransfer?.files[0];
    if (file && validateFile(file)) {
      selectedFile = file;
      onFileSelect(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef?.click();
  };

  const removeFile = (e: Event) => {
    e.stopPropagation();
    selectedFile = null;
    onFileSelect(null);
  };

  const formatFileSize = (bytes: number): string => {
    return (bytes / 1024).toFixed(2);
  };
</script>

<div class="space-y-4">
  <input type="file" {accept} class="hidden" bind:this={fileInputRef} onchange={handleFileSelect} />

  <div
    class="border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer {isDragging
      ? 'border-blue-500 bg-blue-50'
      : 'border-gray-300 hover:border-gray-400'}"
    ondragover={handleDragOver}
    ondragleave={handleDragLeave}
    ondrop={handleDrop}
    role="button"
    tabindex="0"
    onclick={triggerFileInput}
    onkeydown={(e) => e.key === "Enter" && triggerFileInput()}
  >
    <Icon
      icon="mdi:cloud-upload"
      class="w-16 h-16 mx-auto mb-4 {isDragging ? 'text-blue-500' : 'text-gray-400'}"
    />

    {#if selectedFile}
      <div class="space-y-2">
        <div class="flex items-center justify-center gap-2 text-green-600">
          <Icon icon="mdi:check-circle" class="w-5 h-5" />
          <span class="font-medium">{selectedFile.name}</span>
        </div>
        <p class="text-sm text-gray-500">
          {formatFileSize(selectedFile.size)} KB
        </p>
        <Button.Root variant="ghost" size="sm" onclick={removeFile} class="mt-2">
          Remove file
        </Button.Root>
      </div>
    {:else}
      <div class="space-y-2">
        <p class="text-lg font-medium text-gray-700">
          Drop your {accept.replace(".", "").toUpperCase()} file here or click to browse
        </p>
        <p class="text-sm text-gray-500">Only {accept} files are accepted</p>
      </div>
    {/if}
  </div>
</div>
