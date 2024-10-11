import { Link } from "react-router-dom";
import { Icons } from "../icons/icons";

const Menu = [
  {
    label: "Home",
    link: "/",
    icon: <Icons.Home />,
  },
  {
    label: "Order History",
    link: "/",
    icon: <Icons.Time />,
  },
  {
    label: "NSSPs",
    link: "/",
    icon: <Icons.Group />,
  },
];

const isActive = true;

const Auth = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex flex-row  h-auto w-screen ">
      <div className=" flex-[1] border border-black pt-[10em] bg-background">
        <ul className="gap-4 flex flex-col px-6">
          {Menu.map((menu) => (
            <Link to={menu.link} key={menu.label}>
              <li
                className={`${
                  isActive ? "border bg-red-300 " : ""
                } flex items-center gap-2 rounded px-2 py-1`}
              >
                <span className="size-5">{menu.icon}</span>
                <p className="text-[0.9em]">{menu.label}</p>
              </li>
            </Link>
          ))}

          <Link to={"#"}>
            <li className="flex items-center gap-2 px-2 py-1">
              <Icons.Logout className="size-5" />
              <p className="text-[0.9em]">Logout</p>
            </li>
          </Link>
        </ul>
      </div>
      <div className="flex flex-[6] flex-col h-screen border border-red-600 bg-white">
        <div className="flex flex-row justify-between items-center text-center h-[5em] px-16 border border-blue-600 ">
          <h2>Home</h2>
        </div>
        {children}
      </div>
    </section>
  );
};

export default Auth;
