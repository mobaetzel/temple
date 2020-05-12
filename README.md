# Install

Requires `go >= 1.13 `

```shell script
go build -o temple cmd/main.go
sudo mv temple /usr/local/bin
```

# Run
```shell script
temple TEMPLATE_FOLDER TEMPLATE_DESTINATION [...VARIABLES]
```

# Template Folder
A template Folder has the following folder structure:

```
- _variables.json
- _recipes.json
```

## Variables
The variables file contains all variables in the template.
These variables can be passed to the template during the create time.

```
[
    "module",
    "widget",
]
```

## Recipes
Recipes are instructions to complete when creating the template.
A instruction file contains steps to process.

```
[
    {
        "template": "path/to/template/controller.ts",
        "destination": "{{.module}}/{{.widget}}/{{.widget}}_controller.ts"
    },
    {
        "template": "path/to/template/view.html",
        "destination": "{{.module}}/{{.widget}}/{{.widget}}_view.html"
    }
]
```

## Template File
A template file can be any file.
This file can contain templates for the variables.

```
// controller.ts
// module: {{.module}}

export class {{.widget}}Controller {
    render(): {{.widget}}View {
        ...
    }
}
```
