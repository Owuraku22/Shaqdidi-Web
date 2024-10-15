import { Input } from "../ui/input";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "react-router-dom";
import Auth from "./sidebar-wrapper";
import { Button } from "../ui/button";
import PopoverForm from "./dialog";
import { Icons } from "../icons/icons";

type JointData = {
  name: string;
  address: string;
  id: number;
};
const PsDashboardPage = () => {
  const { isMobile } = useMediaQuery();
  const { isPending, error, data } = useQuery<JointData[]>({
    queryKey: ["repoData"],
    queryFn: () => fetch("/data/food_joints.json").then((res) => res.json()),
  });
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
      <div className="relative w-64 mt-2 m-4 md:mb-0 md:ml-4">
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

      <div className="grid gap-y-3 md:gap-y-0 grid-cols-2 md:grid-cols-4 overflow-auto ml-3 md:ml-0">
        {data.map((values, index) => (
          <PopoverForm>
            <div
              className="md:m-4 rounded-xl  cursor-pointer border w-[11em] md:w-[20em] h-[9.5em] md:h-[15em]"
              onClick={() => redirect(`/order/${values.id}`)}
            >
              <div className="h-[6em] md:h-[9.8em]  border rounded-t-xl object-cover mb-1">
                <img
                  src="/wakye.jpg"
                  className="h-[6em] md:h-[9.8em] w-full rounded-t-xl object-cover object-center"
                />
              </div>
              <h1
                key={index}
                className="flex px-2 md:px-4 py- font-bold text-sm md:text-xl "
              >
                {values.name}
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
