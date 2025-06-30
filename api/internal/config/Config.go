package config

var (
	Configs Config
)

type Config struct {
	Server   ServerConfig
	Database DatabaseConfig
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
