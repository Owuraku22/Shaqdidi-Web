import { Input } from "../ui/input";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "react-router-dom";
import PopoverForm from "./dialog";
import { Icons } from "../icons/icons";

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
        <h2 className="font-bold text-2xl md:text-3xl">Hi, Isaiah!</h2>
        <h2 className="my-4 md:text-2xl text-gray-500">
          Browse food joints and place orders
        </h2>
      </div>
      <div className="relative w-64 my-4 lg:m-4 md:mb-8 lg:ml-4">
        <Input
          type="text"
          placeholder="Search"
          // value={search}
          // onChange={handleSearch}
          className="pl-10"
        />
        <Icons.Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
          // size={20}
        />
      </div>

      <div className="grid gap-y-4 gap-x-2 lg:gap-5 md:gap-y-0 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 3xl:grid-5 overflow-auto  md:ml-0 2xl:mx-5 w-[22.4em] md:w-[47em] lg:w-[80em] 2xl:w-[80em] 3xl:w-[95em]">
        {data.map((values, index) => (
          <PopoverForm value={values} key={index}>
            <div className="md:my-4 rounded-xl  cursor-pointer border h-[9.5em] md:md:h-[12em]  lg:h-[13.5em] w-[10.7em] md:w-[14.5em] first-letter: lg:w-[18em] 2xl:w-[18.7em] ">
              <div className="h-[6em] md:h-[7.5em] lg:h-[9em] rounded-t-xl object-cover mb-1 border ">
                <img
                  src="/hamburger.png"
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
        ))}
      </div>
    </div>
  );
};

export default PsDashboardPage;
