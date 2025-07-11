# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc
import warnings

from grpc_template import generate_lesson_plan_pb2 as grpc__template_dot_generate__lesson__plan__pb2

GRPC_GENERATED_VERSION = '1.73.1'
GRPC_VERSION = grpc.__version__
_version_not_supported = False

try:
    from grpc._utilities import first_version_is_lower
    _version_not_supported = first_version_is_lower(GRPC_VERSION, GRPC_GENERATED_VERSION)
except ImportError:
    _version_not_supported = True

if _version_not_supported:
    raise RuntimeError(
        f'The grpc package installed is at version {GRPC_VERSION},'
        + f' but the generated code in grpc_template/generate_lesson_plan_pb2_grpc.py depends on'
        + f' grpcio>={GRPC_GENERATED_VERSION}.'
        + f' Please upgrade your grpc module to grpcio>={GRPC_GENERATED_VERSION}'
        + f' or downgrade your generated code using grpcio-tools<={GRPC_VERSION}.'
    )


class L2_toolsStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.GenerateLessonPlan = channel.unary_stream(
                '/lesson_plan.L2_tools/GenerateLessonPlan',
                request_serializer=grpc__template_dot_generate__lesson__plan__pb2.LessonPlanRequest.SerializeToString,
                response_deserializer=grpc__template_dot_generate__lesson__plan__pb2.LessonPlanResponse.FromString,
                _registered_method=True)


class L2_toolsServicer(object):
    """Missing associated documentation comment in .proto file."""

    def GenerateLessonPlan(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_L2_toolsServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'GenerateLessonPlan': grpc.unary_stream_rpc_method_handler(
                    servicer.GenerateLessonPlan,
                    request_deserializer=grpc__template_dot_generate__lesson__plan__pb2.LessonPlanRequest.FromString,
                    response_serializer=grpc__template_dot_generate__lesson__plan__pb2.LessonPlanResponse.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'lesson_plan.L2_tools', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))
    server.add_registered_method_handlers('lesson_plan.L2_tools', rpc_method_handlers)


 # This class is part of an EXPERIMENTAL API.
class L2_tools(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def GenerateLessonPlan(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_stream(
            request,
            target,
            '/lesson_plan.L2_tools/GenerateLessonPlan',
            grpc__template_dot_generate__lesson__plan__pb2.LessonPlanRequest.SerializeToString,
            grpc__template_dot_generate__lesson__plan__pb2.LessonPlanResponse.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)
