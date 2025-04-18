import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/rpc';

export const useCurrent = () => {
    return useQuery({
        queryKey: ['user'],
        
        queryFn: async () => {
            const response = await client.api.auth.current.$get();
            if (!response.ok) throw new Error('Failed to fetch current user');
            
            const data = await response.json();
            console.log({ data });
            
            return { data };
        },
        
        retry: false,
    });
}