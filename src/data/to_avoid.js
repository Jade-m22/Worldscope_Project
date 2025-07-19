const toAvoid = [
  {
    title: "Pompéi",
    country: "Italie",
    flag: "🇮🇹",
    year: "79 ap. J.-C.",
    desc: "Ville ensevelie par l’éruption du Vésuve.",
    type: "À éviter",
    status: "À éviter",
    position: [40.7497, 14.4869]
  },
  {
    title: "Fukushima",
    country: "Japon",
    flag: "🇯🇵",
    year: "2011",
    desc: "Zone à éviter suite à la catastrophe nucléaire.",
    type: "À éviter",
    status: "À éviter",
    position: [37.4218, 141.0327]
  },
  {
    title: "Tchernobyl",
    country: "Ukraine",
    flag: "🇺🇦",
    year: "1986",
    desc: "Zone d'exclusion radioactive suite à la catastrophe nucléaire.",
    type: "À éviter",
    status: "À éviter",
    position: [51.2768, 30.2219]
  },
  {
    title: "Pripiat",
    country: "Ukraine",
    flag: "🇺🇦",
    year: "1986",
    desc: "Ville fantôme après la catastrophe de Tchernobyl.",
    type: "À éviter",
    status: "À éviter",
    position: [51.3890, 30.0990]
  },
  {
    title: "Centralia",
    country: "États-Unis",
    flag: "🇺🇸",
    year: "1962",
    desc: "Ville abandonnée à cause d'un incendie souterrain qui brûle encore.",
    type: "À éviter",
    status: "À éviter",
    position: [40.8037, -76.3403]
  },
  {
    title: "La Vallée de la Mort",
    country: "États-Unis",
    flag: "🇺🇸",
    year: "N/A",
    desc: "Région extrêmement chaude et dangereuse pour les randonneurs.",
    type: "Lieu naturel",
    status: "À éviter",
    position: [36.5323, -116.9325]
  },
  {
    title: "Forêt d'Aokigahara",
    country: "Japon",
    flag: "🇯🇵",
    year: "N/A",
    desc: "Forêt tristement célèbre pour ses disparitions et son atmosphère lugubre.",
    type: "À éviter",
    status: "À éviter",
    position: [35.4875, 138.6883]
  },
  {
    title: "Le Triangle des Bermudes",
    country: "Océan Atlantique",
    flag: "🌊",
    year: "N/A",
    desc: "Zone maritime réputée dangereuse pour la navigation.",
    type: "Zone dangereuse",
    status: "À éviter",
    position: [25.0000, -71.0000]
  },
  {
    title: "Groenland Est (Zone militaire)",
    country: "Groenland",
    flag: "🇬🇱",
    year: "N/A",
    desc: "Zone militaire interdite d’accès.",
    type: "Zone interdite",
    status: "À éviter",
    position: [74.0, -20.0]
  },
  {
    title: "Fosse des Mariannes",
    country: "Océan Pacifique",
    flag: "🌊",
    year: "N/A",
    desc: "Point le plus profond des océans, inaccessible et dangereux.",
    type: "Zone extrême",
    status: "À éviter",
    position: [11.35, 142.2]
  },
  {
    title: "Volcan Krakatoa",
    country: "Indonésie",
    flag: "🇮🇩",
    year: "1883",
    desc: "Zone dangereuse à cause des éruptions volcaniques.",
    type: "À éviter",
    status: "À éviter",
    position: [-6.102, 105.423]
  },
  {
    title: "Mont Everest (Zone de la 'death zone')",
    country: "Népal/Chine",
    flag: "🇳🇵",
    year: "N/A",
    desc: "Zone mortelle pour les alpinistes au-dessus de 8 000 m.",
    type: "Zone extrême",
    status: "À éviter",
    position: [27.9881, 86.9250]
  }
];

export default toAvoid;