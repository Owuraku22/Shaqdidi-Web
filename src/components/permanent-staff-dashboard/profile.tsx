import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  import { useNavigate } from 'react-router-dom';
  import { useEffect, useState } from 'react';

export default function Profile() {
    const isProfilePicAvailable = false;

    return(
    <DropdownMenu >
        <DropdownMenuTrigger>
        {
            isProfilePicAvailable ? (
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>IA</AvatarFallback>
                </Avatar>
            ) : (
                <div className="w-10 h-10 bg-primary-foreground rounded-full text-center pt-2 cursor-pointer">IA</div>
            )
        }
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4 p-4 gap-2 border-none shadow-sm">
            <p className="text-lg">Isaiah Amo Mensah</p>
            <p className="text-[14px] text-gray-500">isaiaham@gmail.com</p>
        </DropdownMenuContent>
    </DropdownMenu>
    )
}

