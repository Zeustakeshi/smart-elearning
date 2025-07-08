import type { ReactNode } from "react";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { MdQuiz } from "react-icons/md";
export type ToolDataItemType = {
    icon: ReactNode;
    title: string;
    description: string;
    bgColor: string;
    to: string;
};
export const toolData: ToolDataItemType[] = [
    {
        title: "Bài kiểm tra nhanh",
        description:
            "Công cụ này giúp giáo viên tạo bài kiểm tra nhanh để kiểm tra kiến thức cho học sinh trong lớp.",
        icon: <MdQuiz />,
        bgColor: "oklch(45.7% 0.24 277.023)",
        to: "/tools/multiple-choice-quiz",
    },
    {
        title: "Tóm tắt nội dung bài học",
        description:
            "AI tự động tóm tắt các bài học dài thành các ý chính, giúp học sinh dễ dàng nắm bắt kiến thức.",
        icon: <BsFillFileEarmarkTextFill />,
        bgColor: "oklch(80% 0.12 200)",
        to: "/tools/lesson-summary",
    },
    {
        title: "Tạo bài giảng",
        description:
            "Công cụ sử dụng AI để hỗ trợ giáo viên tạo bài giảng nhanh chóng, tiết kiệm thời gian và nâng cao chất lượng nội dung.",
        icon: <FaPen />,
        bgColor: "oklch(59.6% 0.145 163.225)",
        to: "/tools/lesson-plan",
    },
    {
        title: "Gợi ý câu hỏi thảo luận",
        description:
            "AI đề xuất các câu hỏi thảo luận phù hợp với nội dung bài học để tăng tính tương tác trong lớp.",
        icon: <IoChatbubbleEllipses />,
        bgColor: "oklch(60% 0.15 300)",
        to: "/tools/discussion-question",
    },
];
