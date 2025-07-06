import {
  FiFileText,
  FiBook,
  FiHeart,
  FiCloud,
  FiEdit,
  FiBarChart2,
} from "react-icons/fi"; // Import icons for the demo items
import { GlassIconTool } from "./GlassIconTools";

const ToolsGlass = () => {
  // Define the items array as provided in the original demo
  const items = [
    { icon: <FiFileText />, color: "blue", label: "Files" },
    { icon: <FiBook />, color: "purple", label: "Books" },
    { icon: <FiHeart />, color: "red", label: "Health" },
    { icon: <FiCloud />, color: "indigo", label: "Weather" },
    { icon: <FiEdit />, color: "orange", label: "Notes" },
    { icon: <FiBarChart2 />, color: "green", label: "Stats" },
  ];

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div style={{ height: "600px", position: "relative" }}>
        <GlassIconTool items={items} className="custom-class" />
      </div>
    </div>
  );
};

export { ToolsGlass };
