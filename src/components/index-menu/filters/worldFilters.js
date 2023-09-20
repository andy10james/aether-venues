import {isRegion} from "./filter-functions/isRegion";
import {isDataCenter} from "./filter-functions/isDataCenter";
import {isWorld} from "./filter-functions/isWorld";

export const worldFilters = [
  {
    name: "North America",
    filter: v => isRegion(v, "na"),
    options: [
      {
        name: "Aether",
        filter: v => isDataCenter(v, "Aether"),
        options: [
          {
            name: "Adamantoise",
            filter: v => isWorld(v, "Adamantoise")
          },
          {
            name: "Cactuar",
            filter: v => isWorld(v, "Cactuar")
          },
          {
            name: "Faerie",
            filter: v => isWorld(v, "Faerie")
          },
          {
            name: "Gilgamesh",
            filter: v => isWorld(v, "Gilgamesh")
          },
          {
            name: "Jenova",
            filter: v => isWorld(v, "Jenova")
          },
          {
            name: "Midgardsormr",
            filter: v => isWorld(v, "Midgardsormr")
          },
          {
            name: "Sargatanas",
            filter: v => isWorld(v, "Sargatanas")
          },
          {
            name: "Siren",
            filter: v => isWorld(v, "Siren")
          }
        ]
      },
      {
        name: "Crystal",
        filter: v => isDataCenter(v, "Crystal"),
        options: [
          {
            name: "Balmung",
            filter: v => isWorld(v, "Balmung")
          },
          {
            name: "Brynhildr",
            filter: v => isWorld(v, "Brynhildr")
          },
          {
            name: "Coeurl",
            filter: v => isWorld(v, "Coeurl")
          },
          {
            name: "Diabolos",
            filter: v => isWorld(v, "Diabolos")
          },
          {
            name: "Goblin",
            filter: v => isWorld(v, "Goblin")
          },
          {
            name: "Malboro",
            filter: v => isWorld(v, "Malboro")
          },
          {
            name: "Mateus",
            filter: v => isWorld(v, "Mateus")
          },
          {
            name: "Zalera",
            filter: v => isWorld(v, "Zalera")
          }
        ]
      },
      {
        name: "Primal",
        filter: v => isDataCenter(v, "Primal"),
        options: [
          {
            name: "Behemoth",
            filter: v => isDataCenter(v, "Behemoth")
          },
          {
            name: "Excalibur",
            filter: v => isDataCenter(v, "Excalibur")
          },
          {
            name: "Exodus",
            filter: v => isDataCenter(v, "Exodus")
          },
          {
            name: "Famfrit",
            filter: v => isDataCenter(v, "Famfrit")
          },
          {
            name: "Hyperion",
            filter: v => isDataCenter(v, "Hyperion")
          },
          {
            name: "Lamia",
            filter: v => isDataCenter(v, "Lamia")
          },
          {
            name: "Leviathan",
            filter: v => isDataCenter(v, "Leviathan")
          },
          {
            name: "Ultros",
            filter: v => isDataCenter(v, "Ultros")
          }
        ]
      },
      {
        name: "Dynamis",
        filter: v => isDataCenter(v, "Dynamis"),
        options: [
          {
            name: "Halicarnassus",
            filter: v => isWorld(v, "Halicarnassus")
          },
          {
            name: "Maduin",
            filter: v => isWorld(v, "Maduin")
          },
          {
            name: "Marilith",
            filter: v => isWorld(v, "Marilith")
          },
          {
            name: "Seraph",
            filter: v => isWorld(v, "Seraph")
          }
        ]
      }
    ]
  },
  {
    name: "Europe",
    filter: v => isRegion(v, "eu"),
    options: [
      {
        name: "Chaos",
        filter: v => isDataCenter(v, "Chaos"),
        options: [
          {
            name: "Cerberus",
            filter: v => isWorld(v, "Cerberus")
          },
          {
            name: "Louisoix",
            filter: v => isWorld(v, "Louisoix")
          },
          {
            name: "Moogle",
            filter: v => isWorld(v, "Moogle")
          },
          {
            name: "Omega",
            filter: v => isWorld(v, "Omega")
          },
          {
            name: "Phantom",
            filter: v => isWorld(v, "Phantom")
          },
          {
            name: "Ragnarok",
            filter: v => isWorld(v, "Ragnarok")
          },
          {
            name: "Sagittarius",
            filter: v => isWorld(v, "Sagittarius")
          },
          {
            name: "Spriggan",
            filter: v => isWorld(v, "Spriggan")
          }
        ]
      },
      {
        name: "Light",
        filter: v => isDataCenter(v, "Light"),
        options: [
          {
            name: "Alpha",
            filter: v => isWorld(v, "Alpha")
          },
          {
            name: "Lich",
            filter: v => isWorld(v, "Lich")
          },
          {
            name: "Odin",
            filter: v => isWorld(v, "Odin")
          },
          {
            name: "Phoenix",
            filter: v => isWorld(v, "Phoenix")
          },
          {
            name: "Raiden",
            filter: v => isWorld(v, "Raiden")
          },
          {
            name: "Shiva",
            filter: v => isWorld(v, "Shiva")
          },
          {
            name: "Twintania",
            filter: v => isWorld(v, "Twintania")
          },
          {
            name: "Zodiark",
            filter: v => isWorld(v, "Zodiark")
          }
        ]
      }
    ]
  },
  {
    name: "Oceania",
    filter: v => isRegion(v, "oc"),
    options: [
      {
        name: "Materia",
        filter: v => isDataCenter(v, "Materia"),
        options: [
          {
            name: "Bismarck",
            filter: v => alert(v, "Bismarck")
          },
          {
            name: "Ravana",
            filter: v => alert(v, "Ravana")
          },
          {
            name: "Sephirot",
            filter: v => alert(v, "Sephirot")
          },
          {
            name: "Sophia",
            filter: v => alert(v, "Sophia")
          },
          {
            name: "Zurvan",
            filter: v => alert(v, "Zurvan")
          }
        ]
      }
    ]
  }
]