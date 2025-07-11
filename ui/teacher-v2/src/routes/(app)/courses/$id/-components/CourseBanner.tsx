import Button from "../../../../../components/ui/Button";
import CourseAvatar from "./CourseAvatar";
import CourseCode from "./CourseCode";
import CourseName from "./CourseName";
import CourseOverview from "./CourseOverview";

type Props = {};

const CourseBanner = ({}: Props) => {
  return (
    <div className=" relative w-full bg-stone-100 rounded-xl h-[220px] overflow-hidden">
      {/*  BACKGROUND AND OVERLAY */}
      <div className="z-[1] absolute top-0 left-0 w-full h-full select-none">
        <img
          className="size-full object-cover"
          src="https://tse1.mm.bing.net/th/id/OIP.P1tCh-O3o_SWiGxh2NgxAgHaDQ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
          alt=""
        />
      </div>
      <div className="z-[2] absolute top-0 left-0 w-full h-full select-none bg-slate-900/70"></div>

      {/*  */}
      <div className="flex justify-between items-center w-full absolute top-0 left-0 z-10  p-5">
        <div className="flex flex-col justify-start items-start">
          <div className=" w-full flex justify-start items-start gap-2 ">
            <CourseAvatar url="https://i.pinimg.com/736x/2e/ae/fd/2eaefd75d164be0b17ef6f09749d0da8.jpg"></CourseAvatar>
            <div className="flex flex-col gap-1">
              <CourseName value="Giải tích 12"></CourseName>
              <CourseCode value="#123"></CourseCode>
              <CourseOverview></CourseOverview>
            </div>
          </div>
          <div className="mt-4 flex justify-start items-center gap-3 text-white">
            <Button variant="outline">Quản lý học sinh</Button>
            <Button variant="outline">Quản lý khóa học</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseBanner;
