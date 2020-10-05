# About
TEMPLE is a tool to render templates based on multiple files.
The underlying templating engine is [Mustache](https://mustache.github.io/) and the templates contain mustache tags.

# Install

Requires `go >= 1.13 `

```shell script
go build -o temple cmd/main.go
sudo mv temple /usr/local/bin
```

# Run
```shell script
temple TEMPLATE_FOLDER TEMPLATE_DESTINATION [VARIABLE=VALUE...]
```

# Template folder
A template folder must contain a template config named `.template.json` file as well as the files for the template.
These files can be organized in any desired file tree.

## Template config
The template config has the following structure:

```json
{
  "variables": [
    ...
  ],
  "recipes": [
    ...
  ]
}
```

### Variables
The variables section in the template config contains a list of variables which will be passed to the template during the rendering process.
These variables can be passed to TEMPLE either as commandline arguments (`VAR=VALUE`) or are prompted to the user when executing a template and not passing them via the commandline.

```json
{
  "variables": [
    "module",
    "widget"
  ],
  ...
}
```

### Recipes
Recipes are instructions to complete when building a template.
These instructions define a path to a template file as well as a destination path where this file should be rendered.
The destination paths can also contain mustache tags.

```json
{
  ...,
  "recipes": [
    {
        "template": "path/to/template/controller.ts",
        "destination": "{{module}}/{{widget}}/{{widget}}_controller.ts"
    },
    {
        "template": "path/to/template/view.html",
        "destination": "{{module}}/{{widget}}/{{widget}}_view.html"
    }
  ]
}
```

### Full example
```json
{
  "variables": [
      "module",
      "widget"
  ],
  "recipes": [
    {
        "template": "path/to/template/controller.ts",
        "destination": "{{module}}/{{widget}}/{{widget}}_controller.ts"
    },
    {
        "template": "path/to/template/view.html",
        "destination": "{{module}}/{{widget}}/{{widget}}_view.html"
    }
  ]
}
```

## Template file
A template file can be any file.
This file can contain mustache tags based on the variables defined in the template config.

```
// controller.ts
// module: {{module}}

export class {{widget}}Controller {
    render(): {{widget}}View {
        ...
    }
}
```

## Run the example
```shell script
go run ./cmd/main.go ./examples/flutter_widget ./testing
go run ./cmd/main.go ./examples/flutter_widget ./testing widget_name=CmdArgWidgetName
```