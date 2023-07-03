package controllers

import (
	"elib_v2/initializers"
	"elib_v2/models"

	"github.com/gin-gonic/gin"
)

func Books(c *gin.Context) {
	var books []models.Books
	initializers.DB.Find(&books)

	c.JSON(200, books)
}

func Viewbookid(c *gin.Context) {
	id := c.Param("id")

	var books []models.Books
	initializers.DB.Find(&books, id)

	c.JSON(200, books)
}

func AddBooks(c *gin.Context) {
	// ambil data
	var body struct {
		Judul         string
		Penulis       string
		Penerbit      string
		Tanggal_rilis string
	}

	c.Bind(&body)

	//tambah buku
	post := models.Books{Judul: body.Judul, Penulis: body.Penulis, Penerbit: body.Penerbit, Tanggal_rilis: body.Tanggal_rilis}
	result := initializers.DB.Create(&post)

	if result.Error != nil {
		c.Status(400)
		return
	}

	c.JSON(200, gin.H{
		"book": post,
	})
}

func UpdateBook(c *gin.Context) {
	// ambil dulu id buku
	id := c.Param("id")

	// ambil data request
	var body struct {
		Judul         string
		Penulis       string
		Penerbit      string
		Tanggal_rilis string
	}

	c.Bind(&body)

	//ambil post update
	var books models.Books
	initializers.DB.First(&books, id)

	//update
	initializers.DB.Model(&books).Updates(models.Books{
		Judul:         body.Judul,
		Penulis:       body.Penulis,
		Penerbit:      body.Penerbit,
		Tanggal_rilis: body.Tanggal_rilis,
	})

	//respon
	c.JSON(200, gin.H{
		"book": books,
	})
}

func DeleteBook(c *gin.Context) {
	id := c.Param("id")

	initializers.DB.Delete(&models.Books{}, id)

	//respon
	c.JSON(200, gin.H{
		"message": "Buku terhapus!",
	})
}

func Test(c *gin.Context) {
	c.JSON(200, gin.H{
		"testing": "testing",
	})
}
