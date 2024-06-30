package main

import (
	"log"

	"github.com/gin-gonic/gin"
)

type User struct {
	Username string `json:"username"`
	Gender   string `json:"gender"`
}

func setupRouter() *gin.Engine {
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.String(200, "pong")
	})
	return r
}

func postUser(r *gin.Engine) *gin.Engine {
	r.POST("/user/add", func(c *gin.Context) {
		var user User
		if err := c.BindJSON(&user); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}
		c.JSON(200, user)
	})
	return r
}

func main() {
	r := setupRouter()
	r = postUser(r)
	if err := r.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
