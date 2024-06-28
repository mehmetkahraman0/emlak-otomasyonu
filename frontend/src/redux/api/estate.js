import { ESTATE_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";
import { userApiSlice } from "./users.js";

export const estateApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllEstate: builder.query({
            query: () => `${ESTATE_URL}/all-estate`
        }),
        createEstate: builder.mutation({
            query: (newEstate) => ({
                url: `${ESTATE_URL}`,
                method: "POST",
                body: newEstate
            })
        }),
        updateEstate: builder.mutation({
            query: ({ updateEstate, id }) => ({
                url: `${ESTATE_URL}/estate-update/${id}`,
                method: "PUT",
                body: updateEstate
            })
        }),
        deleteEstate: builder.mutation({
            query: (id) => ({
                url: `${ESTATE_URL}/estate-delete/${id}`,
                method:"DELETE"
            })
        })
    })
})

export const { useGetAllEstateQuery, useCreateEstateMutation, useUpdateEstateMutation, useDeleteEstateMutation} = estateApiSlice;