import { Input } from "../ui/input";


const SideBar = () => {
  return (
    <div className="flex flex-row  h-screen w-screen">
      <div className=" flex-[1] border border-black p-4">
        <div className="flex text-center p-4 gap-[20px] text-[#27374d] ">
          <h2>Shaqdidi</h2>
        </div>
        <div className="flex flex-col gap-[20px] border border-yellow-300 ml-4">
          <a href="#" className="item">
            {" "}
            Dashboard
          </a>
          <a href="#" className="item">
            {" "}
            Dashboard
          </a>
          <a href="#" className="item">
            {" "}
            Dashboard
          </a>
        </div>
      </div>
      <div className="flex flex-[4] flex-col h-screen border border-red-600 p-4 ">
        <div className="flex flex-row justify-between items-center text-center flex-[1] px-16 border border-blue-600 ">
          <div>
            <h2>Dashboard</h2>
          </div>
          <div className="flex flex-row gap-4 items-center">
            <Input placeholder="Search" />
          </div>
        </div>
        <div className="flex-[5] border border-black mt-4">World</div>
      </div>
    </div>
  );
};

export default SideBar;
