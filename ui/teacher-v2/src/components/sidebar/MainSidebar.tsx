import { FaTools, FaUsers } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { IoDocumentText, IoSettingsSharp } from "react-icons/io5";
import { TbMessageChatbotFilled } from "react-icons/tb";
import MainSidebarItem from "./MainSidebarItem";
type Props = {};

const MainSidebar = ({}: Props) => {
    return (
        <div className="sticky top-[74px]  py-4 flex flex-col justify-between gap-32 ">
            <div className="flex flex-col justify-start items-center gap-2">
                <MainSidebarItem to="/" icon={<HiHome />} label="Trang chủ" />
                <MainSidebarItem
                    to="/tools"
                    icon={<FaTools />}
                    label="Công cụ"
                />
                <MainSidebarItem
                    to="/courses"
                    icon={<FaUsers />}
                    label="Khóa học"
                />
                <MainSidebarItem
                    to="/documents"
                    icon={<IoDocumentText />}
                    label="Tài liệu"
                />
                <div className="flex flex-col justify-start items-center gap-2">
                    <MainSidebarItem
                        to="/teacher-assistant"
                        icon={<TbMessageChatbotFilled />}
                        label="Trợ giảng "
                    />
                </div>
            </div>
            <div className="flex flex-col justify-start items-center gap-2">
                <MainSidebarItem
                    to="/settings"
                    icon={<IoSettingsSharp />}
                    label="Cài đặt "
                />
            </div>
        </div>
    );
};

export default MainSidebar;
