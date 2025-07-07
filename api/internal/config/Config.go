package config

var (
	Configs Config
)

type Config struct {
	Server    ServerConfig    `mapstructure:"server"`
	Database  DatabaseConfig  `mapstructure:"database"`
	Jwt       JwtConfig       `mapstructure:"jwt"`
	Resources ResourcesConfig `mapstructure:"resources"`
	Services  ServicesConfig  `mapstructure:"services"`
}

type ServicesConfig struct {
	L2Service struct {
		Grpc struct {
			Host string `mapstructure:"host"`
			Port int    `mapstructure:"port"`
		} `mapstructure:"grpc"`
	} `mapstructure:"l2"`
}

type ResourcesConfig struct {
	DefaultAvatar struct {
		Student string `mapstructure:"student"`
		Teacher string `mapstructure:"teacher"`
	} `mapstructure:"default_avatar"`
}

type JwtConfig struct {
	SecretKey  string `mapstructure:"secret_key"`
	ExpireTime int    `mapstructure:"expire_time"`
}

type ServerConfig struct {
	Port int    `mapstructure:"port"`
	Mode string `mapstructure:"mode"`
}

type PostgresConfig struct {
	DBUrl      string `mapstructure:"db_url"`
	DBUser     string `mapstructure:"db_user"`
	DBPassword string `mapstructure:"db_password"`
}

type DatabaseConfig struct {
	Postgresql PostgresConfig `mapstructure:"postgresql"`
}
