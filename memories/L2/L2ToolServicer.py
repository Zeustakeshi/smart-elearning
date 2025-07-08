import tools.lesson_plan_generator as lesson_plan_tool
from grpc_template import generate_lesson_plan_pb2_grpc, generate_lesson_plan_pb2


class L2ToolServicer(generate_lesson_plan_pb2_grpc.L2_toolsServicer):
    def GenerateLessonPlan(self, request, context):
        print("đang xử lý yeu cầu")

        response_stream = lesson_plan_tool.generate_lesson_plan(
            title=request.title,
            file_url=request.file_url,
            description=request.description,
            lesson_format=request.format,
            teacher_id=request.teacher_id,
            teacher_note=request.teacher_note,
            course_id=request.course_id
        )

        for response_chunk in response_stream:
            print(response_chunk)
            yield generate_lesson_plan_pb2.LessonPlanResponse(
                content=response_chunk
            )
