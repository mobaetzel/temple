---
title: Eclipse Theia Setup
header: https://firebasestorage.googleapis.com/v0/b/mocodes.appspot.com/o/images%2Ftheia%2Feclipse-theia-header.jpg?alt=media&token=69c93e0a-151a-44e2-aace-03413fd3c10d
abstract: Entwicklung ohne Grenzen dank Cloud-IDE? Mit Eclipse Theia ist eine VSCode-ähnliche IDE auf den Markt gekommen. Ich zeige hier, wie man die IDE aufsetzt und berichte über meine bisherigen Erfahrungen.
published: 31.12.2019
---

[[toc]]


# Die Cloud IDE
Der Traum von unabhängigen Endgeräten für die Entwicklung beschäftigt mich schon seit längerer Zeit.
Softwarelösungen wie [Office 365](https://de.wikipedia.org/wiki/Microsoft_Office_365) oder auch [GoogleDocs](https://www.google.de/intl/de/docs/about/) zeigen, dass produktives Arbeiten im Browser ohne Rücksichtnahme auf die zugrundeliegende Hardware möglich ist und sehr gut funktionieren kann.

[![Relevant xkcd strip](https://imgs.xkcd.com/comics/real_programmers.png "Relevant xkcd strip")](https://xkcd.com/378/)

Als in unserem Unternehmen die Frage aufkam, welche Hardware wir anschaffen sollten, sobald wir mehr Leute einstellen, ging auch bei uns der ewige Grabenkampf über die einzelnen Betriebssysteme und Hersteller los.
Inspiriert von GoogleDocs und mit dem Wunsch eine hardwareunabhängige Unternehmenskultur zu schaffen habe ich mich aus Entwicklersicht eingehend mit dem Thema der Cloud IDEs beschäftigt und will hier zeigen, wie man mit wenig Aufwand eine eigene Cloud IDE aufsetzen kann.

## Noch mehr Cloud IDEs
Es gibt einige bekannte Cloud IDEs.
Jedem Webentwickler dürfte [JSFiddle](https://jsfiddle.net/) ein Begriff sein.
Dabei handelt es sich jedoch um eine auf die Webentwicklung reduzierte Cloud IDE.
Alternativen wie beispielsweise [Cloud9](https://aws.amazon.com/de/cloud9/), welches von Amazon gekauft und später in AWS integriert wurde, bieten einen größeren Umfang an Funktionen, verfügbaren Sprachen und Frameworks.

Eine freie Alternative zu Cloud9 stellt [Eclipse Theia](https://theia-ide.org/) dar.
Dieses Projekt der [Eclipse Foundation](https://www.eclipse.org/) ist OpenSource und kann von jedem Nutzer frei verwendet werden.
Bei Theia handelt es sich um eine Cloud IDE welche durch Plugins beliebig erweitert werden kann und auf den OpenSource-Teil von [Visual Studio Code](https://github.com/microsoft/vscode) setzt.

![Eclipse Theia Coding](/images/theia_code_example.jpg "Coding mit Eclipse Theia")

Da es sich um eine minimale IDE handelt, welche ohne Verwaltungstools und ähnliches entworfen wurde, wurde sie später in [Eclipse Che](https://www.eclipse.org/che/) integriert.
Eclipse Che ist eine Cloud-Lösung für die Bereitstellung von IDEs auf Basis von Docker und Kubernetes.
Dieses Softwarepaket ist mit diversen Tools zur Nutzerverwaltung, IDE Management und Rechteverwaltung ausgestattet.

Da das Setup von Eclipse Che mit größeren Vorbereitungen verbunden ist und ein rudimentäres Wissen über Kubernetes voraussetzt, wird in diesem Artikel nur auf Eclipse Theia eingegangen.
Ein weiterführender Beitrag zu Eclipse Che wird zu gegebener Zeit ebenfalls über diesen Blog veröffentlicht.

# Setup & Einrichtung
## Anforderungen
Um Theia erfolgreich bauen zu können, müssen einige Anforderungen von eurem System erfüllt sein.
Zum einen **muss** `node` in Version 10 vorliegen, des Weiteren muss die Paketverwaltungssoftware `yarn` installiert sein sowie der Befehl `python` auf Python 2.X zeigen.

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
nvm install 10
npm install -g yarn
python --version
```

Falls noch nicht installiert, muss etwa das Paket `build-essential` installiert sein.

```bash
sudo apt-get install -y build-essential
```

## Theia installieren
### Projektvorbereitung
Erstelle zur Projektvorbereitung als erstes, einen Ordner für Theia in welchem, die spätere Installation liegen soll.

```bash
mkdir theia
cd theia
```

In diesem Ordner wird jetzt eine Datei `package.json` angelegt und für die Webentwicklung konfiguriert

```json
{
  "private": true,
  "dependencies": {
    "typescript": "latest",
    "@theia/typescript": "next",
    "@theia/navigator": "next",
    "@theia/terminal": "next",
    "@theia/outline-view": "next",
    "@theia/preferences": "next",
    "@theia/messages": "next",
    "@theia/git": "next",
    "@theia/file-search": "next",
    "@theia/markers": "next",
    "@theia/preview": "next",
    "@theia/callhierarchy": "next",
    "@theia/merge-conflicts": "next",
    "@theia/search-in-workspace": "next",
    "@theia/json": "next",
    "@theia/textmate-grammars": "next",
    "@theia/mini-browser": "next"
  },
  "devDependencies": {
    "@theia/cli": "next"
  }
}
```

Die Abhängigkeiten zu Modulen, welche in `package.json` definiert werden, bestimmen die Funktionalität der späteren Theia-Installation.
Das aktuelle Projekt ist für die Webentwicklung mit JavaScript und TypeScript konfiguriert.
Andere Module für eine erweiterte Funktionalität können über die [NPM Paketsuche](https://www.npmjs.com/search?q=keywords:theia-extension) gefunden werden.
Für manche Funktionen müssen weitere Softwarepaket wie beispielsweise der [Python Language Server](https://github.com/palantir/python-language-server) oder der [Go Language Server](https://github.com/sourcegraph/go-langserver).

### Projekt bauen
Mit `yarn` können die vorher angegebenen Abhängigkeiten installiert werden und dann der Build-Befehl für Theia abgesetzt werden.

```bash
yarn
yarn theia build
```

### Theia starten
Um Theia zu starten, muss nur noch den Befehl `yarn theia start` eingegeben werden.
Über diesen Befehl können auch diverse Parameter zur Konfiguration der Theia-Instanz übergeben werden.

```bash
yarn theia start /workspace --hostname 0.0.0.0 --port 8080
```

Mit den Parametern können Beispielsweise das Stammverzeichnis für die Theia-Instanz oder die Informationen für den Listenserver übergeben werden.
Theia ist nun über [http://localhost:8080](http://localhost:8080) erreichbar.

## Theia schützen
Da die bisherige Theia-Instanz ohne Authentifizierung erreichbar ist, muss diese noch ausreichend geschützt werden.
Um diese Funktion so einfach wie möglich umzusetzen, wird ein [Nginx](https://www.nginx.com/) Server eingerichtet und als Reverse Proxy vor die laufende Theia-Instanz gesetzt.
Der Nginx Server übernimmt dann die Authentifizierung des Nutzers.

Dieses Setup ist vergleichsweise einfach und hauptsächlich für den privaten Gebrauch ausgelegt.
Das ganze gilt ebenfalls für die gesamte Theia-Instanz.

### Nginx und Theia Service einrichten
#### Nginx einrichten
Zuerst muss Nginx installiert werden.

```bash
sudo apt-get install -y nginx apache2-utils
```

Besuche jetzt [http://localhost](http://localhost) um zu verifizieren, dass Nginx erfolgreich installiert wurde.
Sollte alles geklappt haben, muss der Nginx-Server konfiguriert werden.

Zuerst wird eine Passwort-Datei angelegt.
Führe dazu die folgenden Befehle im Theia-Ordner aus und gibt dein Passwort ein, wenn es gefordert wird.

```bash
htpasswd -c .htpasswd USERNAME
```

Sobald eine Passwort-Datei vorhanden ist, muss Nginx als Reverse-Proxy für die Theia-Instanz eingerichtet werden.
Bearbeite dazu die Datei für die Standard-Seitenkonfiguration unter `/etc/nginx/sites-available/default`.

```nginx
# /etc/nginx/sites-available/default

server {
    listen 80;

    auth_basic "Theia CloudIDE";
    auth_basic_user_file /PATH/TO/YOUR/THEIA/FOLDER/.htpasswd; # Replace this!

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
}
```

Du kannst dann die neue Nginx-Konfiguration testen und den Service neu starten.

```bash
service nginx configtest
service nginx restart
```

Unter [http://localhost](http://localhost) sollte jetzt erst eine Abfrage der Authentifizierungsdaten stattfinden und danach ein "502 - Bad Gateway"-Fehler zu sehen sein.

#### Service einrichten
Um jetzt eine Theia-Instanz als Daemon zu starten, muss ein Service angelegt werden.
Erzeuge dazu die Datei `/lib/systemd/system/theia.service`:

```conf
# /lib/systemd/system/theia.service

[Unit]
Description=Theia

[Service]
User=USERNAME # Dein User
Type=simple
ExecStart=/bin/bash --rcfile /home/USERNAME/.bashrc -ci "yarn theia start --host 127.0.0.1 --port 8080"
WorkingDirectory=/PATH/TO/YOUR/THEIA/FOLDER/
Restart=always
KillSignal=SIGKILL

[Install]
WantedBy=multi-user.target
```

Lade jetzt den Systemctl-Daemon neu: `systemctl daemon-reload`.
Mit dem Befehl `systemctl start theia` kann man jetzt den Service für Theia starten.
Sollte alles geklappt haben, dann ist Theia nun unter [http://localhost](http://localhost) erreichbar.
Falls nicht kann mit dem Befehl `systemctl status theia` bzw. `journalctl -u theia` der Status und die Ausgabe des Services eingesehen werden. 

Um den Daemon zu stoppen oder neu zu starten, können die Befehle `systemctl stop theia` bzw. `systemctl restart theia` eingesetzt werden.

# Erfahrungsbericht
Als ich das erste Mal mit Theia in Kontakt kam (ca. Mitte 2019), war die IDE noch sehr rudimentär und es fehlten einige Funktionen.
Die Entwicklung mit TypeScript war kein großes Problem, Sprachen wir Python und Go erforderten jedoch relativ viel Konfigurationsaufwand.
Es fehlten außerdem einige Komfort-Funktionen welche ich von meinen alltäglichen IDEs gewohnt war.
Aus meiner damaligen Perspektive hätte ich gesagt, dass sich Theia nur bedingt für den produktiven Einsatz eignete.
Zu viele Funktionen dich ich als selbstverständlich ansah, fehlten.

![Eclipse Theia Dateiverwaltung](/images/theia_serach_example.jpg "Dateiverwaltung mit Eclipse Theia")

## Warum kann es das nicht?
Eins der größten Probleme stellte der fehlende Support für "Visual Studio Code"-Plugins dar.
Dank der großartigen Arbeit des Teams hinter Eclipse Theia wurde dieser jedoch Ende 2019 hinzugefügt und die IDE ist damit wertvoller als jemals zuvor.
Endlich kann auch ich all meine Lieblings-Plugins installieren und erhalte damit viele meiner alltäglichen Komfort-Funktionen ganz einfach in der Cloud.

## Benutze ich Theia weiter?
Für mich stellt Theia zurzeit noch ein kleines Experiment mit viel Potenzial dar.
Es macht Spaß einfach das Tablet zu entsperren und bequem auf dem Sofa ein paar Zeilen für das nächste kleine Hobbyprojekt zu schreiben oder auf dem schwachen Chromebook ohne weiteres auch die aufwändigsten Berechnungen laufen zu lassen.
Theia bietet mir sogar das die Möglichkeit meine Tensorflow-Projekte von meinem Tablet aus zu schreiben und diese auch auszuführen ohne mir großartig Gedanken um die Hardware meines Endgeräts zu machen.

Leider vermisse ich auch weiterhin viele der Funktionen, die mir momentan nur meine IDE auf meinem festen Rechner bieten kann.
Ich bin aber zuversichtlich, dass sich auch das in den kommenden Jahren ändern wird und ich mehr und mehr in die Cloud ausweichen kann.
Bis dahin bleibt mir Theia zwar erhalten, doch ich werde es eher für meine Hobbyprojekte und Vorträge verwenden, da ich dort jedes Endgerät einsetzen kann, auf das ich Lust habe.

# Update 02.01.2020
Mir sind einige Dinge aufgefallen, während ich mit Theia in das neue Jahr gestartet bin.
Aus diesem Grund gibt es hier ein paar kleine Updates.

## Git-Unterstützung
Um eine korrekte Git-Unterstützung zu gewährleisten, sollte sich die aktuelle Git-Installation auf dem neusten Stand befinden.
Mit Git Version 2.7.X auf meinem Ubuntu 16.04 Server hatte ich erhebliche Probleme das SCM-Plugin von Theia zum Laufen zu bringen.
Laut offizieller Dokumentation ist mindestens Git Version 2.11.X erforderlich.
Ein Update auf Git Version 2.24.X hat die meisten Probleme behoben und ich kann mich wieder vernünftig um meinen Code kümmern.

## Plugin-Unterstützung
Die Plugin-Unterstützung ist noch sehr rudimentär und ich habe sie erst nach einigem ausprobieren zum Laufen gebracht.
Das Hauptproblem war das anlegen und parsen von Ordnern für Plugins.
Nach meinem aktuellen Stand kann ich nur Plugins über ihre VSCode-Marketplace-ID hinzufügen und nicht einfach in dem dafür vorgesehenen Ordner ablegen.

Ich bin gespannt, wie sich dieses Feature in Zukunft entwickeln wird.
Vorerst werde ich einmal ein Setup machen und dieses, sobald es läuft nicht weiter modifizieren.
