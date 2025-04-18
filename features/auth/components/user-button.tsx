"use client"

import { Loader, LogOut } from "lucide-react";

import { Avatar, AvatarFallback} from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { DottedSeparator } from "@/components/DottedSeparator";
import { useCurrent } from "@/features/auth/api/use-current";
import { UserObject } from "@/types";
import { truncateEmail } from "@/lib/utils";
import { useLogout } from "@/features/auth/api/use-logout";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const UserButton = () => {
    const { data: user, isLoading } = useCurrent();
    const { mutate: logout } = useLogout();
    const router: AppRouterInstance = useRouter();
    
    const handleLogout = (): void => {
        logout()
        router.push('/sign-in')
    }
    
    if (isLoading) {
        return (
            <div className='size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300'>
                <Loader className='size-4 animate-spin text-muted-foreground' />
            </div>
        );
    }
    
    if (!user) return null
    
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { user_id, firstName, lastName, username, email, password } = user.data.user.user as UserObject;
    
    //const tempInitials = tempUser?.name.charAt(0).toUpperCase() + tempUser.name.split(' ')[1].charAt(0).toUpperCase();
    const initials = firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className='outline-none relative'>
                <Avatar className='size-10 hover:opacity-75 transition border border-neutral-300'>
                    <AvatarFallback className='bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center'>
                        {initials}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align='end' side="bottom" className='w-60' sideOffset={10}>
                <div className='flex flex-col items-center justify-center gap-2 px-2.5 py-4'>
                    <Avatar className='size-[52px] border border-neutral-300'>
                        <AvatarFallback className='bg-neutral-200 text-xl font-medium text-neutral-500 flex items-center justify-center'>
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    
                    <div className='flex flex-col items-center justify-center'>
                        <p>{firstName}{' '}{lastName}</p>
                        <p className='text-xs text-neutral-500'>{truncateEmail(email)}</p>
                    </div>
                </div>
                
                <DottedSeparator className='mb-1'/>
                
                <DropdownMenuItem onClick={() => handleLogout()} className='h-10 flex items-center justify-center text-red-700 font-medium cursor-pointer'>
                    <LogOut className="size-4 mr-1" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
