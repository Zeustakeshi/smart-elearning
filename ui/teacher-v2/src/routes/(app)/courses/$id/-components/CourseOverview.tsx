import { FaUserGraduate } from "react-icons/fa";
import { MdPlayLesson } from "react-icons/md";
type Props = {};

const CourseOverview = ({}: Props) => {
    return (
        <div className="text-white flex justify-start items-center gap-10">
            <div className="flex justify-start items-center gap-2">
                <span>
                    <FaUserGraduate></FaUserGraduate>
                </span>
                <span>: 12</span>
            </div>
            <div className="flex justify-start items-center gap-2">
                <span>
                    <MdPlayLesson></MdPlayLesson>
                </span>
                <span>: 120</span>
            </div>
        </div>
    );
};

export default CourseOverview;
