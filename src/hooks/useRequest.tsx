import { useDispatch } from "react-redux";
import { todayData, yesterdayData, totalData } from "../store/dataSlice";

export default function useGetData() {
  const dispatch = useDispatch();

  const getData = async (dateType: string) => {
    try {
      const response = await fetch(
        "https://port-0-seoulair-server-3nec02mlh4e8glv.sel4.cloudtype.app/data"
      );
      const result = await response.json();
      if (!result.RESULT) {
        const data = result.TimeAverageAirQuality.row;
        if (dateType === "today") {
          dispatch(todayData(data));
        } else if (dateType === "yesterday") {
          dispatch(yesterdayData(data));
        } else if (dateType === "total") {
          dispatch(totalData(data));
        }
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const updateData = async (
    reqDate: string,
    reqTime: string,
    reqName: string | undefined
  ) => {
    try {
      console.log(reqDate, reqTime, reqName);
      const response = await fetch(
        "https://port-0-seoulair-server-3nec02mlh4e8glv.sel4.cloudtype.app/data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: reqDate,
            time: reqTime,
            name: reqName,
          }),
        }
      );
      if (!response.ok) {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { getData, updateData };
}
