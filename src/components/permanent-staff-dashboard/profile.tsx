import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStoreData } from "@/store/state";

export default function Profile() {
  //   const { user } = useStoreData((state) => state.user);
  const user = useStoreData((state) => state.user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="bg-primary text-white text-[18px] font-roboto">IA</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 p-4 flex flex-col gap-1 border-none shadow-md ">
        <p className="text-lg"> {user?.name}</p>
        <p className="text-[14px] text-gray-500">{user?.email}</p>
        <p className="text-[14px] text-gray-500">{user?.phone_number}</p>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
