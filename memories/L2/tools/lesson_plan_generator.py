from langchain.prompts import PromptTemplate
from langchain_community.document_loaders import PyPDFLoader
from langchain_google_genai import ChatGoogleGenerativeAI

from prompt.lesson_plan_prompt import LESSON_PLAN_GENERATION

llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
)


def generate_lesson_plan(
        title: str,
        file_url: str,
        description: str,
        lesson_format: str,
        teacher_note: str,
        teacher_id: int,
        course_id: int
):
    lesson_content = load_file_content(file_url)

    prompt = PromptTemplate.from_template(LESSON_PLAN_GENERATION)

    for chunk in llm.stream(prompt.invoke({
        "title": title,
        "lesson_content": lesson_content,
        "lesson_format": lesson_format,
        "teacher_note": teacher_note,
        "teacher_id": teacher_id,
        "course_id": course_id,
        "description": description
    }).text):
        yield chunk.content


def load_file_content(file_url: str) -> str:
    loader = PyPDFLoader(file_url)
    full_content = ""
    for page in loader.load():
        full_content += " " + page.page_content
    return full_content
