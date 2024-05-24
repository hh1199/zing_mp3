import icons from "./icons";

const { MdLibraryMusic, MdOutlineCircle, MdStackedBarChart, MdOutlineNoteAdd } =
  icons;
export const sidebarMenu = [
  {
    path: "mymusic",
    text: "Cá Nhân",
    icon: <MdLibraryMusic size={24} />,
  },
  {
    path: "",
    text: "Khám phá",
    end: true,
    icon: <MdOutlineCircle size={24} />,
  },
  {
    path: "zing-chart",
    text: "#zingchart",
    icon: <MdStackedBarChart size={24} />,
  },
  {
    path: "follow",
    text: "Theo dõi",
    icon: <MdOutlineNoteAdd size={24} />,
  },
];
