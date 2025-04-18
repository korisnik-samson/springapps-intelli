import { InferResponseType, InferRequestType } from "hono";
import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ResponseType = InferResponseType<typeof client.api.auth.logout.$post>;

export const useLogout = () => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation<ResponseType, Error>({
        
        mutationFn: async () => {
            const response = await client.api.auth.logout.$post();
            if (!response.ok) throw new Error('Failed to logout');
            
            return await response.json() as ResponseType;
        },
        onSuccess: async (data) => {
            console.log({ data });
            // Invalidate the current user query to refetch the user
            await queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });
    
    return {
        ...mutation,
        logout: mutation.mutateAsync,
    };
}