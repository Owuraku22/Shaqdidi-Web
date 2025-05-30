import { Input } from "../ui/input";
// import { redirect } from "react-router-dom";
import PopoverForm from "./order-dialog";
import { Icons } from "../icons/icons";
import { DrawerForm } from "./drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { FoodJointResponse, PersonnelResponse } from "@/lib/api";
import { useStoreData } from "@/store/state";
import { fetchAvailablePersonnels, fetchFoodJoints } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import EmptyState from "../nsp/empty-state";
import { Loader2 } from "lucide-react";

const PsDashboardPage = () => {
  const { isMobile } = useMediaQuery();
  const user = useStoreData((state) => state.user);

  const [search, setSearch] = useState("");

  // // Using useQuery to fetch food joints
  const { data: foodJoints, isLoading: isFoodLoading } =
    useQuery<FoodJointResponse>({
      queryKey: ["foodJoints"],
      queryFn: fetchFoodJoints,
    });

  //Filter food joints function
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  //Filting food joints base on search
  const filteredPreviousOrders = foodJoints?.joints?.filter(
    (order) =>
      order.name?.toLowerCase().includes(search?.toLowerCase()) ||
      order.address?.toLowerCase().includes(search?.toLowerCase())
  );

  // // // Using useQuery to fetch available personnels
  const { data: personnels, isLoading: isPersonnelLoading } =
    useQuery<PersonnelResponse>({
      queryKey: ["personnels"],
      queryFn: fetchAvailablePersonnels,
    });

  if (isFoodLoading || isPersonnelLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white">
      <div className="lg:px-4 md:my-2">
        <h2 className="font-[600]  text-[24px] md:text-[44px] font-poppins">
          Hi, {user?.name}!
        </h2>
        <h2 className="text-[16px] md:text-[28px] text-gray-500 font-roboto">
          Browse food joints and place orders
        </h2>
      </div>
      <div className="relative w-[27rem] my-4 mx-1 md:w-64  lg:m-4 md:mb-8 lg:ml-4 bg-[#CDCDCD80] rounded-lg">
        <Input
          onChange={handleSearch}
          type="text"
          placeholder="Search"
          className="pl-10  bg-[#CDCDCD80] focus-visible:bg-white "
        />
        <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      </div>

      {filteredPreviousOrders?.length ? (
        <div className="grid gap-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5">
          {filteredPreviousOrders?.map((values) => (
            <>
              {isMobile ? (
                <DrawerForm
                  foodJoint={values}
                  personnels={personnels!}
                  key={values.id}
                >
                  <div
                    key={values.id}
                    className="rounded-xl  cursor-pointer border"
                  >
                    <div className="rounded-t-xl object-cover mb-1 border ">
                      <img
                        src={values.image_url}
                        className=" w-full h-[10rem] rounded-t-xl object-cover object-center "
                      />
                    </div>
                    <div className="px-2 pb-4 pr-4">
                      <h1 className="flex px-2 pb-1 md:px-4 text-[14px] font-[600] font-roboto text-HeadersText  truncate">
                        {values.name}
                      </h1>
                      <h1 className="flex px-2 md:px-4 text-[12px] font-[300] md:text-[14px] text-[#212121] md:text-sm font-roboto  truncate">
                        {values.address}
                      </h1>
                    </div>
                  </div>
                </DrawerForm>
              ) : (
                <PopoverForm
                  foodJoint={values}
                  personnels={personnels!}
                  key={values.id}
                >
                  <div
                    key={values.id}
                    className="md:my-4 rounded-xl  cursor-pointer w-full border h-[9.5rem] md:md:h-[12rem]  lg:h-[14rem] "
                  >
                    <div className="h-[6em] md:h-[7.5em] lg:h-[9em] rounded-t-xl object-cover mb-1 border ">
                      <img
                        src={values.image_url}
                        className="h-[6em] md:h-[7.5em]  lg:h-[9em] w-full rounded-t-xl object-cover object-center bg-gray-200"
                      />
                    </div>
                    <div className=" pt-2 w-full pr-4">
                      <h1 className="flex text-left px-2 md:px-4 text-[20px] font-[600] text-HeadersText font-roboto truncate">
                        {values.name}
                      </h1>
                      <h1 className="flex px-4 text-[14px] font-[300] text-[#212121]  font-roboto truncate">
                        {values.address}
                      </h1>
                    </div>
                  </div>
                </PopoverForm>
              )}
            </>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <img
            src="/no-history.png"
            alt="Empty clipboard"
            className="w-32 h-32 mb-4"
          />
          <p className="text-lg  mb-4 text-ring">No order found</p>
        </div>
      )}
    </div>
  );
};

export default PsDashboardPage;
