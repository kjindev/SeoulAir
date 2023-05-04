import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function Location() {
  const mapRef = useRef<HTMLInputElement>(null);
  const { NAME, ADDRESS, LAT, LNG } = useSelector((state: RootState) => {
    return state.data.addressState;
  });

  useEffect(() => {
    const { naver } = window;
    if (mapRef.current && naver) {
      const location = new naver.maps.LatLng(LAT, LNG);
      const map = new naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 17,
      });
      new naver.maps.Marker({
        position: location,
        map,
      });
    }
  }, [LNG]);

  return (
    <div className="w-[90vw] md:w-[60vw] h-[85vh] bg-white rounded-xl drop-shadow-md p-7">
      <div className="text-2xl"> | {NAME}의 측정소</div>
      <div className="mb-3">{ADDRESS}</div>
      <div ref={mapRef} className="h-[85%] drop-shadow-md"></div>
    </div>
  );
}
