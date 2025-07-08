import { FaUsers } from "react-icons/fa";
import { HiMiniDocumentText } from "react-icons/hi2";
import { MdOutlineAccessTimeFilled } from "react-icons/md";

type Props = {};

const CourseCard = ({}: Props) => {
    return (
        <div className="rounded-2xl overflow-hidden transition-all translate-0.5 hover:shadow-xl cursor-pointer">
            <div className="w-full aspect-video">
                <img
                    className="size-full object-cover"
                    src="https://files.fullstack.edu.vn/f8-prod/courses/1.png"
                    alt=""
                />
            </div>
            <div className="p-3 bg-stone-100">
                <h3 className="font-semibold text-lg mb-2">
                    Javascript cơ bản
                </h3>
                <h3 className="flex justify-start items-center gap-2 my-2">
                    <span className=" font-semibold  ">Giáo viên: </span>
                    <span>Minh Hiếu</span>
                </h3>
                <div className="flex justify-between items-center gap-5">
                    <div className="flex justify-start items-center gap-2">
                        <span>
                            <FaUsers></FaUsers>
                        </span>
                        <span>10</span>
                    </div>
                    <div className="flex justify-start items-center gap-2">
                        <span>
                            <HiMiniDocumentText></HiMiniDocumentText>
                        </span>
                        <span>10</span>
                    </div>
                    <div className="flex justify-start items-center gap-2">
                        <span>
                            <MdOutlineAccessTimeFilled></MdOutlineAccessTimeFilled>
                        </span>
                        <span>10</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
