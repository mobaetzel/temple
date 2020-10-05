package services

import (
	"bufio"
	"fmt"
	"github.com/mobaetzel/temple/src/models"
	"log"
	"os"
	"strings"
)

// Defined all variables of a given template.
// This parses the passed args and asks the invoking user for all remaining variables.
func DefineVariables(template models.Template, args []string) models.VariableDefinitions {
	variables := models.VariableDefinitions{}

	// Read all passed arguments, split them at the equal sign and add them to the definitions.
	for _, arg := range args {
		parts := strings.Split(arg, "=")
		if len(parts) > 2 {
			log.Fatalf("Malformed argument \"%s\"", arg)
		} else if len(parts) == 2 {
			variables[parts[0]] = parts[1]
		} else if len(parts) == 1 {
			variables[parts[0]] = ""
		}
	}

	// Go over the variables of the template and check they are already filled in.
	// If they are not set, prompt the user for input.
	reader := bufio.NewReader(os.Stdin)
	for _, variable := range template.Variables {
		_, ok := variables[variable]
		if !ok {
			fmt.Printf("%s: ", variable)
			val, _ := reader.ReadString('\n')
			val = strings.Trim(val, " \n\t\r")
			variables[variable] = val
		}
	}

	return variables
}
