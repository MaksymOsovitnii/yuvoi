import { api } from "$modules/common";

export const investorsStore = {
  async submitForm(data: any) {
    const response = await api.post("/investor-submissions", { data });

    if (response?.data?.id && !response.error) {
      return true;
    } else {
      throw response?.error;
    }
  },
};
