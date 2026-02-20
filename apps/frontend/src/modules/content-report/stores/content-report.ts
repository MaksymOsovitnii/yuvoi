import { api } from "$modules/common";

export const contentReportStore = {
  async submitForm(data: any) {
    // TODO: change where it goes
    const response = await api.post("/content-reports", { data });

    if (response?.data?.id && !response.error) {
      return true;
    } else {
      throw response?.error;
    }
  },
};
