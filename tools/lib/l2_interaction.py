import grpc

from grpc_template.grpc_template import l2_chat_pb2_grpc, l2_chat_pb2


def chat(user_id: str, prompt: str) -> str:
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = l2_chat_pb2_grpc.L2Stub(channel)
        print("Client: Đang gửi yêu cầu chat tới server...")

        message = l2_chat_pb2.ChatMessage(user_id=user_id, content=prompt)
        responses_iterator = stub.Grpc_Chat(message)

        full_response_content = ""
        try:
            for response in responses_iterator:
                print(f"Client nhận: {response.content}")
                full_response_content += response.content
        except Exception as e:
            print(f"Client: Lỗi không xác định: {e}")
    return full_response_content
