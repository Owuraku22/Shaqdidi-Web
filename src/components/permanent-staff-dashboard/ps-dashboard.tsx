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
import PersonnelError from "@/personnel-error";

// import PopoverForm from "./details-popover";

const PsDashboardPage = () => {
  const { isMobile } = useMediaQuery();
  // const { user } = useStoreData();
  const user = useStoreData((state) => state.user);

  // // Using useQuery to fetch food joints
  const { data: foodJoints, isLoading: isFoodLoading } =
    useQuery<FoodJointResponse >({
      queryKey: ["foodJoints"],
      queryFn: fetchFoodJoints,
    });

  // // // Using useQuery to fetch available personnels
  const {
    data: personnels,
    isLoading: isPersonnelLoading,
    isError: isPersonnelError,
  } = useQuery<PersonnelResponse >({
    queryKey: ["personnels"],
    queryFn: fetchAvailablePersonnels,
  });

  if (isFoodLoading || isPersonnelLoading) {
    return <div>Loading...</div>;
  }
  if (isPersonnelError) {
    console.log("personnel log: ", personnels);
    return <div>No available personnel</div>;
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
          type="text"
          placeholder="Search"
          className="pl-10  bg-[#CDCDCD80] focus-visible:bg-white "
        />
        <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      </div>

      <div className="grid gap-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5">
        {foodJoints?.joints.map((values) => (
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
                      className=" w-full h-[10rem] rounded-t-xl object-cover object-center"
                    />
                  </div>
                  <div className="px-2 pb-4 pr-4">
                    <h1 className="flex px-2 pb-1 md:px-4 text-[14px] font-[600] font-roboto text-HeadersText  truncate">
                      {values.name}
                      {/* Daavi’s Special Gob3 */}
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
                      className="h-[6em] md:h-[7.5em]  lg:h-[9em] w-full rounded-t-xl object-cover object-center"
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
    </div>
  );
};

export default PsDashboardPage;
