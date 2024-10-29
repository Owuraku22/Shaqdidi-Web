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
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>IA</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 p-4 gap-2 border-none shadow-sm">
        <p className="text-lg"> {user?.name}</p>
        <p className="text-[14px] text-gray-500">{user?.email}</p>
        {/* <p className="text-[14px] text-gray-500">{user}</p> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
