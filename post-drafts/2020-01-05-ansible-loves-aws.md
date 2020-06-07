---
title: "OpenVPN mit Ansible und AWS"
header: https://firebasestorage.googleapis.com/v0/b/mocodes.appspot.com/o/images%2Fansible-loves-aws%2Fansible-header.jpg?alt=media&token=586e7aad-1303-49d8-9df5-22221f089b6c
abstract: Ein eigenes VPN um sicher immer und überall ins Netz zu gehen ohne jemand Anderem ins Netz zu gehen. Mit Ansible und AWS ist der eigene VPN-Server leicht aufzusetzen und zu konfigurieren.
published: 05.01.2020
---

[[toc]]

# Unser kleiner VPN
In Zeiten in denen jeder immer und überall Online ist, hat das Bedürfnis nach sicherer Kommunikation ganz neue Ausmaße angenommen.
Wo sich früher noch LAN-Kabel aus der Wand wunden, sitzen heute alle mit ihren MacBooks, Tablets und Thinkpads in Cafés, Coworkingspaces oder der Bahn.
Ich auch.
Ich finde daran auch nichts verkehrt.
Es ist schön möglichst flexibel zu sein, wenn es um meine Arbeit geht.
Dabei darf ich jedoch meine Sicherheit nicht außer Acht lassen.

## König der WLANs
Denn auch wenn ich ganze genau darauf achte welche Daten ich auf meinen Computer wandern und welchen Programmen ich welche Rechte gebe, an meiner Wifi-Antenne hört mein Hoheitsgebiet auf und die Schatten beginnen.

![Mickey Mouse Reference](https://media.giphy.com/media/TFUYv2jzl9L9Kv2x4N/giphy.gif "Schatten")

Aus diesem Grund ist es von Vorteil wenn man weiß, wie man sich in solche Netzen schützen muss.
Auf diese Weise kann man ganz beruhigt im ICE seine Finanzen checken ohne sich sorgen darüber machen zu müssen, was mit dem eigenen Datenstrom passiert.

Die Lösung für das Problem ist ein Virtual Private Network, kurz **VPN**.
Dabei handelt es sich um eine virtuelle Variante des klassischen LANs das jeder von Zuhause kennt.
Sobald die Verbindung mit einem VPN hergestellt ist, wird der gesamte Datenstrom des Computers zuerst über eine gesicherte Verbindung zum verwendeten VPN-Server geleitet.
Dieser kommuniziert dann mit dem eigentlichen Ziel des Datenstroms.

Dieses Vorgehen bietet einige Vorteile wie z.B. dass die Datenübertragung schwerer zu belauschen ist oder dass sich Systeme schützen lassen, indem nur eine Verbindung aus einem speziellen VPN heraus erlaubt wird.
Aus diesen Gründen ist ein VPN besonders im Unternehmenskontext unabdingbar, bietet aber auch für den privaten Gebrauch viele Vorteile.

Um mich mit dem Thema VPN auseinander zu setzen, habe ich mir ein eigenes aufgesetzt.
Dabei habe ich den VPN-Server mit [AWS](https://aws.amazon.com/de/) gehostet und das Management mit [Ansible](https://www.ansible.com/) realisiert.
AWS bietet in den ersten 12 Monaten viele Services kostenlos an und eignet sich gut um ein erstes Setup durchzuführen.
Ansible ist eine Automatisierungslösung für die Verwaltung einer Server-Infrastruktur und setzt im Kern auf Python.
Als VPN-Server wird dabei die freie Software [OpenVPN](https://openvpn.net/) eingesetzt.
Diese ist für ein Gerät kostenfrei und eignet sich gut, um ein erstes Gefühl für einen eigenen VPN-Server zu bekommen.

## Ziele
Am Ende dieses Artikels soll ein Ansible-Playbook vorliegen, welches vollautomatisiert EC2-Instanzen anlegt für eine Nutzung als VPN-Gateway vorbereitet.
Auf diesen Instanzen soll dann der OpenVPN-Server installiert und in den Grundzügen für eine sichere Verwendung konfiguriert werden.
Das ganze soll leicht zu warten sein und einen Einblick in die Möglichkeiten von Ansible und AWS geben. 

# AWS Einrichten
Bevor wir mit dem Aufsetzen unserer Ansible-Playbooks beginnen, müssen einige Konfigurationsschritte in der AWS-Konsole vorgenommen werden.

![Jeremy Fixing Stuff](https://media.giphy.com/media/IelxugxenjdyU/giphy.gif "Fixing Stuff")

Zuerst muss ein Benutzer für Ansible angelegt werden um automatisiert EC2-Instanzen verwalten zu können.
Gehe dazu in die [IAM-Übersicht](https://console.aws.amazon.com/iam) und wähle die Liste der aktuellen [Nutzer](https://console.aws.amazon.com/iam/home?#/users) aus.
Dort fügst du einen neuen, programmatischen Benutzer mit dem Namen `infrastructure_deployer` hinzu.
Dieser erhält die Berechtigungen entsprechend der Filterrichtlinie `AmazonEC2FullAccess`.
Nachdem du diesen Nutzer erfolgreich erstellt hast, können die Authentifizierungsdaten für diesen Nutzer in Form einer CSV-Datei heruntergeladen werden.
**Achte darauf diese Datei griffbereit zu haben. Der Download ist später nicht mehr möglich.**

![Konfiguration neuer AWS Nutzer](https://firebasestorage.googleapis.com/v0/b/mocodes.appspot.com/o/images%2Fansible-loves-aws%2Faws_new_role_3.jpg?alt=media&token=a056e1c9-f810-4b6a-b7e7-01a5fd001cad "Der neue AWS Nutzer") 

Nachdem der nutzer für Ansible erfolgreich angelegt wurde, muss noch ein Schlüsselpaar für den späteren Login via `ssh` angelegt werden.
Gehe dazu in die [EC2-Übersicht](https://eu-central-1.console.aws.amazon.com/ec2/v2/home) und wähle am linken Rand den Unter `NETWORK & SECURITY` den Punkt `Key Pairs`.
Dort kannst du einen neues Schlüsselpaar anlegen.
**Denk auch hier daran, dir den Schlüssel von Form einer Schlüssel-Datei abzuspeichern. Der Download dieser Datei ist später nicht mehr möglich.**

![Das neue Schlüsselpaar](https://firebasestorage.googleapis.com/v0/b/mocodes.appspot.com/o/images%2Fansible-loves-aws%2Faws_ec2_key_pair.jpg?alt=media&token=eca011e9-c48e-47ab-9aec-588a3d4992fd "Das neue Schlüsselpaar") 

Sobald ein neuer AWS-Benutzer und ein Schlüsselpaar angelegt sind, kann die AWS-Konsole geschlossen werden und wir kümmern uns um unser Management.

# Control Node Vorbereiten
## Ansible Installieren

# Playbooks Anlegen
## Das Provision-Playbook
## Das Inventory
## Das Deploy-Playbook

# Zusammenfassung
