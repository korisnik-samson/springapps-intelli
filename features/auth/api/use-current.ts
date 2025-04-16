import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/rpc';
import { getSessionFromResponse } from "@/lib/session";

export const useCurrent = () => {
    return useQuery({
        queryKey: ['user'],
        
        queryFn: async () => {
            const response = await client.api.auth.current.$get();
            if (!response.ok) throw new Error('Failed to fetch current user');

            // const sessionUser = getSessionFromResponse(response);
            // if (sessionUser) return { user: sessionUser };
            
            return await response.json();
        },
        
        retry: false,
        refetchOnWindowFocus: false,
    });
}