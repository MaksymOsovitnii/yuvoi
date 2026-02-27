const SYSTEM_FIELDS = ["id", "documentId", "createdAt", "updatedAt", "publishedAt", "locale"];

const LABELS = {
  fullName: "Full name",
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  phone: "Phone",
  userLocale: "Locale",
  message: "Message",
};

export const formatSubmission = (formType: string, data: Record<string, any>) => {
  const fields = Object.entries(data)
    .filter(([key]) => !SYSTEM_FIELDS.includes(key))
    .map(([key, value]) => `${LABELS?.[key] || key}: ${value ?? "-"}`)
    .join("\n");

  return `
<p>New form submission</p>

<p>Form type: <b>${formType}</b></p>

<p>${fields}</p>
  `;
};
