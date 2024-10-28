import { Input } from "../ui/input";
// import { redirect } from "react-router-dom";
import PopoverForm from "./dialog";
import { Icons } from "../icons/icons";
import { DrawerForm } from "./drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useActionData, useLoaderData } from "react-router-dom";
import { AuthResponse, FoodJoint, Personnel } from "@/lib/api";
import { useStoreData } from "@/store/state";

// import PopoverForm from "./details-popover";

const PsDashboardPage = () => {
  const { foodJoints, personnels } = useLoaderData() as {
    foodJoints: FoodJoint[] | undefined;
    personnels: Personnel[] | undefined;
  };
  const { isMobile } = useMediaQuery();
  const user = useStoreData((state) => state.user);

  return (
    <div className="flex flex-col bg-white">
      <div className="h-[5em] lg:px-4 md:my-4">
        <h2 className="font-bold text-2xl md:text-3xl font-poppins">
<<<<<<< HEAD
<<<<<<< HEAD
          Hi, {user?.full_name}!
=======
          Hi, {user.full_name}!
>>>>>>> ecebbf9 (Created logic fetching food Joints and posting data login and sign up pages)
=======
          Hi, {user?.full_name}!
>>>>>>> 303b43d (created and added firebase cloud messaging capabilities and altered the zustand middleware)
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
<<<<<<< HEAD
<<<<<<< HEAD
        {foodJoints?.map((values, index) => (
          <>
            {isMobile ? (
              <DrawerForm
                foodJoint={values}
                personnels={personnels!}
                key={index}
              >
=======
        {data.map((values, index) => (
          <>
            {isMobile ? (
              <DrawerForm value={values} key={index}>
>>>>>>> 2a816a8 (Changes to layouts of food others)
=======
        {foodJoints?.map((values, index) => (
          <>
            {isMobile ? (
              <DrawerForm
                foodJoint={values}
                personnels={personnels!}
                key={index}
              >
>>>>>>> ecebbf9 (Created logic fetching food Joints and posting data login and sign up pages)
                <div className="rounded-xl  cursor-pointer border">
                  <div className="rounded-t-xl object-cover mb-1 border ">
                    <img
                      src="/hamburger.png"
                      className=" w-full h-[10rem] rounded-t-xl object-cover object-center"
                    />
                  </div>
                  <h1
                    key={index}
                    className="flex px-2 md:px-4 pt-1 font-bold text-sm md:text-[1.1em] "
                  >
                    {values.name}
                    {/* Daavi’s Special Gob3 */}
                  </h1>
                  <h1 className="flex px-2 md:px-4 text-[0.8em] md:text-sm font-roboto">
                    {values.address}
                  </h1>
                </div>
              </DrawerForm>
            ) : (
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ecebbf9 (Created logic fetching food Joints and posting data login and sign up pages)
              <PopoverForm
                foodJoint={values}
                personnels={personnels!}
                key={index}
              >
<<<<<<< HEAD
=======
              <PopoverForm value={values} key={index}>
>>>>>>> 2a816a8 (Changes to layouts of food others)
=======
>>>>>>> ecebbf9 (Created logic fetching food Joints and posting data login and sign up pages)
                <div className="md:my-4 rounded-xl  cursor-pointer w-full border h-[9.5em] md:md:h-[12em]  lg:h-[13.5em] ">
                  <div className="h-[6em] md:h-[7.5em] lg:h-[9em] rounded-t-xl object-cover mb-1 border ">
                    <img
                      src="/wakye.jpeg"
                      className="h-[6em] md:h-[7.5em]  lg:h-[9em] w-full rounded-t-xl object-cover object-center"
                    />
                  </div>
                  <h1
                    key={index}
                    className="flex px-2 md:px-4 pt-1 font-bold text-sm md:text-[1.1em] "
                  >
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
