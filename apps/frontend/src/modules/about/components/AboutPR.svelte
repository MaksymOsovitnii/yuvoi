<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { AboutPageConfig } from "$modules/about";
  import { toast } from "$lib/toast";

  interface Props {
    config: AboutPageConfig;
  }

  let { config }: Props = $props();

  const icons: { [key: string]: string } = {
    "application/zip": "file-archive",
    "application/pdf": "file-text",
    default: "file",
  };

  const getType = (mime: string) => {
    if (mime === "application/pdf") {
      return "PDF";
    } else if (mime === "application/zip") {
      return "ZIP";
    } else {
      return "File";
    }
  };

  const getSize = (size: number) => {
    if (size < 1024) {
      return `${size} KB`;
    }

    const mb = size / 1024;
    if (mb < 1024) {
      return `${mb.toFixed(2)} MB`;
    }

    const gb = mb / 1024;
    return `${gb.toFixed(2)} GB`;
  };

  const downloadFile = async (url: string, filename?: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      toast("Cannot download file. Try again later.", "error");
      return;
    }

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename || url.split("/").pop() || "file";

    document.body.appendChild(a);
    a.click();

    a.remove();
    URL.revokeObjectURL(blobUrl);

    toast("File downloaded successfully.", "success");
  };
</script>

<div class="flex-1 flex flex-col">
  <h2
    class="mt-6 mb-4 text-white text-[36px] max-lg:text-center sm:text-[40px] font-bold leading-[105%] text-pretty text-shadow-2xs wrap-anywhere"
  >
    {config.prTitle}
  </h2>
  <p class="mb-10 text-white/80 text-sm max-lg:text-center font-light">{config.prText}</p>

  <div class="flex flex-wrap gap-4 max-lg:justify-center">
    {#each config.prItems as item}
      <button
        class="
          flex items-center gap-4 w-max pl-4 pr-5 py-3 bg-white/8 rounded-lg border border-white/15 shadow-sm
          cursor-pointer hover:bg-white/10 transition-colors
        "
        onclick={() => downloadFile(item.url, item.name)}
      >
        <Icon
          icon="lucide:{icons?.[item.mime] || icons.default}"
          class="min-w-6 sm:w-7 h-7 text-primary"
        />
        <div class="flex flex-col items-start gap-1">
          <p class="text-white font-semibold text-left wrap-anywhere">{item.name}</p>
          <p class="text-white/70 text-sm">{getType(item.mime)} · {getSize(item.size)}</p>
        </div>
      </button>
    {/each}
  </div>
</div>
