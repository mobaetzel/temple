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

	templateRoot := args[1]
	destination := args[2]
	definitions := args[3:]

	template := services.LoadTemplate(templateRoot)
	definedVariables := services.DefineVariables(template, definitions)

	services.ProcessTemplate(templateRoot, template, definedVariables, destination)
}
