package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"log"
)

func main() {
	app := fiber.New()

	app.Use(logger.New())

	app.Use(func(c *fiber.Ctx) error {
		// Makes sure the browser doesnt cache the files
		c.Set("Cache-Control", "no-store")
		return c.Next()
	})

	app.Static("/", "./")

	log.Fatal(app.Listen(":8080"))
}
