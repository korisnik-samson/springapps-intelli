import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/rpc';

export const useGetWorkspaces = () => {
    return useQuery({
        queryKey: ['projects'],

        queryFn: async () => {
            const response = await client.api.workspaces.$get();
            if (!response.ok) throw new Error('Failed to fetch workspaces');

            const data = await response.json();
            console.log({ data });

            return { data };
        },

        retry: false,
    });
}