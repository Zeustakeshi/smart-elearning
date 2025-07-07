package main

import "smart-elearning/internal/initialize"

func main() {
	initialize.Run()
	//conn, err := grpc.NewClient("172.29.48.1:50051", grpc.WithTransportCredentials(insecure.NewCredentials()))
	//if err != nil {
	//	log.Fatalf("Did not connect: %v", err)
	//}
	//defer func(conn *grpc.ClientConn) {
	//	err := conn.Close()
	//	if err != nil {
	//		log.Printf("Disconnect grpc failed.")
	//	}
	//}(conn)
	//
	//c := pb.NewL2ToolsClient(conn)
	//
	//ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
	//defer cancel()
	//
	//stream, err := c.GenerateLessonPlan(ctx, &pb.LessonPlanRequest{
	//	Title:       "Hướng dẫn về AI cá nhân hóa",
	//	Description: "Hướng dẫn lớp về kiến trúc AI cá nhân hóa và hệ thống second me",
	//	CourseId:    1,
	//	FileUrl:     "D:\\Workspace\\python\\smart-elearning\\memories\\L2\\data\\data.pdf",
	//	Format:      "5E",
	//	TeacherId:   1,
	//	TeacherNote: "Lớp có 5 bạn, có 4 bạn chưa hiểu về AI, 1 bạn hiểu về AI sâu có kinh nghiệm lập trình AI",
	//})
	//if err != nil {
	//	log.Fatalf("Could not greet: %v", err)
	//}
	//
	//for {
	//	res, err := stream.Recv()
	//
	//	if err == io.EOF {
	//		log.Println("Stream finished.")
	//		break
	//	}
	//
	//	if err != nil {
	//		log.Fatalf("Error while receiving stream: %v", err)
	//	}
	//
	//	log.Printf("Received: %s", res.Content)
	//}
}
