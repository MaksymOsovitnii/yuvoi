<script lang="ts">
  import { onMount } from "svelte";
  import "$lib/assets/css/main.css";
  import Toaster from "../../modules/common/components/Toaster.svelte";
  import type { Snippet } from "svelte";
  import { Header } from "$modules/common/components";
  import type { FooterItems, NavItem } from "$modules/common/types/ui";
  import Footer from "$modules/common/components/Footer.svelte";

  interface Props {
    children?: Snippet;
    data: {
      navItems: NavItem[];
      footer: FooterItems;
    };
  }

  let { children, data }: Props = $props();

  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  onMount(() => {
    setVh();

    window.addEventListener("resize", setVh);
    window.addEventListener("orientationchange", setVh);

    return () => {
      window.removeEventListener("resize", setVh);
      window.removeEventListener("orientationchange", setVh);
    };
  });
</script>

<div class="wrapper min-h-full bg-gray-50 flex flex-col">
  <Header navItems={data.navItems} />

  <main class="flex-1 flex">
    {@render children?.()}
  </main>

  <Footer items={data.footer} />
</div>

<Toaster />

<svelte:head>
  <!-- meta -->
  <meta name="robots" content="index,follow" />
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1 viewport-fit=cover" />
  <meta name="msapplication-TileColor" content="#FF6E32" />
  <meta name="msapplication-config" content="/icons/browserconfig.xml" />
  <meta name="theme-color" content="#FF6E32" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Yuvoi" />
  <meta property="og:url" content="https://yuvoi-8bt22.ondigitalocean.app/" />
  <meta property="og:image" content="https://yuvoi-8bt22.ondigitalocean.app/favicon.png" />
  <meta
    property="og:image:secure_url"
    content="https://yuvoi-8bt22.ondigitalocean.app/favicon.png"
  />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="https://yuvoi-8bt22.ondigitalocean.app/" />
  <meta name="twitter:creator" content="Yuvoi" />

  <!-- favicon -->
  <link rel="apple-touch-icon" sizes="152x152" href="/icons/yuvoi/logo_152x152.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/icons/yuvoi/logo_32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/icons/yuvoi/logo_16x16.png" />
  <link rel="manifest" href="/icons/site.webmanifest" />
  <link
    rel="mask-icon"
    href="/icons/yuvoi-bildmarke/svg/yuvoi-logo_Bildmarke-farbig.svg"
    color="#FF6E32"
  />
  <link rel="shortcut icon" href="/icons/favicon.ico" />

  <!-- JSON-LD -->
  <script id="organization-schema" type="application/ld+json">
    {
      JSON.stringify({
        "@type": "Organization",
        "@context": "https://schema.org",
        name: "Yuvoi",
        url: "https://yuvoi-8bt22.ondigitalocean.app/",
        logo: "https://yuvoi-8bt22.ondigitalocean.app/logo.png",
        description: "Yuvoi",
        foundingDate: "2026",
        founders: [
          {
            '@type': 'Person',
            name: 'Yuvoi'
          },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Support",
          email: "yuvoi@gmail.com",
          telephone: "+12345",
        },
        sameAs: [],
      });
    }
  </script>
</svelte:head>
