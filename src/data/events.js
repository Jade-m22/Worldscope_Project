const events = [
  {
    title: "Grande Muraille de Chine",
    country: "Chine",
    flag: "🇨🇳",
    year: "220 av. J.-C.",
    desc: "L'une des 7 merveilles du monde, s'étend sur plus de 20 000 km.",
    type: "Monument",
    status: "À visiter",
    position: [40.4319, 116.5704],
  },
  {
    title: "Colisée",
    country: "Italie",
    flag: "🇮🇹",
    year: "80 ap. J.-C.",
    desc: "Ancien amphithéâtre romain, symbole de Rome.",
    type: "Monument",
    status: "À visiter",
    position: [41.8902, 12.4922],
  },
  {
    title: "Bataille de Waterloo",
    country: "Belgique",
    flag: "🇧🇪",
    year: "1815",
    desc: "Victoire décisive sur Napoléon, évènement historique majeur.",
    type: "Conflit",
    status: "Conflit",
    position: [50.6806, 4.4125],
  },

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
    title: "Mont Saint-Michel",
    country: "France",
    flag: "🇫🇷",
    year: "1523",
    desc: "Merveille de la Normandie.",
    type: "Monument",
    status: "À visiter",
    position: [48.6361, -1.5114]
  },
  {
    title: "Stonehenge",
    country: "Royaume-Uni",
    flag: "🇬🇧",
    year: "vers -2500",
    desc: "Célèbre site mégalithique.",
    type: "Monument",
    status: "À visiter",
    position: [51.1789, -1.8262]
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
},

{
  title: "Bataille de Stalingrad",
  country: "Russie",
  flag: "🇷🇺",
  year: "1942-1943",
  desc: "L'une des plus grandes batailles de la Seconde Guerre mondiale.",
  type: "Conflit",
  status: "Conflit",
  position: [48.708, 44.514]
},
{
  title: "Débarquement de Normandie",
  country: "France",
  flag: "🇫🇷",
  year: "1944",
  desc: "Opération alliée décisive contre l’Allemagne nazie pendant la Seconde Guerre mondiale.",
  type: "Conflit",
  status: "Conflit",
  position: [49.414, -0.821]
},
{
  title: "Chute du Mur de Berlin",
  country: "Allemagne",
  flag: "🇩🇪",
  year: "1989",
  desc: "Fin de la division de l’Allemagne, événement majeur de la Guerre froide.",
  type: "Conflit",
  status: "Conflit",
  position: [52.516, 13.377]
},
{
  title: "Guerre de Sécession – Bataille de Gettysburg",
  country: "États-Unis",
  flag: "🇺🇸",
  year: "1863",
  desc: "La bataille la plus meurtrière de la guerre civile américaine.",
  type: "Conflit",
  status: "Conflit",
  position: [39.830, -77.231]
},
{
  title: "Guerre du Vietnam – Bataille de Hué",
  country: "Vietnam",
  flag: "🇻🇳",
  year: "1968",
  desc: "Bataille clé de l'offensive du Têt.",
  type: "Conflit",
  status: "Conflit",
  position: [16.463, 107.590]
},
{
  title: "Bataille de Verdun",
  country: "France",
  flag: "🇫🇷",
  year: "1916",
  desc: "La plus longue et l'une des plus sanglantes batailles de la Première Guerre mondiale.",
  type: "Conflit",
  status: "Conflit",
  position: [49.161, 5.384]
},
{
  title: "Guerre de Crimée – Siège de Sébastopol",
  country: "Ukraine",
  flag: "🇺🇦",
  year: "1854-1855",
  desc: "Siège emblématique de la guerre de Crimée.",
  type: "Conflit",
  status: "Conflit",
  position: [44.616, 33.525]
},
{
  title: "Bataille de Hastings",
  country: "Royaume-Uni",
  flag: "🇬🇧",
  year: "1066",
  desc: "Victoire décisive de Guillaume le Conquérant sur Harold II.",
  type: "Conflit",
  status: "Conflit",
  position: [50.911, 0.487]
},
{
  title: "Bataille des Thermopyles",
  country: "Grèce",
  flag: "🇬🇷",
  year: "480 av. J.-C.",
  desc: "Combat héroïque des Spartiates contre l'empire perse.",
  type: "Conflit",
  status: "Conflit",
  position: [38.797, 22.535]
},
{
  title: "Prise de la Bastille",
  country: "France",
  flag: "🇫🇷",
  year: "1789",
  desc: "Début de la Révolution française.",
  type: "Conflit",
  status: "Conflit",
  position: [48.857, 2.369]
},
{
  title: "Petra",
  country: "Jordanie",
  flag: "🇯🇴",
  year: "312 av. J.-C.",
  desc: "Ancienne cité nabatéenne taillée dans la roche, célèbre pour sa façade du Khazneh.",
  type: "Monument",
  status: "À visiter",
  position: [30.3285, 35.4444]
},
{
  title: "Chichén Itzá",
  country: "Mexique",
  flag: "🇲🇽",
  year: "600 ap. J.-C.",
  desc: "Cité maya célèbre pour la pyramide de Kukulcán.",
  type: "Monument",
  status: "À visiter",
  position: [20.6843, -88.5678]
},
{
  title: "Machu Picchu",
  country: "Pérou",
  flag: "🇵🇪",
  year: "1450",
  desc: "Ancienne cité inca perchée sur les montagnes des Andes.",
  type: "Monument",
  status: "À visiter",
  position: [-13.1631, -72.5450]
},
{
  title: "Statue du Christ Rédempteur",
  country: "Brésil",
  flag: "🇧🇷",
  year: "1931",
  desc: "Statue monumentale dominant Rio de Janeiro.",
  type: "Monument",
  status: "À visiter",
  position: [-22.9519, -43.2105]
},
{
  title: "Taj Mahal",
  country: "Inde",
  flag: "🇮🇳",
  year: "1648",
  desc: "Mausolée de marbre blanc, symbole d'amour.",
  type: "Monument",
  status: "À visiter",
  position: [27.1751, 78.0421]
},
{
  title: "Colisée",
  country: "Italie",
  flag: "🇮🇹",
  year: "80 ap. J.-C.",
  desc: "Ancien amphithéâtre romain emblématique de Rome.",
  type: "Monument",
  status: "À visiter",
  position: [41.8902, 12.4922]
},
{
  title: "Grande Muraille de Chine",
  country: "Chine",
  flag: "🇨🇳",
  year: "220 av. J.-C.",
  desc: "Ensemble de fortifications anciennes.",
  type: "Monument",
  status: "À visiter",
  position: [40.4319, 116.5704]
},
{
  title: "Pyramide de Khéops (Gizeh)",
  country: "Égypte",
  flag: "🇪🇬",
  year: "2560 av. J.-C.",
  desc: "La seule des sept merveilles antiques encore debout.",
  type: "Monument",
  status: "À visiter",
  position: [29.9792, 31.1342]
},
{
  title: "Jardins suspendus de Babylone",
  country: "Irak",
  flag: "🇮🇶",
  year: "VIe siècle av. J.-C.",
  desc: "Jardins mythiques de l’ancienne Babylone.",
  type: "Monument",
  status: "À visiter",
  position: [32.5436, 44.4200]
},
{
  title: "Statue de Zeus à Olympie",
  country: "Grèce",
  flag: "🇬🇷",
  year: "Ve siècle av. J.-C.",
  desc: "Statue monumentale réalisée par Phidias.",
  type: "Monument",
  status: "À visiter",
  position: [37.6380, 21.6300]
},
{
  title: "Temple d’Artémis à Éphèse",
  country: "Turquie",
  flag: "🇹🇷",
  year: "IVe siècle av. J.-C.",
  desc: "Temple grec dédié à Artémis, l'une des merveilles antiques.",
  type: "Monument",
  status: "À visiter",
  position: [37.9497, 27.3639]
},
{
  title: "Mausolée d’Halicarnasse",
  country: "Turquie",
  flag: "🇹🇷",
  year: "IVe siècle av. J.-C.",
  desc: "Tombeau monumental de Mausole.",
  type: "Monument",
  status: "À visiter",
  position: [37.0379, 27.4241]
},
{
  title: "Colosse de Rhodes",
  country: "Grèce",
  flag: "🇬🇷",
  year: "292 av. J.-C.",
  desc: "Statue monumentale dédiée à Hélios.",
  type: "Monument",
  status: "À visiter",
  position: [36.4510, 28.2278]
},
{
  title: "Phare d’Alexandrie",
  country: "Égypte",
  flag: "🇪🇬",
  year: "IIIe siècle av. J.-C.",
  desc: "Phare emblématique sur l’île de Pharos.",
  type: "Monument",
  status: "À visiter",
  position: [31.2135, 29.8853]
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
}
,
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

export default events;