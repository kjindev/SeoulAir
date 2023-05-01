import Daily from "./Daily";
import Total from "./Total";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function App() {
  const dailyVisible = useSelector((state: RootState) => {
    return state.name.menuState;
  });

  return (
    <div className="w-[100%] lg:h-[100vh] pb-5 flex bg-neutral-100">
      <NavBar />
      {dailyVisible ? (
        <div className="pt-[10vh] md:pt-0 md:pl-[15%] w-[100%] flex flex-col justify-center items-center">
          <Daily />
        </div>
      ) : (
        <div className="pt-[10vh] md:pt-0 md:pl-[15%] w-[100%] flex flex-col justify-center items-center">
          <Total />
        </div>
      )}
    </div>
  );
}

export default App;
