export type Lesson = {
  id: number;
  name: string;
  tags: string[];
};

export type TeacherInfo = {
  name: string;
  phone: string;
  email: string;
};

export const teacherInfoData = {
  name: "Ths. Nguyễn Văn A",
  phone: "0987654321",
  email: "nguyenvan@gmail.com",
};

export const lessonsData: Lesson[] = [
  { id: 1, name: "Tên bài học", tags: ["video", "trắc nghiệm", "tự luận"] },
  { id: 2, name: "Tên bài học", tags: ["video", "trắc nghiệm", "tự luận"] },
  { id: 3, name: "Bài học về Lịch sử", tags: ["video", "tự luận"] },
];
