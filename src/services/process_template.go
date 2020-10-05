package services

import (
	"github.com/cbroglie/mustache"
	"github.com/mobaetzel/temple/src/models"
	"io/ioutil"
	"log"
	"os"
	"path"
)

// Process a template.
func ProcessTemplate(templateRoot string, tmpl models.Template, definitions models.VariableDefinitions, destination string) {
	for _, recipe := range tmpl.Recipes {
		processRecipe(templateRoot, destination, recipe, definitions)
	}
}

// Process a single recipe from a template.
func processRecipe(templateFolder, destination string, recipe models.Recipe, definitions models.VariableDefinitions) {
	templateFilePath := path.Join(templateFolder, recipe.TemplatePath)
	fileDestinationPath := path.Join(destination, recipe.DestinationPath)

	// Load the content of the template file of this recipe.
	templateContent, err := ioutil.ReadFile(templateFilePath)
	if err != nil {
		log.Fatal(err)
	}

	// Render the template content with the given variable definitions.
	fileContent, err := renderString(string(templateContent), definitions)
	if err != nil {
		log.Fatal(err)
	}

	// Render the template path with the fiven variable definitions.
	filePath, err := renderString(fileDestinationPath, definitions)
	if err != nil {
		log.Fatal(err)
	}

	// Create destination directory tree.
	dir := path.Dir(filePath)
	err = os.MkdirAll(dir, os.ModePerm)
	if err != nil {
		log.Fatal(err)
	}

	// Write destination file of this recipe.
	err = ioutil.WriteFile(filePath, []byte(fileContent), os.ModePerm)
	if err != nil {
		log.Fatal(err)
	}
}

// Render a single string with a given set of variable definitions.
func renderString(content string, definitions models.VariableDefinitions) (string, error) {
	return mustache.Render(content, definitions)
}
