---
title: CLI Templating Tool
header: https://firebasestorage.googleapis.com/v0/b/mocodes.appspot.com/o/images%2Ftemple%2Ftemplate-header.jpg?alt=media&token=1891f68c-c18f-4469-94a8-7577b1d789e3
abstract: Temple ist ein Tool für komplexe Templates mit Fokus auf den Einsatz in großen Projekte mit vorgeschriebener Architektur.
published: 28.05.2020
---

[[toc]]

# Problemstellung
Je größer Projekte werden, desto komplexer aber auch definierter wird die Architektur.
Um die Workflows unserer Entwickler zu verbessern und Klarheit über die Struktur unserer einzelnen Komponenten zu schaffen brauchten wir ein Templating-Tool.
Dieses sollte Multifile-Templates unterstützen uns sich gut in unsere IDEs und unser vorrangig CLI basiertes Ökosystem einbinden ließ.
Für diesen Zweck habe ich das Tool [Temple](https://github.com/mobaetzel/temple) entwickelt.

# Temple
Temple ist ein in Go geschriebenes CLI Tool für die arbeit mit Templates für bessere Entwicklungsprozesse.

## Installation
Lade Temple für dein Betriebssystem herunter und folge den Anweisungen für dein jeweiliges Betriebssystem.

### Windows
Verschiebe die heruntergeladene Executable in einen Ordner deiner Wahl und für den Ordner der `Path`-Umgebungsvariable deines Systems hinzu.
Klicke dazu mit einem rechtsklick auf den Windows-Button und klicke dich durch den folgenden Pfad: `System` -> `System info` -> `Advanced system settings` -> `Environment Variables...`.
Dort kannst du dann den Ordner mit Temple zum Pfad hinzufügen.
Nach dem Neustart deines Terminals steht dir Temple zur Verfügung.

### Linux/macOS
Verschiebe die Executable mit `sudo mv temple /usr/local/bin`.
Nach dem Neustart deines Terminals steht dir Temple zur Verfügung.

## Template
Ein Template ist immer ein Ordner mit den folgenden Dateien:

* `_variables.json`
* `_recipes.json`

Der Name des Ordners bestimmt dabei den Namen des Templates, wenn dieses mit Temple geladen werden soll.
**Der Ordnername darf keine Leer- oder Sonderzeichen enthalten.**

### Variablen
Die Datei `_variables.json` enthält eine Auflistung aller Variablen, welche im Template vorkommen.

```json
[
  "Klassenname",
  "Typ"
]
```

Diese Variablen werden beim Ausführen dieses Templates abgefragt und an den entsprechenden Stellen eingesetzt.

### Recipe
Die Datei `_recipes.json` enthält die Anweisungen zum Bauen des Templates.
Die Anweisungen sind dabei eine Liste von Objekten mit einem Verweis auf die Template-Datei und einem Pfad für die Zieldatei.
Der Pfad zur Template-Datei ist dabei relativ zum Root-Verzeichnis des Templates.
Der Pfad für die Zieldatei ist hingegen relativ zum Pfad, welcher beim Ausführen des Templates angegeben wird.

```json
[
    {
        "template": "pfad/zum/template/controller.java",
        "destination": "{{.Klassenname}}/{{.Klassenname}}Controller.ts"
    }
]
```

### Beispiel
Ein Beispiel für ein C-Template hätte die folgende Struktur:
```
+- c_struct
  +- files
  | +- header.h
  | +- struct.c
  +- _variables.json
  +- _recipes.json
```

Das Template für die Header-Datei hat dabei den folgenden Aufbau:
```c
// header.h

void print{{.StructName}}(struct {{.StructName}} str);
```

Das Template für die Source-Datei hat dabei den folgenden Aufbau:
```c
// struct.c

#include <stdio.h>

struct {{.StructName}} {
    // Implement fields of struct
}

#include "{{.StructName}}.h"

void print{{.StructName}}(struct {{.StructName}} str) {
    printf("Print not implemented for {{.StructName}}\n")
}
```

Die `_variables.json`-Datei beinhaltet die folgenden Variablen:
```json
[
  "StructName"
]
```

Die `_recipes.json`-Datei beinhaltet die folgenden Anweisungen:
```json
[
  {
    "template": "files/header.h",
    "destination": "{{.StructName}}.h"
  },
  {
    "template": "files/struct.c",
    "destination": "{{.StructName}}.c"
  }
]
```

Jetzt kann das Template mit dem folgenden Befehl ausgeführt werden:
```bash
temple ./c_struct ./personen
```
Temple wird dann die Variablen aus der `_variables.json` abfragen und einen Ordner `person` erzeugen.
Alternativ kann das Template auch mit allen dafür vorgesehenen Variablen direkt aufgerufen werden.
Die Variablen werden dabei der Reihe nach befüllt:
```bash
temple ./c_struct ./hunde Terrier
```

Das Beispiel kann [hier](https://firebasestorage.googleapis.com/v0/b/mocodes.appspot.com/o/files%2Ftemple_example_c_struct.zip?alt=media&token=65245c03-3a71-43e1-8aa4-73fcef91aa29) heruntergeladen werden.

# Download
| Dateien | MD5 |
| --- | --- |
| [Windows 32-bit .exe](https://firebasestorage.googleapis.com/v0/b/mocodes.appspot.com/o/files%2Ftemple%2Ftemple_windows_x86.exe?alt=media&token=43bf001f-7a93-4ea0-a43d-e88bf512bd00) | `9BCC0EA75DFDD69B288687A7666D15FA` |
| [Windows 64-bit .exe](https://firebasestorage.googleapis.com/v0/b/mocodes.appspot.com/o/files%2Ftemple%2Ftemple_windows_x86_64.exe?alt=media&token=31640348-9a0e-475d-8494-7d8e7b20a6ad) | `D558416FF51E5C56D9D0A236B664120C` |
| [Linux 32-bit binary](https://firebasestorage.googleapis.com/v0/b/mocodes.appspot.com/o/files%2Ftemple%2Ftemple_linux_x86?alt=media&token=4b266100-e589-4e62-93ee-a650c1da3c97) | `925A20AD2CD892B17C9CAA8BA038C2A9` | 
| [Linux 64-bit binary](https://firebasestorage.googleapis.com/v0/b/mocodes.appspot.com/o/files%2Ftemple%2Ftemple_linux_x86_64?alt=media&token=5ec48e6c-8aac-4875-a274-32d354454123) | `6EF53D8EEAE142F8532EDF1C5E0E68C9` |
| [macOS binary](https://firebasestorage.googleapis.com/v0/b/mocodes.appspot.com/o/files%2Ftemple%2Ftemple_macos_x86_64?alt=media&token=b7cf5f4e-dd57-4266-b441-e0e27fe48db6) | `CCE124A073639842D5C068D7E0DA519E` | 

# Build
[Temple](https://github.com/mobaetzel/temple) ist öffentlich auf GitHub verfügbar und läuft unter der [MIT-Lizenz](https://github.com/mobaetzel/temple/blob/master/LICENSE).
Um das Projekt Lokal zu bauen, sollte man das Repository klonen und der [Anleitung](https://github.com/mobaetzel/temple/blob/master/README.md) auf GitHub folgen.
