package services

import (
	"bytes"
	"github.com/mobaetzel/temple/src/models"
	"io/ioutil"
	"log"
	"os"
	"path"
	"text/template"
)

// Process a template.
func ProcessTemplate(templateRoot string, tmpl models.Template, definitions models.VariableDefinitions, destination string) {
	for _, recipe := range tmpl.Recipes {
		processRecipe(templateRoot, destination, recipe, definitions)
	}
}

func processRecipe(templateFolder, destination string, recipe models.Recipe, definitions map[string]string) {
	templateFilePath := path.Join(templateFolder, recipe.TemplatePath)
	fileDestinationPath := path.Join(destination, recipe.DestinationPath)

	templateContent, err := ioutil.ReadFile(templateFilePath)
	if err != nil {
		log.Fatal(err)
	}

	destinationFileTemplate, err := template.New(templateFilePath).Parse(string(templateContent))
	if err != nil {
		log.Fatal(err)
	}

	var fileContent bytes.Buffer
	err = destinationFileTemplate.Execute(&fileContent, definitions)
	if err != nil {
		log.Fatal(err)
	}

	fileDestinationPathTemplate, err := template.New(fileDestinationPath).Parse(fileDestinationPath)
	if err != nil {
		log.Fatal(err)
	}

	var filePathContent bytes.Buffer
	err = fileDestinationPathTemplate.Execute(&filePathContent, definitions)
	if err != nil {
		log.Fatal(err)
	}

	filePath := filePathContent.String()
	dir := path.Dir(filePath)
	err = os.MkdirAll(dir, os.ModePerm)
	if err != nil {
		log.Fatal(err)
	}

	err = ioutil.WriteFile(filePath, fileContent.Bytes(), os.ModePerm)
	if err != nil {
		log.Fatal(err)
	}
}
