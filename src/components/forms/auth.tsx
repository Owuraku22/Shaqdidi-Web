import React from "react";
import { Button } from "../ui/button";
import { redirect, useNavigate } from "react-router-dom";

const FormAuth = ({
  children,
  isSignIn,
}: {
  children: React.ReactNode;
  isSignIn?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <section className="flex lg:flex-row flex-col w-full h-screen">
      <div className="relative flex h-screen bg-[url('/gradient.svg')] bg-no-repeat lg:w-1/2 bg-cover">
        <div className="z-30 text-white left-10 top-10 flex flex-col justify-center items-center w-full text-center py-6">
          <h2 className="font-extrabold text-3xl lg:text-5xl ">Welcome to</h2>
          <div className="font-extrabold text-3xl lg:text-5xl tracking-wider">
            <span className="text-primary">ShaQ </span>
            <span className="">DIDI </span>
          </div>
          <span className="pt-6 w-[17rem] lg:w-[22em] text-slate-200">
            Lorem ipsum dolor sit amet consectetur adipiscing elit gravida
            malesuada quam commodo id integer nam.
          </span>
          {isSignIn ? (
            <Button
              variant={"outline"}
              className="mt-4 lg:w-[18rem] lg:block hidden bg-inherit"
              onClick={() => navigate("/", { replace: true })}
            >
              Sign In
            </Button>
          ) : null}
        </div>
      </div>
      <div className="flex place-items-center justify-center lg:w-1/2">
        {children}
      </div>
    </section>
  );
};

export default FormAuth;
