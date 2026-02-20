<script lang="ts">
  import { PrivacyPolicyPage, type PrivacyPolicyPageConfig } from "$modules/privacy-policy";

  interface Props {
    data: {
      config: PrivacyPolicyPageConfig;
    };
  }

  const { data }: Props = $props();
</script>

<PrivacyPolicyPage config={data.config} />
