import { Input } from "../ui/input";
import { useQuery } from "@tanstack/react-query";
// import { redirect } from "react-router-dom";
import PopoverForm from "./dialog";
import { Icons } from "../icons/icons";
import { DrawerForm } from "./drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
// import PopoverForm from "./details-popover";

type JointData = {
  name: string;
  address: string;
  id: number;
};
// type UserData = {
//   name: string
// }
const PsDashboardPage = () => {
  const { isMobile } = useMediaQuery();
  const { isPending, error, data } = useQuery<JointData[]>({
    queryKey: ["repoData"],
    queryFn: () => fetch("/data/food_joints.json").then((res) => res.json()),
  });
  // const { isPending: isUserPending, error: isUserError, data: userData } = useQuery<UserData[]>({
  //   queryKey: ["repoData"],
  //   queryFn: () => fetch("/data/food_joints.json").then((res) => res.json()),
  // });

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="flex flex-col bg-white">
      <div className="h-[5em] lg:px-4 md:my-4">
        <h2 className="font-bold text-2xl md:text-3xl font-poppins">
          Hi, Isaiah!
        </h2>
        <h2 className="my-4 md:text-2xl text-gray-500 font-roboto">
          Browse food joints and place orders
        </h2>
      </div>
      <div className="relative w-64 my-4 lg:m-4 md:mb-8 lg:ml-4">
        <Input type="text" placeholder="Search" className="pl-10" />
        <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      </div>

      <div className="grid gap-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5">
        {data.map((values, index) => (
          <>
            {isMobile ? (
              <DrawerForm value={values} key={index}>
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
                    {/* {values.name} */}
                    Daavi’s Special Gob3
                  </h1>
                  <h1 className="flex px-2 md:px-4 text-[0.8em] md:text-sm font-roboto">
                    {values.address}
                  </h1>
                </div>
              </DrawerForm>
            ) : (
              <PopoverForm value={values} key={index}>
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
                    {/* {values.name} */}
                    Daavi’s Special Gob3
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
