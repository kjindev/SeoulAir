import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { menuUpdate } from "./store/nameSlice";

export default function NavBar() {
  const dispatch = useDispatch();

  const menuClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.innerText === "실시간") {
      dispatch(menuUpdate(true));
    } else if (target.innerText === "연도별") {
      dispatch(menuUpdate(false));
    }
  };

  return (
    <div
      onClick={menuClick}
      className="z-[1] fixed w-[100%] h-[7vh] md:w-[15%] md:h-[100vh] bg-neutral-700 drop-shadow-sm flex flex-row md:flex-col justify-center md:justify-start items-center md:pt-[10vh]"
    >
      <div className="hover:cursor-pointer mb-3 bg-neutral-50 p-1 px-3 m-3 rounded-md">
        실시간
      </div>
      <div className="hover:cursor-pointer mb-3 bg-neutral-50 p-1 px-3 m-3 rounded-md">
        연도별
      </div>
    </div>
  );
}
