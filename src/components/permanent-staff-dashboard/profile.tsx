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
    <DropdownMenu >
        <DropdownMenuTrigger>
            <Avatar className="w-7 h-7 hover:cursor-pointer font-roboto font-[500]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>MC</AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4 p-4 gap-2 border-none shadow-sm font-roboto">
            <p className="text-[18px] font-[500] text-black">MeshCom Meshack</p>
            <p className="text-[16px] font-[500] text-gray-500">commeymeshack@gmail.com</p>
            <p className="text-[16px] font-[500] text-gray-500">02388473384</p>
        </DropdownMenuContent>
    </DropdownMenu>
    )
}

