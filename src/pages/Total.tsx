import PM10Chart from "../totalChart/PM10Chart";
import O3Chart from "../totalChart/O3Chart";
import RadarChart from "../totalChart/RadarChart";
import TotalMap from "./TotalMap";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { totalUpdate } from "../store/dataSlice";
import { RootState } from "../store/store";
import BubbleChart from "../totalChart/BubbleChart";

export default function Daily() {
  const dispatch = useDispatch();
  const name = useSelector((state: RootState) => {
    return state.name.nameState;
  });

  const getData = async (date: string) => {
    try {
      const response = await fetch(`http://localhost:4000/${date}`);
      const result = await response.json();
      console.log(result);
      dispatch(totalUpdate(result.TimeAverageAirQuality.row));
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const updateData = async (date: string) => {
    await fetch(`http://localhost:4000/${date}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        time: "1500",
        name: "",
      }),
    });
  };

  useEffect(() => {
    Promise.all([updateData("today"), getData("today")]).catch((error) =>
      console.log(error)
    );
  }, []);

  return (
    <div>
      <div className="pt-[5%] lg:pt-0 px-[5%] pb-5 w-[100%] flex flex-col md:flex-row items-center">
        <div className="text-2xl"> | 서울시 대기 정보</div>
      </div>
      <div className="w-[95vw] md:w-[85vw] flex justify-center items-center">
        <div className="w-[90%] lg:h-[100%] flex flex-col lg:flex-row justify-between items-center">
          <div className="w-[100%] lg:w-[50%] lg:mr-3 flex flex-col justify-center items-center">
            <div className="w-[100%] h-[32vh] mb-5 bg-white rounded-xl">
              <TotalMap />
            </div>
            <div className="w-[100%] h-[70vh] lg:h-[40vh] flex flex-col lg:flex-row justify-between">
              <div className="w-[100%] h-[100%] bg-white rounded-xl">
                <BubbleChart />
              </div>
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
