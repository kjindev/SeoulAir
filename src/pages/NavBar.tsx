import { useDispatch, useSelector } from "react-redux";
import { menu } from "../store/nameSlice";
import { RootState } from "../store/store";

export default function NavBar() {
  const dispatch = useDispatch();
  const dailyVisible = useSelector((state: RootState) => {
    return state.name.menuState;
  });

  const clickedStyle =
    "w-[20%] md:w-[80%] text-center hover:cursor-pointer bg-neutral-100 mx-1 md:py-2 md:mb-3 rounded-2xl";
  const style =
    "w-[20%] md:w-[80%] text-center text-white hover:cursor-pointer hover:bg-neutral-900 mx-1 md:mb-3 md:py-2 rounded-2xl";

  const menuClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.innerText === "자치구") {
      dispatch(menu(true));
    } else if (target.innerText === "서울 전체") {
      dispatch(menu(false));
    }
  };

  return (
    <div
      onClick={menuClick}
      className="z-[1] fixed w-[100vw] h-[7vh] md:w-[15%] md:h-[100vh] bg-neutral-700 flex flex-row md:flex-col justify-center md:justify-start items-center md:pt-[10vh]"
    >
      <span className={dailyVisible ? clickedStyle : style}>자치구</span>
      <span className={dailyVisible ? style : clickedStyle}>서울 전체</span>
    </div>
  );
}
