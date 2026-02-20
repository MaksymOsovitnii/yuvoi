import { api } from "$modules/common";

export const creatorStore = {
  async submitForm(data: any) {
    const response = await api.post("/creator-submissions", { data });

    if (response?.data?.id && !response.error) {
      return true;
    } else {
      throw response?.error;
    }
  },
};
