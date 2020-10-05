package services

import (
	"encoding/json"
	"github.com/mobaetzel/temple/src/models"
	"io/ioutil"
	"log"
	"os"
	"path"
)

const TemplateConfigFileName = ".template.json"

// Load a template by its path.
func LoadTemplate(templateRoot string) models.Template {
	checkTemplateFolder(templateRoot)
	return parseTemplateConfig(templateRoot)
}

// Check if the given template folder exists and contains a template config file.
func checkTemplateFolder(templateRoot string) {
	_, err := os.Stat(path.Join(templateRoot, TemplateConfigFileName))
	if err != nil {
		log.Fatalf("failed to load template: %s\n", templateRoot)
	}
}

// Load the template config file and parse the content into a template model.
func parseTemplateConfig(templateRoot string) models.Template {
	configFilePath := path.Join(templateRoot, TemplateConfigFileName)
	configFileContent, err := ioutil.ReadFile(configFilePath)
	if err != nil {
		log.Fatalf("could not read the template config file %s\n", configFilePath)
	}
	var template models.Template
	err = json.Unmarshal(configFileContent, &template)
	if err != nil {
		log.Fatalf("template config file %s could not be parsed\n", configFilePath)
	}
	return template
}
