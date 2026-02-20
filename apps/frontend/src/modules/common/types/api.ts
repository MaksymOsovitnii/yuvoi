export interface IStrapi {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiMediaFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface StrapiMedia extends IStrapi {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    [key: string]: StrapiMediaFormat;
    large: StrapiMediaFormat;
    small: StrapiMediaFormat;
    medium: StrapiMediaFormat;
    thumbnail: StrapiMediaFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
}
