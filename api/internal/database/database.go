package database

import (
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"net/url"
	"os"
	"smart-elearning/internal/config"
	"smart-elearning/pkg/log"
)

var (
	DB *gorm.DB
)

func ConnectToDatabase() {

	dbUser := config.Configs.Database.Postgresql.DBUser
	dbUrl := config.Configs.Database.Postgresql.DBUrl
	dbPassword := config.Configs.Database.Postgresql.DBPassword

	fmt.Printf("user=%s, url=%s, password=%s", dbUser, dbUrl, dbPassword)

	parsedURL, err := url.Parse(dbUrl)

	if err != nil {
		log.Logger.Error(fmt.Sprintf("Failed to parse DB_URL: %v", err))
	}

	parsedURL.User = url.UserPassword(dbUser, dbPassword)

	queryParams := parsedURL.Query()
	queryParams.Set("sslmode", "disable")
	parsedURL.RawQuery = queryParams.Encode()

	dsn := parsedURL.String()

	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Logger.Error(fmt.Sprintf("Failed to connect to database: %v", err))
		os.Exit(1)
	}

	sqlDB, err := database.DB()
	if err != nil {
		log.Logger.Error(fmt.Sprintf("Error getting *sql.DB: %v", err))
		os.Exit(1)
	}

	err = sqlDB.Ping()
	if err != nil {
		log.Logger.Error(fmt.Sprintf("Failed to ping database: %v", err))
		os.Exit(1)
	}

	fmt.Println("Connected to database successfully!")
	DB = database

}
