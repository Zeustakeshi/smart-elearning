type Teacher = {
  id: string;
  name: string;
  avatar: string;
  email: string;
};

export type CourseCreateResponse = {
  id: string;
  avatar: string;
  name: string;
  description: string;
  background: string;
  permission: "PUBLIC" | "PRIVATE" | "LINK_ONLY";
  teacher: Teacher;
};
