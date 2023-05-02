import PM10Chart from "../chart/totalChart/PM10Chart";
import TotalMap from "../chart/TotalMap";
import PieChart from "../chart/totalChart/PieChart";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { totalUpdate } from "../store/dataSlice";
import { RootState } from "../store/store";
import BubbleChart from "../chart/totalChart/BubbleChart";

export default function Daily() {
  const dispatch = useDispatch();
  const date = useSelector((state: RootState) => {
    return state.name;
  });

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

  const updateData = async (reqDate: string) => {
    await fetch(
      "https://port-0-seoulair-server-3nec02mlh4e8glv.sel4.cloudtype.app/data",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: reqDate,
          time: "0300",
          name: "",
        }),
      }
    );
  };

  useEffect(() => {
    if (date.todayDateState.length !== 0) {
      updateData(date.todayDateState)
        .then(() => getData())
        .catch((error) => console.log(error));
    }
  }, [date]);

  return (
    <div>
      <div className="pt-[5%] lg:pt-0 px-[5%] pb-5 w-[100%] flex flex-col md:flex-row items-center">
        <div className="text-2xl"> | 서울 대기 정보</div>
      </div>
      <div className="w-[95vw] md:w-[85vw] flex justify-center items-center">
        <div className="w-[90%] lg:h-[100%] flex flex-col lg:flex-row justify-between items-center">
          <div className="w-[100%] lg:w-[50%] lg:mr-3 flex flex-col justify-center items-center">
            <div className="w-[100%] lg:h-[32vh] mb-5 flex bg-white rounded-xl">
              <div className="w-[48%]">
                <TotalMap />
              </div>
              <div className="w-[48%]">
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
