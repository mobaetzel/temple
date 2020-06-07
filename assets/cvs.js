export const education = [
  {
    start: new Date(2005, 7, 1),
    end: new Date(2013, 6, 1),
    school: 'Städtisches Gymnasium Bad-Laasphe',
    logo: 'https://firebasestorage.googleapis.com/v0/b/mocodes.appspot.com/o/images%2F_common%2Fgymbala_logo.jpg?alt=media&token=67dbc528-aa8d-4365-81ca-d685b8f11274',
    degree: 'Abitur (G8)',
    description: null,
    links: [
      {
        label: 'Schule',
        link: 'http://www.gymbala.de/',
      },
    ],
    tasks: null,
  },
  {
    start: new Date(2013, 9, 1),
    end: new Date(2017, 3, 1),
    school: 'Philipps-Universität Marburg',
    logo: 'https://firebasestorage.googleapis.com/v0/b/mocodes.appspot.com/o/images%2F_common%2Fumr_logo.jpg?alt=media&token=d8087c3d-7e47-4157-94b2-a26edbd9212d',
    degree: 'B.sc. Informatik',
    description: 'Studium der Informatik mit Schwerpunkt auf Programmiersprachen und Werkzeuge. Abschlussarbeit im Bereich "Integration von KI-Systemen in bestehende Consumer-Software"',
    links: [
      {
        label: 'Universität',
        link: 'https://www.uni-marburg.de/',
      },
    ],
    tasks: [
      'Entwicklung einer bildbasierten Positionserkennung im dreidimensionalen Raum für VR-Anwendungen',
      'Integration einer KI zur semantischen Erkennung von Bildern in Adobe Lightroom',
      'Arbeit als Tutor für "Deklarative Programmiersprachen"'
    ],
  },
].sort(sortByEndDate);

export const job = [
  {
    start: new Date(2017, 10, 1),
    end: new Date(2018, 11, 1),
    company: 'enwork GmbH',
    logo: 'https://firebasestorage.googleapis.com/v0/b/mocodes.appspot.com/o/images%2F_common%2Fexist_logo.jpg?alt=media&token=daecb4e3-c12d-4887-bfd7-4bae062ac69f',
    position: 'EXIST-Gründerstipendium',
    description: 'Auszeichnung mit dem EXIST-Gründerstipendium und Förderung über ein Jahr durch das BMWi und den ESF. Forschung und Entwicklung an einer KI-gestützte Recruiting-Platform.',
    links: [
      {
        label: 'Über EXIST',
        link: 'https://www.exist.de/DE/Home/inhalt.html',
      },
      {
        label: 'Nachweis Stipendium',
        link: 'https://www.exist.de/DE/Programm/Exist-Gruenderstipendium/Vorhabenkarte/EGSVorhaben/03EGSHE175.html',
      },
      {
        label: 'Beitrag "Hessen Schafft Wissen"',
        link: 'https://www.hessen-schafft-wissen.de/dynasite.cfm?dsmid=503079&pid=206&skipfurl=1',
      },
    ],
    tasks: [
      'Entwicklung einer Server-Client Architektur',
      'Entwicklung einer WebApp mit React',
      'Entwicklung einer REST-API mit Django',
      'Forschung und Entwicklung im Bereich "Matching von Jobsuchenden und Stellenanzeigen" mit Hilfe von KI',
    ],
  },
  {
    start: new Date(2018, 11, 1),
    end: null,
    company: 'enwork GmbH',
    logo: 'https://firebasestorage.googleapis.com/v0/b/mocodes.appspot.com/o/images%2F_common%2Fenwork_logo.png?alt=media&token=6e632d2b-29e7-422e-9afb-c82d26e1478d',
    position: 'Co-Founder und Full-Stack Developer',
    description: 'Entwicklung und Vertrieb einer Cloudbasierten Recruiting-Platform. Bewerbungsprozesse können flexibel abgebildet werden und alle Prozessschritte werden so weit wie möglich automatisiert und mit unterstützenden Funktionen versehen. Die Platform ist als WebApp sowie MobileApp verfügbar.',
    links: [
      {
        label: 'enwork',
        link: 'https://www.enwork.de/'
      },
      {
        label: 'Beitrag "Mittelhessen Blog"',
        link: 'https://blog.mittelhessen.eu/www/enwork-beeindruckt-mit-recruiting-fu-r-die-netflix-generation?fbclid=IwAR2ZlUtLXhuMTYe79y6grNvnjP6hzYl95vt0MMvAtbKh6zQAAkWOnWAPDaY',
      },
    ],
    tasks: [
      'Entwicklung einer WebApp mit React',
      'Entwicklung einer REST-API mit Django',
      'Entwicklung einer MobileApp mit Flutter',
      'Aufbau und Wartung von unternehmenskritischen Cloud-Services',
      'Aufbau, Wartung, Optimierung und Erweiterung einer Server-Client Infrastruktur via AWS und Google Cloud mit u.A. Docker und Kubernetes',
      'Konzeption von neuen Microservices für eine bestehende Infrastruktur',
      'Anleitung weiterer Entwickler im Bereich Mobile-Entwicklung',
    ]
  },
  {
    start: new Date(2020, 0, 1),
    end: null,
    company: 'Hessen Ideen Stipendium',
    logo: 'https://firebasestorage.googleapis.com/v0/b/mocodes.appspot.com/o/images%2F_common%2Fhis_logo.jpg?alt=media&token=98ff48c2-01b0-4948-8157-6e0d56883a1f',
    position: 'Mobile & Plugin Developer',
    description: 'Auszeichnung mit dem Hessen Ideen Stipendiums und 6 monatige Förderung durch u.A. das Land Hessen. Forschung und Entwicklung von sozialen Produkten auf Basis der Block-Chain-Technologie sowie Konzeption und Entwicklung von wertebasierten Vorschlagsystemen für soziale Projekte und Organisationen.',
    links: [
      {
        label: 'Über HIS',
        link: 'https://hessen-ideen.de/stipendium/',
      },
      {
        label: 'Beitrag "Jahrgang 2020.1"',
        link: 'https://hessen-ideen.de/stipendium/stipendiaten/20201/'
      },
    ],
    tasks: [
      'Entwicklung eines Chrome-Plugins mit integriertem XMR-Miner',
      'Entwicklung einer MobileApp mit Flutter und der Google Firebase',
      'Entwicklung einer WebApp mit Nuxt.js',
    ]
  },
].sort(sortByEndDate);

export const other = [
  {
    start: new Date(2018, 2, 1),
    end: null,
    organization: 'GründerVirus e.V.',
    title: 'Vorstandstandsarbeit',
    logo: 'https://firebasestorage.googleapis.com/v0/b/mocodes.appspot.com/o/images%2F_common%2Fgv_logo.jpg?alt=media&token=1d713c91-f481-4aac-ad2d-374b2e3b5e5f',
    description: 'Arbeit als Vorstand des Vereins GründerVirus e.V.. Organisation von Vorträgen, Workshops und Netzwerkabenden für GründerInnen aus der Region Marburg-Biedenkopf.',
    links: [
      {
        label: 'GründerVirus e.V.',
        link: 'https://gruendervirus.de/',
      },
      {
        label: 'Flyer Wintersaison 2019/2020',
        link: 'https://firebasestorage.googleapis.com/v0/b/mocodes.appspot.com/o/files%2Fflyer_gv_season_2019_2020.pdf?alt=media&token=818a4634-0778-44cf-90b0-34d2cc5f9acd',
      },
    ],
    tasks: [
      'Organisation und Leitung von Workshops und anderen Veranstaltungen',
      'Entwicklung und Verwaltung der Vereinswebsite',
      'Konzeption und Umsetzung von Werbematerialien',
      'Zusammenarbeit mit WiFö Stadt Marburg und WiFö Marburg-Biedenkopf',
    ]
  },
].sort(sortByEndDate);

function sortByEndDate(a, b) {
  if (a.start < b.start) {
    return 1;
  }
  if (a.start > b.start) {
    return -1;
  }
  return 0;
}
