import { api } from '@/redux';

import type {
  PlateType,
  CreatePlateType,
  UpdatePlateType,
} from '@/shared/types';

const baseUrl = 'plate';

export const plateApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPlates: builder.query<PlateType[], { number?: string } | void>({
      query: (params) => ({
        url: baseUrl,
        params: params ?? {},
      }),
      providesTags: ['plate'],
    }),
    createPlate: builder.mutation<PlateType, CreatePlateType>({
      query: (body) => ({
        method: 'POST',
        url: baseUrl,
        body,
      }),
      invalidatesTags: ['plate'],
    }),
    updatePlate: builder.mutation<PlateType, UpdatePlateType>({
      query: ({ id, ...body }) => ({
        method: 'PATCH',
        url: `${baseUrl}/${id}`,
        body,
      }),
      invalidatesTags: ['plate'],
    }),
    deletePlate: builder.mutation<void, number>({
      query: (id) => ({
        method: 'DELETE',
        url: `${baseUrl}/${id}`,
      }),
      invalidatesTags: ['plate'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetPlatesQuery,
  useCreatePlateMutation,
  useUpdatePlateMutation,
  useDeletePlateMutation,
} = plateApi;
