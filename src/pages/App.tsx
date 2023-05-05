import { lazy, Suspense, useEffect } from "react";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { todayDate, yesterdayDate } from "../store/nameSlice";

declare global {
  interface Window {
    naver: any;
  }
}

const Daily = lazy(() => import("./Daily"));
const Total = lazy(() => import("./Total"));
const Location = lazy(() => import("./Location"));

export default function App() {
  const dispatch = useDispatch();
  const { dailyState, totalState, locationState } = useSelector(
    (state: RootState) => {
      return state.name;
    }
  );
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
    dispatch(todayDate(todayYear + todayMonth + todayDay));

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
    dispatch(yesterdayDate(yesterdayYear + yesterdayMonth + yesterdayDay));
  }, []);

  return (
    <div className="w-[100%] lg:h-[100vh] pb-5 flex bg-gray-100">
      <NavBar />
      {locationState && (
        <>
          <div className="fixed z-[2] pt-[10vh] md:pt-0 md:pl-[15%] w-[100vw] h-[100vh] flex justify-center items-center">
            <Suspense fallback={<div></div>}>
              <Location />
            </Suspense>
          </div>
          <div className="fixed z-[1] w-[100vw] h-[100vh] bg-black opacity-50"></div>
        </>
      )}
      {dailyState && (
        <div className={style}>
          <Suspense
            fallback={
              <div className="w-[100%] h-[100vh] bg-gray-100 flex justify-center items-center"></div>
            }
          >
            <Daily />
          </Suspense>
        </div>
      )}
      {totalState && (
        <div className={style}>
          <Suspense
            fallback={
              <div className="w-[100%] h-[100vh] bg-gray-100 flex justify-center items-center"></div>
            }
          >
            <Total />
          </Suspense>
        </div>
      )}
    </div>
  );
}
