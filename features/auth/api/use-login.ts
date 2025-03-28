import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.auth.login['$post']>;
type RequestType = InferRequestType<typeof client.api.auth.login['$post']>['json'];

export const useLogin = () => {
    return useMutation<ResponseType, Error, RequestType>({

        mutationFn: async (body): Promise<{ message: string }> => {
            const response = await client.api.auth.login.$post({ json: body });

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            return response.json();
        },

    });
};