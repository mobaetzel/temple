package models

// A Recipe describes a single step when executing a template.
type Recipe struct {
	TemplatePath    string `json:"template"`
	DestinationPath string `json:"destination"`
}
