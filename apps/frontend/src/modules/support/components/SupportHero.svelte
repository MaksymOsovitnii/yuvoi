<script lang="ts">
  import type { SupportPageConfig } from "$modules/support";

  interface Props {
    config: SupportPageConfig;
  }

  let { config }: Props = $props();
</script>

<div class="content max-w-[800px] mx-4 py-6 px-8 bg-white rounded-lg shadow-sm">Support</div>
