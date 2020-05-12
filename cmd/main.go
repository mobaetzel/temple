package main

import (
	"github.com/mobaetzel/temple/src/services"
	"os"
)

func main() {
	args := os.Args

	if len(args) < 3 {
		println("Usage: temple PATH/TO/TEMPLATE DESTINATION [...VARIABLES]")
		os.Exit(1)
	}

	services.LoadTemplate(args[1], args[2], args[3:])
}
