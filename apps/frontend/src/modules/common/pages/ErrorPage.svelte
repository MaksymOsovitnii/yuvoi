<script lang="ts">
  import { Button, Card } from "$modules/ui/shadcn";
  import { resolve } from "$app/paths";
  import { goto } from "$app/navigation";
</script>

<svelte:head>
  <title>404 - Page Not Found</title>
  <meta name="description" content="The page you're looking for doesn't exist" />
</svelte:head>

<div class="min-h-full flex items-center justify-center p-4">
  <Card.Root class="w-full max-w-md py-12 px-8 text-center">
    <h1 class="text-8xl font-bold text-gray-900 mb-1">404</h1>

    <p class="text-gray-600 mb-8">Page not found</p>

    <div class="flex gap-3 justify-center">
      <Button.Button onclick={() => history.back()} variant="outline" class="text-base px-6 py-5"
        >Go Back</Button.Button
      >

      <Button.Button onclick={() => goto(resolve("/"))} class="text-white text-base px-6 py-5"
        >Home</Button.Button
      >
    </div>
  </Card.Root>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
</style>
