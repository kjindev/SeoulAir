import { useDispatch, useSelector } from "react-redux";
import { location } from "../store/nameSlice";
import { RootState } from "../store/store";

export default function Modal() {
  const dispatch = useDispatch();
  const { locationState } = useSelector((state: RootState) => {
    return state.name;
  });

  const iconClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLDivElement;
    const text = target.innerText;
    if (text === "?") {
      dispatch(location(true));
    } else if (text === "X") {
      dispatch(location(false));
    }
  };

  return (
    <div
      onClick={iconClick}
      className="fixed z-[2] bottom-0 right-0 drop-shadow-lg m-3 text-lg bg-amber-600 w-[50px] h-[50px] rounded-full flex justify-center items-center hover:scale-110 hover:cursor-pointer text-white"
    >
      {locationState ? <div>X</div> : <div>?</div>}
    </div>
  );
}
