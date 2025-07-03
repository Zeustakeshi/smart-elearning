import MathTool from "../../../assets/MathTool.png";
import Star from "../../../assets/Star.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataCard {
  id: number;
  name: string;
  progress: number;
  students: number;
}

const DataCardInfo: DataCard[] = [
  {
    id: 1,
    name: "Toán",
    progress: 75,
    students: 100,
  },
  {
    id: 2,
    name: "Anh",
    progress: 50,
    students: 200,
  },
  {
    id: 3,
    name: "Văn",
    progress: 50,
    students: 200,
  },
  {
    id: 4,
    name: "Địa",
    progress: 50,
    students: 200,
  },
  {
    id: 5,
    name: "Sử",
    progress: 50,
    students: 200,
  },
];

const SupportTools = () => {
  return (
    <>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Công cụ hỗ trợ
      </h2>
      <div className="flex w-full items-center justify-between mt-2">
        <div className="flex gap-2 ">
          <Button className="bg-transparent border-2 text-black hover:bg-gray-100">
            Yêu thích
          </Button>
          <Button className="bg-transparent border-2 text-black hover:bg-gray-100">
            Tất cả
          </Button>
        </div>
        <div>
          <Input placeholder="tìm kiếm" className="text-center" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 rounded-xl mt-4">
        {DataCardInfo.map((card) => (
          <button className="relative h-20 rounded-xl border-2 p-2 flex justify-between items-center group overflow-hidden hover:cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-transform duration-300" aria-label={`Card for ${card.name}`}>
            {/* div để làm hiệu ứng tràn màu ra ngoài */}
            <div className="absolute inset-0 rounded-xl bg-gray-100 scale-x-0 group-hover:scale-x-110 transition-transform duration-300"></div>
            <div className="absolute inset-0 p-2 flex justify-between items-center">
              <div className="flex gap-3 items-center h-full">
                <div className="w-10 h-10">
                  <img src={MathTool} alt="Math tool icon" />
                </div>
                <div>
                  <p className="hover:cursor-pointer hover:font-semibold hover:scale-110 transition-all duration-300">
                    Tạo bài học
                  </p>
                  <p className="hover:cursor-pointer hover:font-semibold hover:scale-110 transition-all duration-300">
                    Mô tả
                  </p>
                  <p className="hover:cursor-pointer hover:font-semibold hover:scale-110 transition-all duration-300">
                    {card.name}
                  </p>
                </div>
              </div>
              <div className=" w-10 h-10">
                <img src={Star} alt="favorite icon" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SupportTools;
