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

// Load a template by its path
func LoadTemplate(templateRoot, destination string, args []string) {
	checkTemplateFolder(templateRoot)

	variableNames := getVariables(templateRoot)
	recipes := getRecipes(templateRoot)

	variables := defineVariables(variableNames, args)

	for _, r := range recipes {
		ProcessRecipe(templateRoot, destination, r, variables)
	}
}

// Check if the given template exists.
func checkTemplateFolder(templateRoot string) {
	_, err := os.Stat(templateRoot)
	if err != nil {
		log.Fatalf("Failed to load template: %s\n", templateRoot)
	}
}

func getVariables(templateRoot string) []string {
	variablesPath := path.Join(templateRoot, "_variables.json")
	variablesContent, err := ioutil.ReadFile(variablesPath)
	if err != nil {
		log.Fatalf("Template %s has no variables defined\n", templateRoot)
	}
	var variables []string
	err = json.Unmarshal([]byte(variablesContent), &variables)
	if err != nil {
		log.Fatalf("Variables of %s could not be loaded\n", templateRoot)
	}
	return variables
}

func getRecipes(templateRoot string) []models.Recipe {
	recipePath := path.Join(templateRoot, "_recipes.json")

	recipeContent, err := ioutil.ReadFile(recipePath)
	if err != nil {
		log.Fatalf("Template %s has no recipes defined\n", templateRoot)
	}

	var recipes []models.Recipe
	err = json.Unmarshal([]byte(recipeContent), &recipes)
	if err != nil {
		log.Fatalf("Recipes of %s could not be loaded\n", templateRoot)
	}
	return recipes
}

func defineVariables(variableNames []string, args []string ) map[string]string {
	variables := map[string]string{}
	reader := bufio.NewReader(os.Stdin)

	for i, v := range variableNames {
		if len(args) > i {
			variables[v] = args[i]
		} else {
			fmt.Printf("%s: ", v)
			val, _ := reader.ReadString('\n')
			val = strings.Trim(val, " \n\t\r")
			variables[v] = val
		}
	}

	return variables
}
