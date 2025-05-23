import { InferResponseType, InferRequestType } from "hono";
import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.auth.logout.$post>;

export const useLogout = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    
    const mutation = useMutation<ResponseType, Error>({
        
        mutationFn: async () => {
            const response = await client.api.auth.logout.$post();
            
            if (!response.ok) {
                const error = await response.json().catch((_) => {});
                throw new Error(error?.message || 'Failed to logout');
            }
            
            return await response.json() as ResponseType;
        },
        onSuccess: async (data) => {
            // console.log({ data });

            // window.location.reload()
            router.refresh()
            
            // Invalidate the current user query to refetch the user
            await queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        
    });
    
    return {
        ...mutation,
        logout: mutation.mutateAsync,
    };
}