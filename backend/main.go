package main

import (
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	// 8080でサーバーを起動
	if error := r.Run(); error != nil {
		log.Fatal("Error while running the server")
	}
}
