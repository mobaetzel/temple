package services

import (
	"bufio"
	"encoding/json"
	"fmt"
	"github.com/mobaetzel/temple/src/models"
	"io/ioutil"
	"log"
	"os"
	"path"
	"strings"
)

func LoadTemplate(templateRoot, destination string, args []string) {
	_, err := os.Stat(templateRoot)
	if err != nil {
		log.Fatalf("Failed to load template: %s\n", templateRoot)
	}

	variablesPath := path.Join(templateRoot, "_variables.json")
	recipePath := path.Join(templateRoot, "_recipe.json")

	variablesContent, err := ioutil.ReadFile(variablesPath)
	if err != nil {
		log.Fatalf("Template %s has no variables defined\n", templateRoot)
	}
	recipeContent, err := ioutil.ReadFile(recipePath)
	if err != nil {
		log.Fatalf("Template %s has no recipes defined\n", templateRoot)
	}

	var variableNames []string
	err = json.Unmarshal([]byte(variablesContent), &variableNames)
	if err != nil {
		log.Fatalf("Variables of %s could not be loaded\n", templateRoot)
	}

	var recipes []models.Recipe
	err = json.Unmarshal([]byte(recipeContent), &recipes)
	if err != nil {
		log.Fatalf("Recipes of %s could not be loaded\n", templateRoot)
	}

	variables := map[string]string{}
	reader := bufio.NewReader(os.Stdin)

	for i, v := range variableNames {
		def := ""
		if len(args) > i {
			def = args[i]
			fmt.Printf("%s (%s): ", v, def)
		} else {
			fmt.Printf("%s: ", v)
		}
		val, _ := reader.ReadString('\n')
		val = strings.Trim(val, " \n\t\r")
		if val == "" {
			variables[v] = def
		} else {
			variables[v] = val
		}
	}

	for _, r := range recipes {
		ProcessRecipe(templateRoot, destination, r, variables)
	}
}
