const dangerous = [
  {
    title: "Pompéi",
    country: "Italie",
    flag: "🇮🇹",
    year: "79 ap. J.-C.",
    desc: "Ville ensevelie par l’éruption du Vésuve.",
    type: "À éviter",
    status: "Dangereux",
    position: [40.7497, 14.4869]
  },
  {
    title: "Fukushima",
    country: "Japon",
    flag: "🇯🇵",
    year: "2011",
    desc: "Zone à éviter suite à la catastrophe nucléaire.",
    type: "À éviter",
    status: "Dangereux",
    position: [37.4218, 141.0327]
  },
  {
    title: "Tchernobyl",
    country: "Ukraine",
    flag: "🇺🇦",
    year: "1986",
    desc: "Zone d'exclusion radioactive suite à la catastrophe nucléaire.",
    type: "À éviter",
    status: "Dangereux",
    position: [51.2768, 30.2219]
  },
  {
    title: "Pripiat",
    country: "Ukraine",
    flag: "🇺🇦",
    year: "1986",
    desc: "Ville fantôme après la catastrophe de Tchernobyl.",
    type: "À éviter",
    status: "Dangereux",
    position: [51.3890, 30.0990]
  },
  {
    title: "Centralia",
    country: "États-Unis",
    flag: "🇺🇸",
    year: "1962",
    desc: "Ville abandonnée à cause d'un incendie souterrain qui brûle encore.",
    type: "À éviter",
    status: "Dangereux",
    position: [40.8037, -76.3403]
  },
  {
    title: "Tchernobyl",
    country: "Ukraine",
    flag: "🇺🇦",
    year: "1986",
    desc: "Site de la plus grave catastrophe nucléaire de l’histoire. Zone inhabitée, très radioactive.",
    type: "Dangereux",
    status: "Dangereux",
    position: [51.2768, 30.2219]
  },
  {
    title: "Fukushima Daiichi",
    country: "Japon",
    flag: "🇯🇵",
    year: "2011",
    desc: "Accident nucléaire majeur suite à un tsunami. Zone contaminée.",
    type: "Dangereux",
    status: "Dangereux",
    position: [37.4218, 141.0327]
  },
  {
    title: "Pripyat",
    country: "Ukraine",
    flag: "🇺🇦",
    year: "1986",
    desc: "Ville fantôme voisine de Tchernobyl, abandonnée et dangereuse.",
    type: "Dangereux",
    status: "Dangereux",
    position: [51.389, 30.099]
  },
  {
    title: "Groenland – Zone militaire de Thulé",
    country: "Groenland",
    flag: "🇬🇱",
    year: "1968",
    desc: "Crash nucléaire (B-52) – Débris radioactifs retrouvés dans la glace.",
    type: "Dangereux",
    status: "Dangereux",
    position: [76.5312, -68.7032]
  },
  {
    title: "Centralia",
    country: "États-Unis",
    flag: "🇺🇸",
    year: "1962",
    desc: "Ville minière en feu souterrain depuis plus de 50 ans. Sol instable et toxique.",
    type: "Dangereux",
    status: "Dangereux",
    position: [40.8034, -76.3403]
  },
  {
    title: "Triangle des Bermudes",
    country: "Océan Atlantique",
    flag: "🏴‍☠️",
    year: "-",
    desc: "Zone mythique où de nombreux navires et avions ont disparu mystérieusement.",
    type: "Dangereux",
    status: "Dangereux",
    position: [25.0000, -71.0000]
  },
  {
    title: "Zone démilitarisée (DMZ) Corée",
    country: "Corée du Nord / Corée du Sud",
    flag: "🇰🇵🇰🇷",
    year: "1953",
    desc: "Frontière militarisée très dangereuse, strictement interdite d'accès.",
    type: "Dangereux",
    status: "Dangereux",
    position: [38.322, 127.512]
  },
  {
    title: "Death Valley (Vallée de la Mort)",
    country: "États-Unis",
    flag: "🇺🇸",
    year: "-",
    desc: "Un des endroits les plus chauds du monde, risque mortel sans préparation.",
    type: "Dangereux",
    status: "Dangereux",
    position: [36.5323, -116.9325]
  },
  {
    title: "Mont Merapi",
    country: "Indonésie",
    flag: "🇮🇩",
    year: "2021",
    desc: "Volcan actif très dangereux, nombreuses éruptions meurtrières.",
    type: "Dangereux",
    status: "Dangereux",
    position: [-7.5407, 110.4461]
  },
  {
    title: "Zone de Fukushima (Océan Pacifique)",
    country: "Japon",
    flag: "🇯🇵",
    year: "2011",
    desc: "Eaux contaminées par la centrale nucléaire accidentée.",
    type: "Dangereux",
    status: "Dangereux",
    position: [37.2000, 142.0000]
  },
  {
    title: "Parc national Virunga",
    country: "RDC",
    flag: "🇨🇩",
    year: "-",
    desc: "Zone de conflits armés et braconnage. Très dangereux pour les visiteurs.",
    type: "Dangereux",
    status: "Dangereux",
    position: [-0.9501, 29.6001]
  },
  {
    title: "Détroit d’Ormuz",
    country: "Iran / Oman",
    flag: "🇮🇷🇴🇲",
    year: "-",
    desc: "Zone géopolitique à risque : tensions navales fréquentes.",
    type: "Dangereux",
    status: "Dangereux",
    position: [26.5667, 56.2500]
  },
  {
    title: "Cratère de Tunguska",
    country: "Russie",
    flag: "🇷🇺",
    year: "1908",
    desc: "Explosion massive causée par une météorite, zone isolée et dangereuse.",
    type: "Dangereux",
    status: "Dangereux",
    position: [60.886, 101.894]
  },
  {
    title: "Île de Pâques (Rapa Nui)",
    country: "Chili",
    flag: "🇨🇱",
    year: "-",
    desc: "Île isolée avec des ressources limitées, risques pour les visiteurs.",
    type: "Dangereux",
    status: "Dangereux",
    position: [-27.1542, -109.3497]
  }
];

export default dangerous;
