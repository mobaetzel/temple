---
title: Headless CMS & Nuxt.js
header: https://firebasestorage.googleapis.com/v0/b/mocodes.appspot.com/o/images%2Fnuxtjs%2Fwordpress-cms.jpg?alt=media&token=0bf4a09f-9cc4-48b9-8899-470932b360c5
abstract: Eine frei konfigurierbare Webseite auf Basis eines modernen Webframeworks auf der sich leicht neue Inhalte veröffentlichen lassen? Mit Nuxt und einem Headless-CMS kein Problem!
published: 17.12.2019
---

[[toc]]

# CMS vs Headless CMS
Ein CMS oder auch **Content Management System** ist ein Service der auch Nutzern mit technisch fragwürdigem Wissen erlaubt, den Inhalt und Aufbau einer Webseite zu verwalten.
Für herkömmliche CMS gibt es viele Beispiele. Zu den bekanntesten gehören [Wordpress](https://wordpress.org), [Typo3](https://typo3.org/) und [Drupal](https://www.drupal.org/).

Ein **Headless-CMS** soll genau wie ein CMS auch dazu dienen Nutzern, ohne technisches Vorwissen, die Konfiguration und Verwaltung einer Webseite zu erlauben.
Dabei verzichtet ein Headless-CMS im Gegensatz zu herkömmlichen CMSs jedoch auf die Logik für das Anzeigen der Inhalte.
Diese werden lediglich über eine Schnittstelle bereitgestellt.
Das sorgt dafür, dass zwar eine eigene Anzeigelogik entwickelt werden muss, diese jedoch viel flexibler gewählt werden kann und nicht vom CMS selbst abhängt.
Wo bei Wordpress und Co. alle Oberflächen mit PHP oder ähnlichem entwickelt werden müssen, kann bei einem Headless-CMS frei entschieden werden auf welchen Techstack man setzt.
Darüber hinaus können mit einem Headless-CMS erstellte Inhalte bei richtiger Konfiguration effizienter und kostengünstiger ausgeliefert werden wie beispielsweise aus einem S3-Bucket heraus.

Um besser zu verstehen, wie mächtig diese Eigenschaft ist, soll im Folgenden ein einfacher Blog mit dem Headless-CMS [GraphCMS](https://graphcms.com/) und [Nuxt.js](https://nuxtjs.org/) realisiert werden.

# GraphCMS Setup
[GraphCMS](https://graphcms.com/) steht in dieser Anleitung stellvertretend für ein breites Spektrum an Headless-CMSs.
Alternativen sind beispielsweise die SaaS-Lösung [ButterCMS](https://buttercms.com/), [Directus](https://directus.io/) zum Selbsthosten oder auch ausgefallene Lösungen wie [DriveCMS](https://www.drivecms.xyz/) welches auf die Datenhaltung in der GoogleDrive setzt.

GraphCMS eignet sich gut für einen Guide da es für kleine, nicht-kommerzielle Projekte kostenfrei ist.
Des Weiteren stammt das Team hinter GraphCMS aus meiner Region und sie sind ein gutes Beispiel für das Potential in Mittelhessen.

Nachdem ein Account unter [https://auth.graphcms.com/login](https://auth.graphcms.com/login) angelegt und ein erstes Projekt erstellt wurde, können die ersten Modelle für den Blog eingepflegt werden.

Das Modell `Post` für einen Blogpost ist dabei so rudimentär wie möglich und besteht aus den folgenden Feldern:

| Feld | Beschreibung |
| --- | --- |
| `title` | Der Titel des Posts |
| `headerImage` | Eine Referenz auf ein Asset, welches über den Medienupload in GraphCMS hinterlegt wurde |
| `text` | Der Inhalt des Posts in Form eines Markdown-Strings |


![Modell für Blog-Post](/images/headless-cms-model-config-post-a.jpg "Modell für einen Blog-Post")

Um einem Post einen Autor zuzuordnen, muss ein weiteres Modell `Author` angelegt werden:

| Feld | Beschreibung |
| --- | --- |
| `name` | Der Name des Autors |


![Modell für Autor](/images/headless-cms-model-config-author.jpg "Modell für einen Autor")

Jetzt da auch ein Autor-Modell existiert, kann das Blog-Modell um das Feld `author` erweitert werden, welches eine Many-To-One- bzw. Nx1-Beziehung zwischen Autoren und Posts darstellt.


![Modell für Blog-Post](/images/headless-cms-model-config-post-b.jpg "Modell für einen Blog-Post")

# Die erste Query
Nachdem Datensätze, für die zuvor angelegten Modell erstellt wurden, kann eine erste Query geschrieben werden.
Über den **API Explorer** von GraphCMS lassen sich leicht neue Queries anlegen und ausprobieren.

Um eine Übersicht aller Autoren zu erhalten, kann man beispielsweise die folgende Query ausführen:

```
{
    authors {
        id
        name
    }
}
```

Diese Anfrage liefert ein Objekt mit allen Autoren des Blogs:

```json
{
  "data": {
    "authors": [
      {
        "id": "ck4s7l2m9nf4c0b20lwy56187",
        "name": "Finn Moritz Bätzel"
      }
    ]
  }
}
```

## GraphQL 101
Mehr Informationen zu GraphQL gibt es in der offiziellen Documentation unter [https://graphql.org/learn/](https://graphql.org/learn/).
Dort wird nicht nur die Query-Syntax erklärt, sondern 

# Das Nuxt Projekt
Um die Daten aus dem Headless-CMS verarbeiten zu können muss erst ein Nuxt Projekt angelegt werden.

```shell
npx create-nuxt-app nuxt-blog
```

Nach dem Durchlaufen des geführten Setups wechselt man in das neu erstellte Projektverzeichniss (`cd nuxt-blog`) und installiert die folgenden Module:

```shell
npm install --save @nuxtjs/apollo vue-markdown graphql-tag
```

`vue-markdown` übernimmt die Anzeige von Markdown-Strings in Vue und `@nuxtjs/apollo` ist ein GraphQL-Client in Form eines Nuxt-Moduls, welches von der Nuxt-Community bereitgestellt wird.
`graphql-tag` dient dazu, die GraphQL-Queries zu parsen.

## Konfiguration von Nuxt
Um auf Apollo zugreifen zu können muss das Nuxt-Projekt erst konfiguriert werden.
Dazu wird die Datei `nuxt.config.js` angepasst:

```js
// nuxt.config.js

export default {
    ...
    modules: [
        ...
        '@nuxtjs/apollo',
    ],
    apollo: {
        clientConfigs: {
            default: '~/apollo.config.js'
        }
    },
    ...
}
```

Um mit Apollo auf die Schnittstelle des Headless-CMS zugreifen zu können, muss auch Apollo konfiguriert werden.
Dazu wird die Datei `apollo.config.js` im Stammverzeichnis des Nuxt-Projekts angelegt:

```js
// apollo.config.js

import {createHttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {setContext} from 'apollo-link-context';

const GRAPHCMS_API = '';   // URL für CMS-Schnittstelle
const GRAPHCMS_AUTH = '';  // API-Key für den Zugriff auf die Schnittstelle 

const httpLink = createHttpLink({
    uri: GRAPHCMS_API,
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: `Bearer ${GRAPHCMS_AUTH}`,
        }
    }
});

export default () => ({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultHttpLink: false
})
```

Die URL für die CMS-Schnittstelle kann in den Einstellungen von GraphCMS eingesehen werden.
Für den API-Key muss ein neuer Schlüssel in den Einstellungen angelegt werden.
Dieser erhält Berechtigungen für die Abfrage der API aber nicht für etwaige Veränderungen der Daten.


![Token-Konfiguration](/images/headless-cms-build-token.jpg "Konfiguration eines Deploy-Tokens")


Um zu überprüfen, ob alles richtig konfiguriert ist, kann mit `npm run dev` ein Dev-Server gestartet werden.
Dieser ist standardmäßig über [http://localhost:3000](http://localhost:3000) erreichbar.

# Die Seiten
Um die Blogposts anzeigen zu können, gibt es zwei Arten von Seiten.
Zum einen eine Seite mit einer Übersicht über alle existierenden Blogposts und zum Anderen für jeden Blogpost eine dedizierte Seite.
Dabei sollen die Posts in der Übersicht auf die Seiten der einzelnen Posts verlinken.

## Die Übersicht
Als Übersichtsseite wählen wir den Index.
Die Datei `pages/index.vue` sieht dann wie folgt aus:

```html
// pages/index.vue

<template>
    <div>
        <h2 v-if="loading > 0">
            Loading...
        </h2>
        <ul v-else>
            <li v-for="post in posts" :key="post.id">
                <a :href="`/posts/${post.id}`">
                    {{ post.title }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    import gql from 'graphql-tag'

    const postsQuery = gql`
        query posts {
            posts {
                id
                title
            }
        }
    `;

    export default {
        name: 'index',
        data: () => ({
            loading: 0
        }),
        apollo: {
            $loadingKey: 'loading',
            posts: {
                query: postsQuery,
            }
        },
    }
</script>

<style scoped>
</style>
```

Als Index für die Seite sollte jetzt eine Liste mit allen eingetragenen Blogposts angezeigt werden.

## Ein Post
Um einen Post anzuzeigen, muss eine Seite mit einem URL-Parameter gelegt werden.
URL-Parameter werden in Nuxt durch einen Unterstrich (_) am Anfang des Dateinamens einer Seite gekennzeichnet.
Sollte die Seite später statisch erzeugt werden, so wird in der generierten Datei der URL-Parameter durch die statischen Daten ersetzt werden.
Für einen Post wird die Datei `pages/posts/_id.vue` angelegt.

```html
// pages/posts/_id.vue

<template>
    <h2 v-if="loading > 0">
        Loading...
    </h2>
    <div v-else>
        <article>
            <h1>{{ post.title }}</h1>
            <h4>von {{ post.author.name }}</h4>
            <div class="placeholder">
                <img :alt="post.title"
                     :src="`https://media.graphcms.com/resize=w:650,h:366,fit:crop/${post.headerImage.handle}`"/>
            </div>
            <vue-markdown>{{ post.text }}</vue-markdown>
        </article>
    </div>
</template>

<script>
    import gql from 'graphql-tag'
    import VueMarkdown from 'vue-markdown'

    const postQuery = gql`
        query post($id: ID!) {
            post(where: {id: $id}) {
                id
                title
                headerImage {
                    handle
                }
                text
                author {
                    name
                }
            }
        }
    `;

    export default {
        name: 'post',
        data: () => ({
            loading: 0
        }),
        apollo: {
            $loadingKey: 'loading',
            post: {
                query: postQuery,
                variables () {
                    return {
                        id: this.$route.params.id
                    }
                }
            }
        },
        components: { VueMarkdown }
    }
</script>

<style scoped>
  .placeholder {
    height: 366px;
    background-color: #eee;
  }
</style>
```

Über die Links auf der Indexseite sind jetzt die einzelnen Posts über ihre Links erreichbar.
Das Anzeigen des Markdown-Texts wird bei den Posts durch das VueMarkdown-Modul realisiert.

# Statische Seiten generieren
Mit dem Befehlt `npm run generate` könnten jetzt die statischen Dateien für den Blog generiert werden.
Da Nuxt die dynamischen Seiten für die Posts nicht selbst anlegen kann, müssen die Pfade für diese anhand der Daten aus dem CMS generiert werden.
Sobald diese Pfade vorliegen, kann Nuxt selbstständig die entsprechenden HTML-Seiten erzeugen.
Um die Pfade zu generieren werden zwei weitere Module benötigt.

```
npm install --save apollo-client node-fetch
```

`apollo-client` wird verwendet, um gezielte GraphQL-Anfragen abzusetzen.
`node-fetch` wird benötigt, um im Node-Kontext Http-Anfragen durchzuführen.
Das ist notwendig, da zum Zeitpunkt der Generierung der Pfade für die Posts nur die Node-Umgebung zur Verfügung steht und innerhalb dieser kein `fetch` verfügbar ist.

Um die Pfade zu generieren wird die Datei `nuxt.config.js` angepasst.

```js
// nuxt.config.js

import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag'
import ApolloConfig from './apollo.config';

export default {
    ...
    generate: {
        routes() {
            const client = new ApolloClient(ApolloConfig());
            const postsQuery = gql`
                query posts {
                    posts {
                        id
                    }
                }
            `;
            return client.query({
                query: postsQuery
            }).then(result => {
                return result.data.posts.map(post => `posts/${post.id}`));
            }
        }
    }
}
```

Darüber hinaus muss die Datei  `apollo.config.js` angepasst werden um das Modul `node-fetch` für Anfragen zu verwenden.

```js
// apollo.config.js

import fetch from 'node-fetch';

...

const httpLink = createHttpLink({
    uri: GRAPHCMS_API,
    fetch: fetch,
});

...
```

Jetzt kann der Befehl `npm run generate` ausgeführt werden.
Diese Funktion erzeugt einen Ordner `dist/` in dem alle von Nuxt benötigten Dateien abgelegt werden, sowie die HTML-Dokumente für die Seiten.
Im Unterordner `dist/posts/` befinden sich darüber hinaus für jeden Post welcher im GraphCMS hinterlegt wurde eine eigene HTML-Datei mit den Daten aus dem CMS.

# Zusammenfassung
Mit Nuxt, Apollo und GraphCMS ist es sehr einfach einen schlanken und flexiblen Blog auf die Beine zu stellen.
Dank des großen Funktionsumfangs von Nuxt können darüber hinaus not weitaus mehr Funktionalitäten integriert werden wie Beispielsweise Pagination oder aussagekräftige URL-Schemata.
Des Weiteren erlaubt es GraphQL, dass sich Daten flexibel und effizient abrufen lassen und dank des Apollo-Moduls von Nuxt nahtlos in die Nuxt-Seite eingebettet werden können.
