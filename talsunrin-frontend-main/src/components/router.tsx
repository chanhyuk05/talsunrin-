import { createBrowserRouter } from "react-router-dom";
import { Main, Aisle, Classroom } from "../pages";
import BackDoor from "../pages/backDoor";
import MainGate from "../pages/mainGate";
import Stairs from "../pages/stairs";
import UpStairs from "../pages/upstairs";
import BackEnding from "../pages/backEnding";
import ClassroomEnd from "../pages/classroomEnd"
import Ending from "../pages/ending";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/aisle",
    element: <Aisle />,
  },
  {
    path: "/classroom",
    element: <Classroom />,
  },
  {
    path: "/backdoor",
    element: <BackDoor />,
  },
  {
    path: "/maingate",
    element: <MainGate />,
  },
  {
    path: "/stairs",
    element: <Stairs />,
  },
  {
    path: "upstairs",
    element: <UpStairs />,
  },
  {
    path: "backEnding",
    element: <BackEnding />,
  },
  {
    path: "/ClassroomEnd",
    element: <ClassroomEnd />,
  },
  {
    path: "/ending",
    element: <Ending />,
  },
]);

export default router;
