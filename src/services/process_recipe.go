package services

import (
	"bytes"
	"github.com/mobaetzel/temple/src/models"
	"text/template"
	"io/ioutil"
	"log"
	"os"
	"path"
)

func ProcessRecipe(templateFolder, destination string, recipe models.Recipe, variables map[string]string) {
	templateFilePath := path.Join(templateFolder, recipe.Template)
	fileDestinationPath := path.Join(destination, recipe.Destination)

	templateContent, err := ioutil.ReadFile(templateFilePath)
	if err != nil {
		log.Fatal(err)
	}

	destinationFileTemplate, err := template.New(templateFilePath).Parse(string(templateContent))
	if err != nil {
		log.Fatal(err)
	}

	var fileContent bytes.Buffer
	err = destinationFileTemplate.Execute(&fileContent, variables)
	if err != nil {
		log.Fatal(err)
	}

	fileDestinationPathTemplate, err := template.New(fileDestinationPath).Parse(fileDestinationPath)
	if err != nil {
		log.Fatal(err)
	}

	var filePathContent bytes.Buffer
	err = fileDestinationPathTemplate.Execute(&filePathContent, variables)
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
