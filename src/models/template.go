package models

// A Template is a container for a list of variables and recipes.
type Template struct {
	Variables []Variable `json:"variables"`
	Recipes   []Recipe   `json:"recipes"`
}
