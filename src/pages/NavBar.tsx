import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { menuUpdate } from "../store/nameSlice";
import { RootState } from "../store/store";

export default function NavBar() {
  const dispatch = useDispatch();
  const dailyVisible = useSelector((state: RootState) => {
    return state.name.menuState;
  });

  const clickedStyle =
    "w-[20%] md:w-[80%] text-center hover:cursor-pointer bg-neutral-50 mx-1 md:py-2 md:mb-3 rounded-2xl";
  const style =
    "w-[15%] md:w-[80%] text-center text-neutral-400 hover:cursor-pointer hover:bg-neutral-300 mx-1 md:mb-3 md:py-2 rounded-2xl";

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
      <div className={dailyVisible ? clickedStyle : style}>실시간</div>
      <div className={dailyVisible ? style : clickedStyle}>연도별</div>
    </div>
  );
}
