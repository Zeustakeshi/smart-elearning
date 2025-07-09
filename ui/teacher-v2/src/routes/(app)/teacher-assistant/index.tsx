import { createFileRoute } from "@tanstack/react-router";
import { ChatProvider } from "./-components/ChatContext";
import ChatConversation from "./-components/ChatConversation";
import ChatInput from "./-components/ChatInput";
import FileUploadedArea from "./-components/FileUploadedArea";

export const Route = createFileRoute("/(app)/teacher-assistant/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="size-full flex flex-col">
            <ChatProvider>
                <ChatConversation className="flex-1 "></ChatConversation>
                <FileUploadedArea></FileUploadedArea>
                <ChatInput className="mt-auto mx-auto"></ChatInput>
            </ChatProvider>
        </div>
    );
}
