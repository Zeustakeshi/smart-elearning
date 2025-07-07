from concurrent import futures

import grpc

from L2ToolServicer import L2ToolServicer
from grpc_template import generate_lesson_plan_pb2_grpc

if __name__ == '__main__':
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    generate_lesson_plan_pb2_grpc.add_L2_toolsServicer_to_server(L2ToolServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("Server gRPC đang lắng nghe trên cổng 50051")

    server.wait_for_termination()
