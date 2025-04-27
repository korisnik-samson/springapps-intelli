import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { LoginResponse } from "@/types";

type ResponseType = InferResponseType<typeof client.api.workspaces.create['$post']>;

type RequestType = InferRequestType<typeof client.api.workspaces.create['$post']>['json'];

export const useCreateWorkspace = () => {
    const { toast } = useToast();
    const router: AppRouterInstance = useRouter();
    const queryClient = useQueryClient();
    
    return useMutation<ResponseType, Error, RequestType, LoginResponse>({

        mutationFn: async (body): Promise<ResponseType> => {
            const response = await client.api.workspaces.create.$post({ json: body });
            
            if (!response.ok) {
                const error = await response.json().catch((_) => {});
                throw new Error(error?.message || 'Unknown error');
            }
            
            return response.json();
        },
        
        onSuccess: async () => {

            //router.refresh();
            /*if (data.token) localStorage.setItem('JWT_Token', data.token);

            // Show success toast

            // Redirect to dashboard
            router.push('/');
            
            // router.refresh();*/
            toast({
                title: "Project created successfully!",
                description: "Welcome to your new workspace.",
            });
            
            await queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
        
        onError: (error) => {
            // Show error toast
            toast({
                title: "Project creation failed",
                variant: "destructive",
            });
        }

    });
};