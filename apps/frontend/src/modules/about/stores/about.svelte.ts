import { api } from "$modules/common";

export const aboutStore = {
  async submitForm(data: any) {
    const response = await api.post("/about-submissions", { data });

    if (response?.data?.id && !response.error) {
      return true;
    } else {
      throw response?.error;
    }
  },
};
