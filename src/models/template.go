package models

type Template struct {
	Variables []Variable `json:"variables"`
	Recipes   []Recipe   `json:"recipes"`
}
