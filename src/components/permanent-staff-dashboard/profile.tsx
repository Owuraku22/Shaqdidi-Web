import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  import { useNavigate } from 'react-router-dom';
  import { useEffect, useState } from 'react';
import { Button } from "../ui/button";

export default function Profile() {
    const navigate = useNavigate();

    return(
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar className="hover:cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>MC</AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4 p-4 gap-2 border-none shadow-sm">
            <p className="text-base">MeshCom Meshack</p>
            <p className="text-sm text-gray-500">commeymeshack@gmail.com</p>
            <div className="flex justify-center items-center mt-2 w-full">
                <Button className='w-full focus-visible:ring-0' variant={'ghost'} onClick={() => {navigate('/sign-in');}}>
                    Logout
                </Button>
            </div>
        </DropdownMenuContent>
    </DropdownMenu>
    )
}

