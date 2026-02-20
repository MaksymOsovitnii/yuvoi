import type { StrapiMedia } from "$modules/common/types/api";
import type { FormField } from "$modules/common";
import { z } from "zod";
import { PUBLIC_STRAPI_URL, PUBLIC_ENV } from "$env/static/public";

const getImageUrl = (image: StrapiMedia, format?: string) => {
  // Return default image if nothing presented
  if (!image?.url) return "/images/template.jpg";

  let url = image.url;

  if (format && image.formats?.[format]?.url) {
    url = image.formats[format].url;
  }

  return `${PUBLIC_ENV === 'local' ? PUBLIC_STRAPI_URL : ''}${url}`;
};

const fieldToZod = (field: FormField) => {
  let schema: any = z.string();

  if (field.fieldId === "email") {
    schema = z.email();
  }

  if (field.required) {
    schema = schema.min(1, `${field.label} is required`);
  }

  return schema;
};

export { getImageUrl, fieldToZod };
