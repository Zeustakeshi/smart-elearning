package config

import (
	"github.com/spf13/viper"
	"smart-elearning/pkg/log"
)

func LoadConfig() {

	viper.AddConfigPath("api/configs")
	viper.SetConfigType("yml")
	viper.SetConfigName("config")
	viper.AutomaticEnv()

	viper.BindEnv("database.postgresql.db_url", "DB_URL")
	viper.BindEnv("database.postgresql.db_user", "DB_USER")
	viper.BindEnv("database.postgresql.db_password", "DB_PASSWORD")
	viper.BindEnv("jwt.secret_key", "JWT_SECRET")
	viper.BindEnv("services.l2.grpc.host", "L2_GRPC_HOST")
	viper.BindEnv("services.l2.grpc.port", "L2_GRPC_PORT")

	if err := viper.ReadInConfig(); err != nil {
		log.Logger.Error("Read configs failed: " + err.Error())
	}

	if err := viper.Unmarshal(&Configs); err != nil {
		log.Logger.Error("Decode configs failed: " + err.Error())
	}

}
