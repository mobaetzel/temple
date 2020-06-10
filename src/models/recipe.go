package models

// A Recipe models a single step when executing a template.
type Recipe struct {
	Template    string `json:"template"`
	Destination string `json:"destination"`
}
