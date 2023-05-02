import { useEffect } from "react";
import Daily from "./Daily";
import Total from "./Total";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { todayDateUpdate, yesterdayDateUpdate } from "../store/nameSlice";

function App() {
  const dispatch = useDispatch();
  const dailyVisible = useSelector((state: RootState) => {
    return state.name.menuState;
  });
  const style =
    "pt-[10vh] md:pt-0 md:pl-[15%] w-[100%] flex flex-col justify-center items-center";

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    let todayYear = String(year);
    let todayMonth = "";
    let todayDay = "";
    if (String(month + 1).length === 1) {
      todayMonth = `0${month + 1}`;
    } else {
      todayMonth = String(month + 1);
    }
    if (String(day).length === 1) {
      todayDay = `0${day}`;
    } else {
      todayMonth = String(day);
    }
    dispatch(todayDateUpdate(todayYear + todayMonth + todayDay));

    const today = new Date(year, month, day).toLocaleDateString();
    const yesterday = new Date(year, month, day - 1).toLocaleDateString();
    let yesterdayYear = yesterday.slice(0, 4);
    let yesterdayMonth = "";
    let yesterdayDay = yesterday.slice(-3, -1).replace(" ", "0");
    if (today.slice(5, 7) !== yesterday.slice(5, 7)) {
      if (yesterday[7] === "1") {
        yesterdayMonth = yesterday.slice(5, 8).replace(" ", "0");
      } else {
        yesterdayMonth = yesterday.slice(5, 7).replace(" ", "0");
      }
    } else {
      if (String(month + 1).length === 1) {
        yesterdayMonth = `0${month + 1}`;
      } else {
        yesterdayMonth = String(month + 1);
      }
    }
    dispatch(
      yesterdayDateUpdate(yesterdayYear + yesterdayMonth + yesterdayDay)
    );
  }, []);

  return (
    <div className="w-[100%] lg:h-[100vh] pb-5 flex bg-neutral-100">
      <NavBar />
      {dailyVisible ? (
        <div className={style}>
          <Daily />
        </div>
      ) : (
        <div className={style}>
          <Total />
        </div>
      )}
    </div>
  );
}

export default App;
