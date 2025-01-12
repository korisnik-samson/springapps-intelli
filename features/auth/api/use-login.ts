import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.auth.login['$post']>;
type RequestType = InferRequestType<typeof client.api.auth.login['$post']>['json'];

export const useLogin = () => {
    return useMutation<ResponseType, Error, RequestType>({

        mutationFn: async (body) => {
            const response = await client.api.auth.login.$post({ json: body });

            return response.json();
        },

    });
};