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

  return (
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
        </DropdownMenuContent>
    </DropdownMenu>
  );
}
