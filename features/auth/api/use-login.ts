import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { LoginResponse } from "@/types";

type ResponseType = InferResponseType<typeof client.api.auth.login['$post']>;

type RequestType = InferRequestType<typeof client.api.auth.login['$post']>['json'];

export const useLogin = () => {
    const router: AppRouterInstance = useRouter();
    const { toast } = useToast();
    
    return useMutation<ResponseType, Error, RequestType, LoginResponse>({

        mutationFn: async (body): Promise<ResponseType> => {
            const response = await client.api.auth.login.$post({ json: body });
            
            return response.json();
        },
        
        onSuccess: async (data: LoginResponse) => {
            if (data.token) localStorage.setItem('JWT_Token', data.token);

            // Show success toast
            toast({
                title: "Login successful!",
                description: "Welcome back to the dashboard.",
            });

            // Redirect to dashboard
            router.push('/dashboard');
        },
        
        onError: (error) => {
            // Show error toast
            toast({
                title: "Login failed",
                description: error.message || "Please check your credentials and try again.",
                variant: "destructive",
            });
        }

    });
};