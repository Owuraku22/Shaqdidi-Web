import { Input } from "../ui/input";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "react-router-dom";
import Auth from "./auth";

type JointData = {
  name: string;
  address: string;
  id: number;
};

const PsDashboardPage = () => {
  const { isPending, error, data } = useQuery<JointData[]>({
    queryKey: ["repoData"],
    queryFn: () => fetch("/data/food_joints.json").then((res) => res.json()),
  });

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <Auth>
      <div className="h-[5em] px-4">
        <h2 className="font-bold text-2xl md:text-5xl">Hi, Isaiah!</h2>
        <h2 className="mt-2">Browse food joints and place orders</h2>
      </div>
      <div className="h-[5em] flex justify-end px-[5em]">
        <Input placeholder="Search" className="w-[20em]" />
      </div>
      <div className="h-[] border border-black mt-4 grid grid-cols-4 gap-4 overflow-auto">
        {data.map((values, index) => (
          <div
            className="m-4 rounded-xl border border-red-600 cursor-pointer"
            onClick={() => redirect(`/order/${values.id}`)}
          >
            <div className="h-[12em] border border-red-600 rounded-t-xl object-cover">
              <img
                src="/2.png"
                className="h-[12em] w-full rounded-t-xl object-cover object-center"
              />
            </div>
            <h1 key={index}>{values.name}</h1>
            <h1>{values.address}</h1>
          </div>
        ))}
      </div>
    </Auth>
  );
};

export default PsDashboardPage;
