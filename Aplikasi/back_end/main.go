package main

import (
	"elib_v2/controllers"
	"elib_v2/initializers"

	// "elib_v2/middleware"
	"time"

	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
	initializers.SyncDatabase()
}

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"*"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return origin == "http://localhost:8081"
		},
		MaxAge: 12 * time.Hour,
	}))
	api := r.Group("/api")
	{

		api.POST("/signup", controllers.Signup)
		api.POST("/login", controllers.Login)
		//auth

		//crud buku
		api.GET("/books", controllers.Books)
		api.GET("/books/:id", controllers.Viewbookid)
		api.POST("/books", controllers.AddBooks)
		api.PUT("/books/:id", controllers.UpdateBook)
		api.DELETE("/books/:id", controllers.DeleteBook)

		//crud untuk pinjam
		api.GET("/pinjam", controllers.Pinjam)
		api.GET("/pinjam/:id", controllers.GetPinjamid)
		api.POST("/pinjam", controllers.AddPinjam)
		api.PUT("/pinjam/:id", controllers.UpdatePinjam)
		api.DELETE("/pinjam/:id", controllers.DeletePinjam)

		api.GET("/test", controllers.Test)
	}
	r.Run()
}
