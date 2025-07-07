package client

import (
	"fmt"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"smart-elearning/internal/config"
	"smart-elearning/pkg/log"
	generated_stubs "smart-elearning/proto"
)

var (
	L2_Client generated_stubs.L2ToolsClient
)

func InitL2Client() {
	url := fmt.Sprintf(
		"%s:%d",
		config.Configs.Services.L2Service.Grpc.Host,
		config.Configs.Services.L2Service.Grpc.Port,
	)
	conn, err := grpc.NewClient(url, grpc.WithTransportCredentials(insecure.NewCredentials()))

	if err != nil {
		log.Logger.Error("Did not connect: " + err.Error())
	}

	log.Logger.Info("Connect to L2 grpc server successfully!")

	L2_Client = generated_stubs.NewL2ToolsClient(conn)
}
