import { useState, useEffect } from "react";
import PM10Chart from "../chart/totalChart/PM10Chart";
import TotalMap from "../chart/TotalMap";
import PieChart from "../chart/totalChart/PieChart";
import { useDispatch, useSelector } from "react-redux";
import { totalUpdate } from "../store/dataSlice";
import { RootState } from "../store/store";
import BubbleChart from "../chart/totalChart/BubbleChart";

export default function Daily() {
  const dispatch = useDispatch();
  const [timeList, setTimeList] = useState<string[]>([]);
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

  const getData = async () => {
    try {
      const response = await fetch(
        "https://port-0-seoulair-server-3nec02mlh4e8glv.sel4.cloudtype.app/data"
      );
      const result = await response.json();
      dispatch(totalUpdate(result.TimeAverageAirQuality.row));
      return;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const updateData = async (reqDate: string, reqTime: string | undefined) => {
    await fetch(
      "https://port-0-seoulair-server-3nec02mlh4e8glv.sel4.cloudtype.app/data",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: reqDate,
          time: `${reqTime}00`,
          name: "",
        }),
      }
    );
  };

  const changeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const target = event.target as HTMLSelectElement;
    const selectTime = target.value.slice(0, 2);
    updateData(date.todayDateState, selectTime)
      .then(() => getData())
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (timeList.length !== 0) {
      updateData(date.todayDateState, timeList[0].slice(0, 2))
        .then(() => getData())
        .catch((error) => console.log(error));
    }
  }, [timeList]);

  return (
    <div>
      <div className="pt-[5%] lg:pt-0 px-[5%] pb-5 w-[100%] flex flex-col md:flex-row items-center">
        <div className="text-2xl"> | 오늘의 서울 대기 정보</div>
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
              <div className="w-[100%] md:w-[50%] lg:w-[48%] lg:h-[100%] bg-white rounded-xl">
                <TotalMap />
              </div>
              <div className="w-[100%] md:w-[50%] lg:w-[48%] mt-5 lg:mt-0 lg:h-[32vh] bg-white rounded-xl">
                <PieChart />
              </div>
            </div>
            <div className="w-[100%] h-[70vh] lg:h-[40vh] bg-white rounded-xl">
              <BubbleChart />
            </div>
          </div>
          <div className="w-[100%] lg:w-[48%] h-[100vh] lg:h-[75vh] mt-5 lg:mt-0 bg-white rounded-xl">
            <PM10Chart />
          </div>
        </div>
      </div>
    </div>
  );
}
