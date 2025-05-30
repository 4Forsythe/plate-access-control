import { api } from '@/redux';

const baseUrl = 'enter';

export const enterApi = api.injectEndpoints({
  endpoints: (builder) => ({
    openEnter: builder.mutation<string, void>({
      query: () => ({
        method: 'POST',
        url: `${baseUrl}/open`,
        responseHandler: 'text',
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useOpenEnterMutation } = enterApi;
