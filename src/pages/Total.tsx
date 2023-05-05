import { useState, useEffect, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import useRequest from "../hooks/useRequest";

const PM10Chart = lazy(() => import("../chart/totalChart/PM10Chart"));
const TotalMap = lazy(() => import("../chart/maps/TotalMap"));
const PieChart = lazy(() => import("../chart/totalChart/PieChart"));
const BubbleChart = lazy(() => import("../chart/totalChart/BubbleChart"));

export default function Daily() {
  const [timeList, setTimeList] = useState<string[]>([]);
  const request = useRequest();
  const date = useSelector((state: RootState) => {
    return state.name;
  });
  const todayData = useSelector((state: RootState) => {
    return state.data.todayState;
  });

  useEffect(() => {
    if (todayData.length !== 0) {
      let list: string[] = [];
      for (let i = todayData.length - 2; i >= 0; i--) {
        list.push(todayData[i].MSRDT.slice(8, 10) + "시");
      }
      setTimeList(list);
    }
  }, [todayData]);

  const changeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const target = event.target as HTMLSelectElement;
    const selectTime = target.value.slice(0, 2);
    request
      .updateData(date.todayDateState, selectTime, "")
      .then(() => request.getData("total"))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (timeList.length !== 0) {
      request
        .updateData(date.todayDateState, timeList[0].slice(0, 2), "")
        .then(() => request.getData("total"))
        .catch((error) => console.log(error));
    }
  }, [timeList]);

  return (
    <div>
      <div className="pt-[5%] lg:pt-0 px-[5%] pb-5 w-[100%] flex flex-col md:flex-row items-center">
        <div className="text-2xl"> | 오늘의 서울 대기환경</div>
        <div className="p-3">
          <select onChange={changeOption} className="px-3 py-1 drop-shadow">
            {timeList?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="w-[95vw] md:w-[85vw] flex justify-center items-center">
        <div className="w-[90%] lg:h-[100%] flex flex-col lg:flex-row justify-between items-center">
          <div className="w-[100%] lg:w-[50%] lg:mr-3 flex flex-col justify-center items-center">
            <div className="w-[100%] lg:h-[32vh] mb-5 flex flex-col lg:flex-row items-center justify-between">
              <div className="w-[100%] md:w-[50%] lg:w-[48%] lg:h-[100%] bg-white rounded-xl drop-shadow-md">
                <Suspense fallback={<div></div>}>
                  <TotalMap />
                </Suspense>
              </div>
              <div className="w-[100%] md:w-[50%] lg:w-[48%] mt-5 lg:mt-0 lg:h-[32vh] bg-white rounded-xl drop-shadow-md">
                <Suspense fallback={<div></div>}>
                  <PieChart />
                </Suspense>
              </div>
            </div>
            <div className="w-[100%] h-[70vh] lg:h-[40vh] bg-white rounded-xl drop-shadow-md">
              <Suspense fallback={<div></div>}>
                <BubbleChart />
              </Suspense>
            </div>
          </div>
          <div className="w-[100%] lg:w-[48%] h-[100vh] lg:h-[75vh] mt-5 lg:mt-0 bg-white rounded-xl drop-shadow-md">
            <Suspense fallback={<div></div>}>
              <PM10Chart />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
