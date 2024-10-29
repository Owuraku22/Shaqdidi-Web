import { Input } from "../ui/input";
// import { redirect } from "react-router-dom";
import PopoverForm from "./dialog";
import { Icons } from "../icons/icons";
import { DrawerForm } from "./drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useActionData, useLoaderData } from "react-router-dom";
import {
  AuthResponse,
  FoodJoint,
  FoodJointResponse,
  Personnel,
  PersonnelResponse,
} from "@/lib/api";
import { useStoreData } from "@/store/state";
import { fetchAvailablePersonnels, fetchFoodJoints } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

// import PopoverForm from "./details-popover";

const PsDashboardPage = () => {
  // const { foodJoints, personnels } = useLoaderData() as {
  //   foodJoints: FoodJointResponse | undefined;
  //   personnels: PersonnelResponse | undefined;
  // };
  const { isMobile } = useMediaQuery();
  // const { user } = useStoreData();
  const user = useStoreData((state) => state.user);

  // fetchFoodJoints().then((data) => console.log("Fetched foodjoints :", data.message));

  // const { data: foodJoints, isLoading: isFoodLoading } = useQuery<
  //   FoodJoint[] | undefined
  // >({
  //   queryKey: ["foodJoints"],
  //   queryFn: fetchFoodJoints,
  // });

  // // Using useQuery to fetch food joints
  const { data: foodJoints, isLoading: isFoodLoading } = useQuery<
    FoodJointResponse | undefined
  >({
    queryKey: ["foodJoints"],
    queryFn: fetchFoodJoints,
  });

  // // // Using useQuery to fetch available personnels
  const { data: personnels, isLoading: isPersonnelLoading } = useQuery<
    PersonnelResponse | undefined
  >({
    queryKey: ["personnels"],
    queryFn: fetchAvailablePersonnels,
  });

  if (isFoodLoading || isPersonnelLoading) {
    return <div>Loading...</div>;
  }

  if (!foodJoints || !personnels) {
    return <div>Failed to load data</div>;
  }

  // console.log("Users mail:", user?.email);
  // console.log("Available Personnels are:", personnels?.personnels);

  return (
    <div className="flex flex-col bg-white">
      {/* {personnels?.personnels.map((personnel) => (
        <h1> hell{personnel.name}</h1>
      ))} */}
      <div className="h-[5em] lg:px-4 md:my-4">
        <h2 className="font-bold text-2xl md:text-3xl font-poppins">
          Hi, {user?.name}!
        </h2>
        <h2 className="my-4 md:text-2xl text-gray-500 font-roboto">
          Browse food joints and place orders
        </h2>
      </div>
      <div className="relative w-[27rem] my-4 mx-1 md:w-64  lg:m-4 md:mb-8 lg:ml-4">
        <Input type="text" placeholder="Search" className="pl-10 " />
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
                  <h1 className="flex px-2 md:px-4 pt-1 font-bold text-sm md:text-[1.1em] ">
                    {values.name}
                    {/* Daavi’s Special Gob3 */}
                  </h1>
                  <h1 className="flex px-2 md:px-4 text-[0.8em] md:text-sm font-roboto">
                    {values.address}
                  </h1>
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
                  className="md:my-4 rounded-xl  cursor-pointer w-full border h-[9.5em] md:md:h-[12em]  lg:h-[13.5em] "
                >
                  <div className="h-[6em] md:h-[7.5em] lg:h-[9em] rounded-t-xl object-cover mb-1 border ">
                    <img
                      src={values.image_url}
                      className="h-[6em] md:h-[7.5em]  lg:h-[9em] w-full rounded-t-xl object-cover object-center"
                    />
                  </div>
                  <h1 className="flex px-2 md:px-4 pt-1 font-bold text-sm md:text-[1.1em] ">
                    {values.name}
                    {/* Daavi’s Special Gob3 */}
                  </h1>
                  <h1 className="flex px-2 md:px-4 text-[0.8em] md:text-sm font-roboto">
                    {values.address}
                  </h1>
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
