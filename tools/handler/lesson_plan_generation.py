from langchain_community.document_loaders import PyPDFLoader
from langchain_core.documents import Document
from langchain_core.prompts import PromptTemplate

from prompts.lesson_plan_prompt import LESSON_PLAN_GENERATION_SYSTEM_PROMPT


def generate_lesson_plan():
    prompt_input = {
        "lesson_content": "Học sinh sẽ được làm quen với các khái niệm lập trình cơ bản bằng ngôn ngữ Python. Bài học bao gồm: cách in thông báo ra màn hình với lệnh print(), sử dụng biến để lưu trữ dữ liệu, và nhập dữ liệu từ người dùng bằng input(). Học sinh sẽ thực hành viết các chương trình đơn giản như chào hỏi, tính toán phép cộng hai số.",
        "lesson_title": "Bài 1: Làm Quen Với Lệnh Print và Biến Trong Python",
        "subject": "Tin học / Khoa học Máy tính",
        "student_age_group": "Lớp 5 (10-11 tuổi)",
        "lesson_format": "5E",
        "teacher_teaching_style": "Student-centered, kết hợp trực quan và thực hành trên máy tính",
        "class_overview_and_dynamics": "Lớp học có sự đa dạng về khả năng tiếp cận công nghệ; một số em đã từng tiếp xúc với lập trình Scratch, một số chưa từng lập trình trước đó.",
        "grade_level": "5"
    }

    prompt = PromptTemplate.from_template(LESSON_PLAN_GENERATION_SYSTEM_PROMPT)
    prompt_text = prompt.invoke(prompt_input)


def load_file(file_url: str) -> list[Document]:
    loader = PyPDFLoader(file_url)
    pages = []
    for page in loader.load():
        pages.append(page)
    return pages


if __name__ == '__main__':
    # docs = load_file("D:\Workspace\python\smart-elearning\\tools\data\AI-native Memory 2.0.pdf")
    # for doc in docs:
    #     print(doc.page_content)

    generate_lesson_plan()
