// Data: categories and products for the store

import { productDescriptions } from "./productDescriptions.generated";

export const categories = [
  {
    "slug": "ardurvis-dzivoklim",
    "name": "Ārdurvis dzīvoklim",
    "group": "Ārdurvis",
    "description": "Metāla ārdurvis dzīvokļiem ar skaņas un siltuma izolāciju."
  },
  {
    "slug": "ardurvis-privatmajai",
    "name": "Ārdurvis privātmājai",
    "group": "Ārdurvis",
    "description": "Siltinātas metāla un alumīnija ārdurvis ar termopārrāvumu privātmājām."
  },
  {
    "slug": "ieksdurvis",
    "name": "Iekšdurvis",
    "group": "Iekšdurvis",
    "description": "Iekšdurvis dzīvojamām telpām dažādās krāsās un faktūrās."
  },
  {
    "slug": "bidamas-durvis",
    "name": "Bīdāmās durvis",
    "group": "Iekšdurvis",
    "description": "Bīdāmās durvis un sistēmas telpu zonēšanai."
  },
  {
    "slug": "sleptas-durvis",
    "name": "Slēptās durvis",
    "group": "Iekšdurvis",
    "description": "Slēptā tipa durvis bez redzamas kārbas."
  }
];

export const collections = ["BOSTON", "EKO", "PREMA", "PRIME", "RUBICON", "STANDART", "STILE MAX", "TEHNO", "TERMIX", "TERMO HOUSE", "TREND", "ULTRA"];

const doorServiceOptions = [
  { id: "pickup", labelKey: "product.servicePickup", infoKey: null },
  { id: "measurement", labelKey: "product.serviceMeasurement", infoKey: "product.serviceMeasurementInfo" },
  { id: "delivery-only", labelKey: "product.serviceDeliveryOnly", infoKey: "product.serviceDeliveryOnlyInfo" },
  { id: "delivery-installation", labelKey: "product.serviceDeliveryInstallation", infoKey: "product.serviceDeliveryInstallationInfo" },
];

export const products = [
  {"id": "prema-172", "name": "PREMA B-434 Modelis 172", "collection": "PREMA", "category": "ardurvis-dzivoklim", "price": 369, "oldPrice": null, "sizes": ["840×2040", "940×2040"], "colors": ["Antracīts", "Balts mats"], "thermo": false, "glass": false, "isNew": false, "clearance": false, "images": ["https://ik.imagekit.io/vbvwdejj5/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20durvju%20bildes%20/b434-172/b434-172.png"], "short": "Metāla durvis dzīvoklim ar MDF apdari abās pusēs un divām ARIKO slēdzenēm.", "specs": {"Vērtnes biezums": "72 mm", "Kārbas biezums": "85 mm", "Svars": "64/68 kg", "Slēdzenes": "2 × ARIKO (suvaldu + cilindra)", "Pildījums": "Minerālvate", "Ārējā apdare": "MDF 10mm, Antracīts", "Iekšējā apdare": "MDF 10mm, Balts mats", "Actiņa": "Ir"}},
  {"id": "prema-188", "name": "PREMA B-434 Modelis 188", "collection": "PREMA", "category": "ardurvis-dzivoklim", "price": 369, "oldPrice": null, "sizes": ["840×2040", "940×2040"], "colors": ["Dienvidu Venge"], "thermo": false, "glass": false, "isNew": false, "clearance": false, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/PREMA%20b-434%20Modelis%20188/01.jpg?updatedAt=1780426696666",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/PREMA%20b-434%20Modelis%20188/img_5763-copy.jpg?updatedAt=1780426705673",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/PREMA%20b-434%20Modelis%20188/img_5782-copy.jpg?updatedAt=1780426704141",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/PREMA%20b-434%20Modelis%20188/img_5772-copy.jpg?updatedAt=1780426699029",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/PREMA%20b-434%20Modelis%20188/img_5779-copy.jpg?updatedAt=1780426698093",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/PREMA%20b-434%20Modelis%20188/img_5775-copy.jpg?updatedAt=1780426697459",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/PREMA%20b-434%20Modelis%20188/img_5784-copy.jpg?updatedAt=1780426696901",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/PREMA%20b-434%20Modelis%20188/img_5766-copy.jpg?updatedAt=1780426696495",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/PREMA%20b-434%20Modelis%20188/img_5761-copy.jpg?updatedAt=1780426695101"
  ], "short": "Metāla durvis dzīvoklim ar Dienvidu Venge MDF apdari un slēptu kārbas montāžu.", "specs": {"Vērtnes biezums": "72 mm", "Kārbas biezums": "85 mm", "Svars": "64/68 kg", "Slēdzenes": "2 × ARIKO", "Pildījums": "Minerālvate", "Apdare": "MDF 10mm, Dienvidu Venge", "Actiņa": "Ir"}},
  {"id": "prema-435-betons", "name": "PREMA B-434 Modelis 435 Betons/Oksīds", "collection": "PREMA", "category": "ardurvis-dzivoklim", "price": 379, "oldPrice": null, "sizes": ["840×2040", "940×2040"], "colors": ["Betons antracīts", "Oksīds balts"], "thermo": false, "glass": false, "isNew": false, "clearance": false, "images": [
    "https://ik.imagekit.io/vbvwdejj5/lithuanians/b434-435-betons-antrac%C4%ABts-oks%C4%ABds-balts.jpg?updatedAt=1780512787290",
    "https://ik.imagekit.io/vbvwdejj5/lithuanians/b434-435-ra%C5%BEojuma-pl%C4%81ksn%C4%ABte.jpg?updatedAt=1780512788114",
    "https://ik.imagekit.io/vbvwdejj5/lithuanians/b434-435-sl%C4%93dzenes-%C4%81rpuse.jpg?updatedAt=1780512788061",
    "https://ik.imagekit.io/vbvwdejj5/lithuanians/b434-435-sl%C4%93dzenes-iek%C5%A1puse.jpg?updatedAt=1780512788052",
    "https://ik.imagekit.io/vbvwdejj5/lithuanians/b434-435-betons-antrac%C4%ABts-e%C5%86%C4%A3es.jpg?updatedAt=1780512788022",
    "https://ik.imagekit.io/vbvwdejj5/lithuanians/b434-435-betons-antrac%C4%ABts-%C4%81rpuse-.jpg?updatedAt=1780512787274",
    "https://ik.imagekit.io/vbvwdejj5/lithuanians/b434-435-oks%C4%ABds-balts-iek%C5%A1puse.jpg?updatedAt=1780512787274",
    "https://ik.imagekit.io/vbvwdejj5/lithuanians/b434-435-prema.jpg?updatedAt=1780512787245",
    "https://ik.imagekit.io/vbvwdejj5/lithuanians/b434-435-atv%C4%93rt%C4%81-poz%C4%ABcij%C4%81.jpg?updatedAt=1780512787252",
    "https://ik.imagekit.io/vbvwdejj5/lithuanians/b434-435-r%C4%81mis-un-v%C4%93rtnes-regulators.jpg?updatedAt=1780512787237"
  ], "short": "Moderna betona faktūra no ārpuses, balta no iekšpuses.", "specs": {"Vērtnes biezums": "72 mm", "Kārbas biezums": "85 mm", "Slēdzenes": "2 × ARIKO", "Ārējā apdare": "Betons antracīts", "Iekšējā apdare": "Oksīds balts", "Actiņa": "Ir"}},
  {"id": "prema-435-dreamwood", "name": "PREMA B-434 Modelis 435 Dreamwood", "collection": "PREMA", "category": "ardurvis-dzivoklim", "price": 379, "oldPrice": null, "sizes": ["840×2040", "940×2040"], "colors": ["Dreamwood tumšs"], "thermo": false, "glass": false, "isNew": false, "clearance": false, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/PREMA%20B-434%20Modelis%20435%20Dreamwood%20Tum%C5%A1s/b434-435-dreamwood-tum%C5%A1s.jpg?updatedAt=1780426699799",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/PREMA%20B-434%20Modelis%20435%20Dreamwood%20Tum%C5%A1s/b434-435-dreamwood-tum%C5%A1s-prema.jpg?updatedAt=1780426705390",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/PREMA%20B-434%20Modelis%20435%20Dreamwood%20Tum%C5%A1s/b434-435-dreamwood-tum%C5%A1s-r%C4%81mis-un-v%C4%93rtnes-regulators.jpg?updatedAt=1780426705165",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/PREMA%20B-434%20Modelis%20435%20Dreamwood%20Tum%C5%A1s/b434-435-dreamwood-tum%C5%A1s-sl%C4%93dzenes-%C4%81rpuse.jpg?updatedAt=1780426704906",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/PREMA%20B-434%20Modelis%20435%20Dreamwood%20Tum%C5%A1s/b434-435-dreamwood-tum%C5%A1s-e%C5%86%C4%A3es.jpg?updatedAt=1780426704747",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/PREMA%20B-434%20Modelis%20435%20Dreamwood%20Tum%C5%A1s/b434-435-dreamwood-tum%C5%A1s-atv%C4%93rt%C4%81-poz%C4%ABcij%C4%81.jpg?updatedAt=1780426698857",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/PREMA%20B-434%20Modelis%20435%20Dreamwood%20Tum%C5%A1s/b434-435-dreamwood-tum%C5%A1s-sl%C4%93dzenes-iek%C5%A1puse.jpg?updatedAt=1780426695867"
  ], "short": "Durvis ar tumšu Dreamwood koka tekstūru abās pusēs.", "specs": {"Vērtnes biezums": "72 mm", "Kārbas biezums": "85 mm", "Slēdzenes": "2 × ARIKO", "Apdare": "MDF 10mm, Dreamwood tumšs", "Actiņa": "Ir"}},
  {"id": "prema-122", "name": "PREMA B-434 Modelis 122", "collection": "PREMA", "category": "ardurvis-dzivoklim", "price": 359, "oldPrice": 399, "sizes": ["840×2040", "940×2040"], "colors": ["Dreamwood tumšs", "Balts koks"], "thermo": false, "glass": false, "isNew": false, "clearance": true, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/PREMA%20B-434%20Modelis%20122/01.jpg?updatedAt=1780426695853",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/PREMA%20B-434%20Modelis%20122/img_9462-kopiya.jpg?updatedAt=1780426699626",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/PREMA%20B-434%20Modelis%20122/img_9456-kopiya.jpg?updatedAt=1780426703644",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/PREMA%20B-434%20Modelis%20122/img_9464-kopiya.jpg?updatedAt=1780426697721",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/PREMA%20B-434%20Modelis%20122/img_9466-kopiya.jpg?updatedAt=1780426695997",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/PREMA%20B-434%20Modelis%20122/img_9454-kopiya.jpg?updatedAt=1780426695712",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/PREMA%20B-434%20Modelis%20122/img_9472-kopiya.jpg?updatedAt=1780426698343"
  ], "short": "Klasiska dizaina dzīvokļa durvis ar koka tekstūru.", "specs": {"Vērtnes biezums": "72 mm", "Kārbas biezums": "85 mm", "Slēdzenes": "2 × ARIKO", "Ārējā apdare": "Dreamwood tumšs", "Iekšējā apdare": "Balta koka tekstūra"}},
  {"id": "prema-606-234", "name": "PREMA B-606 Modelis 234/237", "collection": "PREMA", "category": "ardurvis-dzivoklim", "price": 529, "oldPrice": null, "sizes": ["850×2050", "950×2050"], "colors": ["Tabakas ozols", "Ozols Sudraba Nemo"], "thermo": false, "glass": false, "isNew": false, "clearance": false, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/B-606%20modelis%20234-237/met%C4%81la-durvis-dz%C4%ABvoklim-b-617-modelis-234237-1.png?updatedAt=1780426702309",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/B-606%20modelis%20234-237/img_9583-kopiya.jpg?updatedAt=1780426701649",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/B-606%20modelis%20234-237/img_9594-kopiya.jpg?updatedAt=1780426701463",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/B-606%20modelis%20234-237/img_9625-kopiya.jpg?updatedAt=1780426694228"
  ], "short": "Koka toņu durvis ar 100 mm kārbu un hroma furnitūru.", "specs": {"Vērtnes biezums": "85 mm", "Kārbas biezums": "100 mm", "Svars": "69/73 kg", "Slēdzenes": "ARIKO + KALE 252", "Furnitūra": "Hroms", "Actiņa": "Ir"}},
  {"id": "garant-514", "name": "Garant 514", "collection": "ULTRA", "category": "ardurvis-dzivoklim", "price": 749, "oldPrice": null, "sizes": ["850×2050", "950×2050"], "colors": ["Venge horizontāls tumšs"], "thermo": false, "glass": false, "isNew": true, "clearance": false, "images": [
    "https://ik.imagekit.io/vbvwdejj5/514=2/garant-514.png",
    "https://ik.imagekit.io/vbvwdejj5/514=2/img_9625-kopiya.jpg",
    "https://ik.imagekit.io/vbvwdejj5/514=2/img_9583-kopiya.jpg"
  ], "short": "Pastiprinātas durvis (svars līdz 115 kg) ar KALE slēdzenēm un nakts aizbīdni.", "specs": {"Vērtnes biezums": "105 mm", "Kārbas biezums": "110 mm", "Svars": "103/115 kg", "Slēdzenes": "KALE 257 LX + KALE 252", "Pildījums": "Minerālvate + folija", "Nakts aizbīdnis": "Ir", "Actiņa": "Ir"}},
  {"id": "ultra-539", "name": "Ultra Securemme 539/237", "collection": "ULTRA", "category": "ardurvis-dzivoklim", "price": 779, "oldPrice": 859, "sizes": ["850×2050", "950×2050"], "colors": ["Mamba morion", "Rustic avignon blan"], "thermo": false, "glass": false, "isNew": false, "clearance": true, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/Ultra%20(kvadro)%20Securemme%20modelis%20539-237/met%C4%81la-durvis-dz%C4%ABvoklim-k-8kvadro-modelis-539237.png?updatedAt=1780426709437"
  ], "short": "Premium durvis ar Itālijas Securemme slēdzenēm un nerūsējošā tērauda slieksni.", "specs": {"Vērtnes biezums": "105 mm", "Kārbas biezums": "110 mm", "Svars": "92/98 kg", "Slēdzenes": "Securemme 2019 + 2061 (Itālija)", "Slieksnis": "Nerūsējošais tērauds", "Nakts aizbīdnis": "Ir", "Actiņa": "Ir"}},
  {"id": "ultra-546-spogulis", "name": "Termo Ultra Securemme 546/607 ar spoguli", "collection": "ULTRA", "category": "ardurvis-dzivoklim", "price": 849, "oldPrice": null, "sizes": ["850×2050", "950×2050"], "colors": ["Roxy antracīts pelēks", "Balts šagrēns"], "thermo": false, "glass": false, "isNew": true, "clearance": false, "images": [
    "https://ik.imagekit.io/vbvwdejj5/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20durvju%20bildes%20/546/met%C4%81la-durvis-dz%C4%ABvoklim-termo-ultra-securemme-modelis-546607-ar-spoguli.png?updatedAt=1780514140227"
  ], "short": "Termo durvis ar spoguli no iekšpuses un Securemme furnitūru.", "specs": {"Vērtnes biezums": "105 mm", "Kārbas biezums": "110 mm", "Spogulis": "Ir (iekšpusē)", "Slēdzenes": "Securemme 2019 + 2061", "Pildījums": "Minerālvate + korķis", "Actiņa": "Ir"}},
  {"id": "ultra-547", "name": "Ultra 547/251", "collection": "ULTRA", "category": "ardurvis-dzivoklim", "price": 719, "oldPrice": null, "sizes": ["850×2050", "950×2050"], "colors": ["Ozols dorato tumšs", "Rustic avignon blanc"], "thermo": false, "glass": false, "isNew": false, "clearance": false, "images": ["https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/ULTRA%20modelis%20547-251/met%C4%81la-durvis-dz%C4%ABvoklim-ultra-modelis-547251.png?updatedAt=1780426710093", "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/ULTRA%20modelis%20547-251/img_9625-kopiya.jpg?updatedAt=1780426709936", "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/ULTRA%20modelis%20547-251/img_9594-kopiya.jpg?updatedAt=1780426709814", "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/ULTRA%20modelis%20547-251/img_9583-kopiya.jpg?updatedAt=1780426709754"], "short": "Premium durvis ar KALE slēdzenēm un Itālijas Securemme aktiņu.", "specs": {"Vērtnes biezums": "105 mm", "Kārbas biezums": "110 mm", "Svars": "92/98 kg", "Slēdzenes": "KALE 257 + KALE 252", "Slieksnis": "Nerūsējošais tērauds", "Actiņa": "Ir"}},
  {"id": "ultra-535", "name": "Ultra (kvadro) 535", "collection": "ULTRA", "category": "ardurvis-dzivoklim", "price": 719, "oldPrice": null, "sizes": ["850×2050", "950×2050"], "colors": ["Betons antracīts", "Balts oksīds"], "thermo": false, "glass": false, "isNew": false, "clearance": false, "images": [
    "https://ik.imagekit.io/vbvwdejj5/535/ultra-kvadro-modelis-535.png",
    "https://ik.imagekit.io/vbvwdejj5/535/img_9625-kopiya.jpg",
    "https://ik.imagekit.io/vbvwdejj5/535/img_9594-kopiya.jpg",
    "https://ik.imagekit.io/vbvwdejj5/535/img_9583-kopiya.jpg"
  ], "short": "Moderns betona dizains ar pastiprinātu konstrukciju un 3 blīvējuma kontūriem.", "specs": {"Vērtnes biezums": "105 mm", "Kārbas biezums": "110 mm", "Slēdzenes": "KALE 257 + KALE 252", "Blīvējuma kontūri": "3", "Slieksnis": "Nerūsējošais tērauds", "Actiņa": "Ir"}},
  {"id": "termotrend-gluds", "name": "TermoTrend kvadro Gluds", "collection": "ULTRA", "category": "ardurvis-dzivoklim", "price": 928, "oldPrice": null, "sizes": ["850×2050", "950×2050"], "colors": ["Venge horizont", "Balts šagrēns"], "thermo": false, "glass": false, "isNew": true, "clearance": false, "images": [
    "https://ik.imagekit.io/vbvwdejj5/TermoTrendkvadro/termo-trend-abas-puses.png",
    "https://ik.imagekit.io/vbvwdejj5/TermoTrendkvadro/termo-trend-%C4%81rpuse-1.png",
    "https://ik.imagekit.io/vbvwdejj5/TermoTrendkvadro/termo-trend-iek%C5%A1puse.png"
  ], "short": "Augstākās klases termo durvis ar Mottura monobloka slēdzeni.", "specs": {"Vērtnes biezums": "105 mm", "Kārbas biezums": "110 mm", "Slēdzene": "Mottura 54.979 monobloks", "Pildījums": "Minerālvate 2 slāņi + folija", "Slieksnis": "Nerūsējošais tērauds", "Actiņa": "Ir"}},
  {"id": "stilemax-light", "name": "Stile Max Light", "collection": "STILE MAX", "category": "ardurvis-dzivoklim", "price": 449, "oldPrice": null, "sizes": ["860×2040", "960×2050"], "colors": ["Antracīts"], "thermo": false, "glass": false, "isNew": false, "clearance": false, "images": [
    "https://ik.imagekit.io/vbvwdejj5/stylemaxlight/ekr%C4%81nuz%C5%86%C4%93mums-2026-04-07-211902.png?updatedAt=1780515627613",
    "https://ik.imagekit.io/vbvwdejj5/stylemaxlight/whatsapp-image-2026-04-07-at-17.11.16-1.jpg?updatedAt=1780515627606",
    "https://ik.imagekit.io/vbvwdejj5/stylemaxlight/whatsapp-image-2026-04-07-at-17.11.16-2.jpg",
    "https://ik.imagekit.io/vbvwdejj5/stylemaxlight/whatsapp-image-2026-04-07-at-17.11.16-3.jpg",
    "https://ik.imagekit.io/vbvwdejj5/stylemaxlight/whatsapp-image-2026-04-07-at-17.11.16.jpg"
  ], "short": "Durvis ar pulverkrāsotu metālu un AVERS slēdzenēm, 3 blīvējuma kontūri.", "specs": {"Vērtnes biezums": "98 mm", "Kārbas biezums": "107 mm", "Slēdzenes": "2 × AVERS", "Blīvgumijas": "Schlegel (Vācija)", "Eņģes": "Itālija, ar gultņiem", "Actiņa": "Ir"}},
  {"id": "stilemax-700", "name": "Stile Max 700/2", "collection": "STILE MAX", "category": "ardurvis-dzivoklim", "price": 569, "oldPrice": null, "sizes": ["860×2040", "960×2050"], "colors": ["Antracīts", "Balta supermats"], "thermo": false, "glass": false, "isNew": false, "clearance": false, "images": [
    "https://ik.imagekit.io/vbvwdejj5/Stylemax700-2/style-max-7002.png?updatedAt=1780515701155",
    "https://ik.imagekit.io/vbvwdejj5/Stylemax700-2/5873160128956140516-768x1024.jpg?updatedAt=1780515701049",
    "https://ik.imagekit.io/vbvwdejj5/Stylemax700-2/5873160128956140519.jpg?updatedAt=1780515701076",
    "https://ik.imagekit.io/vbvwdejj5/Stylemax700-2/5873160128956140520.jpg?updatedAt=1780515701004",
    "https://ik.imagekit.io/vbvwdejj5/Stylemax700-2/5873160128956140518.jpg?updatedAt=1780515701003",
    "https://ik.imagekit.io/vbvwdejj5/Stylemax700-2/5873160128956140517.jpg?updatedAt=1780515700949"
  ], "short": "Durvis ar KALE slēdzenēm, nakts aizbīdni un nerūsējošā tērauda slieksni.", "specs": {"Vērtnes biezums": "98 mm", "Kārbas biezums": "107 mm", "Slēdzenes": "KALE 257 + KALE 252", "Slieksnis": "Nerūsējošais tērauds", "Nakts aizbīdnis": "Ir", "Actiņa": "Ir"}},
  {"id": "stilemax-350", "name": "Stile Max 350/1", "collection": "STILE MAX", "category": "ardurvis-dzivoklim", "price": 569, "oldPrice": null, "sizes": ["860×2040", "960×2050"], "colors": ["Venge horizont", "Priede provanss"], "thermo": false, "glass": false, "isNew": false, "clearance": false, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/Style%20Max%20350-1/style-max-3501.png?updatedAt=1780426699392",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/Style%20Max%20350-1/5873160128956140525.jpg?updatedAt=1780426705716",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/Style%20Max%20350-1/5873160128956140521.jpg?updatedAt=1780426698498",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/Style%20Max%20350-1/5873160128956140521-768x1024.jpg?updatedAt=1780426698490",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/Style%20Max%20350-1/5873160128956140524.jpg?updatedAt=1780426697701"
  ], "short": "Koka toņu durvis ar KALE slēdzenēm un Schlegel blīvgumijām.", "specs": {"Vērtnes biezums": "98 mm", "Kārbas biezums": "107 mm", "Slēdzenes": "KALE 257 + KALE 252", "Slieksnis": "Nerūsējošais tērauds", "Actiņa": "Ir"}},
  {"id": "stilemax-352", "name": "Stile Max 352/1", "collection": "STILE MAX", "category": "ardurvis-dzivoklim", "price": 569, "oldPrice": null, "sizes": ["860×2040", "960×2050"], "colors": ["Betona antracīts", "Balts supermats"], "thermo": false, "glass": false, "isNew": false, "clearance": false, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/Style%20Max%20352-1/style-max-352-iek%C5%A1puse.png?updatedAt=1780426705880",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/Style%20Max%20352-1/5873160128956140528.jpg?updatedAt=1780426705530",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/Style%20Max%20352-1/5873160128956140529.jpg?updatedAt=1780426704919",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/Style%20Max%20352-1/5873160128956140530.jpg?updatedAt=1780426700821",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/Style%20Max%20352-1/5873160128956140527.jpg?updatedAt=1780426699320",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/Style%20Max%20352-1/5873160128956140527-768x1024.jpg?updatedAt=1780426699298"
  ], "short": "Betona faktūra ar baltu iekšpusi, KALE slēdzenes.", "specs": {"Vērtnes biezums": "98 mm", "Kārbas biezums": "107 mm", "Slēdzenes": "KALE 257 + KALE 252", "Slieksnis": "Nerūsējošais tērauds", "Actiņa": "Ir"}},
  {"id": "stilemax-pro-tandem", "name": "Stile Max PRO Tandem", "collection": "STILE MAX", "category": "ardurvis-dzivoklim", "price": 679, "oldPrice": null, "sizes": ["860×2040", "960×2050"], "colors": ["Tīka koks"], "thermo": false, "glass": false, "isNew": true, "clearance": false, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/Style%20Max%20PRO%20Tandem%20ar%20spoguli/ekr%C4%81nuz%C5%86%C4%93mums-2026-04-07-214455.png?updatedAt=1780426707677",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/Style%20Max%20PRO%20Tandem%20ar%20spoguli/whatsapp-image-2026-04-07-at-17.11.43.jpg?updatedAt=1780426707751",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/Style%20Max%20PRO%20Tandem%20ar%20spoguli/whatsapp-image-2026-04-07-at-17.11.42.jpg?updatedAt=1780426707593"
  ], "short": "Tīka koka faktūra ar spoguli no iekšpuses un KALE Tandem cilindru.", "specs": {"Vērtnes biezums": "98 mm", "Kārbas biezums": "107 mm", "Cilindrs": "KALE Tandem", "Spogulis": "Ir (iekšpusē)", "Slieksnis": "Nerūsējošais tērauds"}},
  {"id": "eko-eskada", "name": "Eko Eskada 1", "collection": "EKO", "category": "ardurvis-dzivoklim", "price": 305, "oldPrice": null, "sizes": ["860×2050", "960×2050"], "colors": ["Dienvidu Venge"], "thermo": false, "glass": false, "isNew": false, "clearance": false, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/Eko%20Eskada%207/img_8590%20-%20Copy.jpg?updatedAt=1780426696876",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/Eko%20Eskada%207/img_8599-edit%20-%20Copy.jpg?updatedAt=1780426703299",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/Eko%20Eskada%207/img_8590.jpg?updatedAt=1780426703147",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/Eko%20Eskada%207/img_8600-edit%20-%20Copy.jpg?updatedAt=1780426696953",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/Eko%20Eskada%207/img_8600-edit.jpg?updatedAt=1780426696683",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/Eko%20Eskada%207/img_8601-edit%20-%20Copy.jpg?updatedAt=1780426695259",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/Eko%20Eskada%207/img_8601-edit.jpg?updatedAt=1780426693532",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/Eko%20Eskada%207/img_8599-edit.jpg?updatedAt=1780426693387"
  ], "short": "Ekonomiskās metāla durvis dzīvoklim ar minerālvates pildījumu.", "specs": {"Vērtnes biezums": "70 mm", "Kārbas biezums": "70 mm", "Slēdzenes": "Avers 1082 + Apecs 510", "Pildījums": "Minerālvate", "Eņģes": "2 gb."}},
  {"id": "eko-classic", "name": "Eko Classic 1", "collection": "EKO", "category": "ardurvis-dzivoklim", "price": 305, "oldPrice": null, "sizes": ["860×2050", "960×2050"], "colors": ["Dienvidu Venge", "Sudrabots Nemo"], "thermo": false, "glass": false, "isNew": false, "clearance": false, "images": [
    "https://ik.imagekit.io/vbvwdejj5/Ekoclassic1/img_8589.jpg",
    "https://ik.imagekit.io/vbvwdejj5/Ekoclassic1/img_8584-edit.jpg",
    "https://ik.imagekit.io/vbvwdejj5/Ekoclassic1/img_8582-edit.jpg",
    "https://ik.imagekit.io/vbvwdejj5/Ekoclassic1/img_8580-edit.jpg"
  ], "short": "Klasiskas budžeta klases durvis ar paneļu dizainu.", "specs": {"Vērtnes biezums": "70 mm", "Kārbas biezums": "70 mm", "Slēdzenes": "Avers 1082 + Apecs 510", "Pildījums": "Minerālvate", "Eņģes": "2 gb."}},
  {"id": "prime-lite-2k", "name": "Prime Lite 2K", "collection": "PRIME", "category": "ardurvis-dzivoklim", "price": 328, "oldPrice": null, "sizes": ["860×2050", "960×2050"], "colors": ["Antracīts RAL 7016", "Sonomas ozols"], "thermo": false, "glass": false, "isNew": false, "clearance": false, "images": [
    "https://ik.imagekit.io/vbvwdejj5/primelite2k/prime-lite-%C4%81rpuse-un-iek%C5%A1puse-768x802.jpg",
    "https://ik.imagekit.io/vbvwdejj5/primelite2k/prime-lite-%C4%81rpuse.jpg",
    "https://ik.imagekit.io/vbvwdejj5/primelite2k/prime-lite-atv%C4%93rums-e%C5%86%C4%A3u-puse.jpg",
    "https://ik.imagekit.io/vbvwdejj5/primelite2k/prime-lite-atv%C4%93rums-no-iek%C5%A1puses.jpg",
    "https://ik.imagekit.io/vbvwdejj5/primelite2k/prime-lite-furnit%C5%ABra.jpg",
    "https://ik.imagekit.io/vbvwdejj5/primelite2k/prime-lite-furnit%C5%ABra-no-iek%C5%A1puses.jpg",
    "https://ik.imagekit.io/vbvwdejj5/primelite2k/prime-lite-iek%C5%A1puse.jpg"
  ], "short": "Durvis ar antracīta metāla ārpusi un laminētu iekšpusi.", "specs": {"Vērtnes biezums": "73 mm", "Kārbas biezums": "95 mm", "Svars": "~60/65 kg", "Slēdzenes": "AVERS 1082 + Kale 2000", "Pildījums": "Minerālvate ISOVER"}},
  {"id": "tehno-6", "name": "Tehniskās durvis Tehno 6", "collection": "TEHNO", "category": "ardurvis-dzivoklim", "price": 290, "oldPrice": null, "sizes": ["860×2050", "960×2050"], "colors": ["Antracīts RAL 7016"], "thermo": false, "glass": false, "isNew": false, "clearance": false, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/Tehno%206%20Antrac%C4%ABts%20RAL7016/photo_2025-07-10-09.21.30.jpeg?updatedAt=1780431333224",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/Tehno%206%20Antrac%C4%ABts%20RAL7016/photo_2025-07-10-09.21.45.jpg?updatedAt=1780426708355",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/Tehno%206%20Antrac%C4%ABts%20RAL7016/photo_2025-07-10-09.21.41.jpg?updatedAt=1780426708121",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Dz%C4%ABvok%C4%BCu%20%C4%81rdurvju%20bildes/Tehno%206%20Antrac%C4%ABts%20RAL7016/photo_2025-07-10-09.21.35.jpg?updatedAt=1780426707946"
  ], "short": "Tehniskās metāla durvis saimniecības un palīgtelpām.", "specs": {"Vērtnes biezums": "74 mm", "Kārbas biezums": "98 mm", "Svars": "~48/50 kg", "Slēdzene": "Avers 2800 (cilindra)", "Pildījums": "Poliestera"}},
  {"id": "th-710-venge", "name": "Termo House 710/265 Venge", "collection": "TERMO HOUSE", "category": "ardurvis-privatmajai", "price": 847, "oldPrice": null, "sizes": ["850×2050", "950×2050"], "colors": ["Venge tumšs"], "thermo": true, "glass": false, "isNew": false, "clearance": false, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20710265%20Venge%20tum%C5%A1sVenge%20tum%C5%A1s/VHIDNI~1.JPG?updatedAt=1780637161262",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20710265%20Venge%20tum%C5%A1sVenge%20tum%C5%A1s/zovnishnya-storona-dverej-pid-zamovlennya-bulat-termo-haus-710-vulychnogo-typu-venge-temnyj.jpg?updatedAt=1780636650455",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20710265%20Venge%20tum%C5%A1sVenge%20tum%C5%A1s/porig-z-nerzhaviyuchoyi-stali-na-deryah-bulat-termo-haus-710-vulychnogo-typu.jpg?updatedAt=1780636651644",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20710265%20Venge%20tum%C5%A1sVenge%20tum%C5%A1s/img_9583-kopiya.jpg?updatedAt=1780636651436",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20710265%20Venge%20tum%C5%A1sVenge%20tum%C5%A1s/img_9625-kopiya.jpg?updatedAt=1780636650091",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20710265%20Venge%20tum%C5%A1sVenge%20tum%C5%A1s/img_9594-kopiya.jpg?updatedAt=1780636649688",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20710265%20Venge%20tum%C5%A1sVenge%20tum%C5%A1s/VNUTRI~1.JPG?updatedAt=1780637178596"
  ], "short": "Siltinātas durvis privātmājai ar termopārrāvumu un metāla sendvičpaneli.", "specs": {"Kārbas biezums": "100 mm + termopārrāvums", "Vērtnes biezums": "95 mm", "Svars": "91/96 kg", "Slēdzenes": "KALE 257 + KALE 252 (tandēms)", "Pildījums": "Minerālvate + putupolistirols + folija", "Slieksnis": "Nerūsējošais tērauds"}},
  {"id": "th-710-antracits", "name": "Termo House 710/265 Antracīts", "collection": "TERMO HOUSE", "category": "ardurvis-privatmajai", "price": 847, "oldPrice": null, "sizes": ["850×2050", "950×2050"], "colors": ["Tumšs antracīts", "Antracīts pelēks"], "thermo": true, "glass": false, "isNew": false, "clearance": false, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20710265%20Tum%C5%A1s%20antrac%C4%ABtsAntrac%C4%ABts%20pel%C4%93ks/VHIDNI~1.JPG?updatedAt=1780638488042",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20710265%20Tum%C5%A1s%20antrac%C4%ABtsAntrac%C4%ABts%20pel%C4%93ks/VNUTRI~1.JPG?updatedAt=1780638488134",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20710265%20Tum%C5%A1s%20antrac%C4%ABtsAntrac%C4%ABts%20pel%C4%93ks/ZOVNIS~1.JPG?updatedAt=1780638488015",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20710265%20Tum%C5%A1s%20antrac%C4%ABtsAntrac%C4%ABts%20pel%C4%93ks/img_9625-kopiya.jpg?updatedAt=1780636650089",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20710265%20Tum%C5%A1s%20antrac%C4%ABtsAntrac%C4%ABts%20pel%C4%93ks/img_9594-kopiya.jpg?updatedAt=1780636649309",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20710265%20Tum%C5%A1s%20antrac%C4%ABtsAntrac%C4%ABts%20pel%C4%93ks/porih-z-nerzhaviiuchoi-stali-termo-house-model-705-431-kolir-temnyi-antratsyt-768x826.jpg?updatedAt=1780636644621",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20710265%20Tum%C5%A1s%20antrac%C4%ABtsAntrac%C4%ABts%20pel%C4%93ks/img_9583-kopiya.jpg?updatedAt=1780636644260"
  ], "short": "Siltinātas antracīta durvis ar termopārrāvumu un RAL krāsu maiņu.", "specs": {"Kārbas biezums": "100 mm + termopārrāvums", "Vērtnes biezums": "95 mm", "Svars": "91/96 kg", "Slēdzenes": "KALE 257 + KALE 252 (tandēms)", "Slieksnis": "Nerūsējošais tērauds"}},
  {"id": "th-705-431-antracits", "name": "Termo House 705/431 Antracīts", "collection": "TERMO HOUSE", "category": "ardurvis-privatmajai", "price": 960, "oldPrice": null, "sizes": ["850×2050", "950×2050"], "colors": ["Tumšs antracīts", "Antracīts pelēks"], "thermo": true, "glass": false, "isNew": false, "clearance": false, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Tum%C5%A1s%20antrac%C4%ABtsAntrac%C4%ABts%20pel%C4%93ks/termo-house-model-705-431-tum%C5%A1s-antrac%C4%ABts.jpg?updatedAt=1780636646907",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Tum%C5%A1s%20antrac%C4%ABtsAntrac%C4%ABts%20pel%C4%93ks/vnutrishnia-storona-dverei-bulat-termo-house-model-705-431-kolir-te.jpg?updatedAt=1780636650860",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Tum%C5%A1s%20antrac%C4%ABtsAntrac%C4%ABts%20pel%C4%93ks/enerhozberihaiuchyi-sklopaket-ta-petli-termo-house-model-705-431-ko.jpg?updatedAt=1780636649405",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Tum%C5%A1s%20antrac%C4%ABtsAntrac%C4%ABts%20pel%C4%93ks/zovnishnia-storona-dverei-bulat-termo-house-model-705-431-kolir-tem.jpg?updatedAt=1780636649303",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Tum%C5%A1s%20antrac%C4%ABtsAntrac%C4%ABts%20pel%C4%93ks/zamky-ta-furnitura-na-tortsi-polotna-z-zovnishnoi-storony-dverei-bu.jpg?updatedAt=1780636648550",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Tum%C5%A1s%20antrac%C4%ABtsAntrac%C4%ABts%20pel%C4%93ks/porih-z-nerzhaviiuchoi-stali-termo-house-model-705-431-kolir-temnyi.jpg?updatedAt=1780636646930",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Tum%C5%A1s%20antrac%C4%ABtsAntrac%C4%ABts%20pel%C4%93ks/zamky-ta-furnitura-na-tortsi-polotna-z-vnutrishnoi-storony-dverei-b.jpg?updatedAt=1780636646802",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Tum%C5%A1s%20antrac%C4%ABtsAntrac%C4%ABts%20pel%C4%93ks/vidkryte-polozhennia-dverei-bulat-termo-house-model-705-431-kolir-t.jpg?updatedAt=1780636646041",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Tum%C5%A1s%20antrac%C4%ABtsAntrac%C4%ABts%20pel%C4%93ks/img_9625-kopiya.jpg?updatedAt=1780636645372",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Tum%C5%A1s%20antrac%C4%ABtsAntrac%C4%ABts%20pel%C4%93ks/antyzriz-na-dveriakh-bulat-termo-house-model-705-431-kolir-temnyi-a.jpg?updatedAt=1780636645378",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Tum%C5%A1s%20antrac%C4%ABtsAntrac%C4%ABts%20pel%C4%93ks/img_9583-kopiya.jpg?updatedAt=1780636645324",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Tum%C5%A1s%20antrac%C4%ABtsAntrac%C4%ABts%20pel%C4%93ks/img_9594-kopiya.jpg?updatedAt=1780636640222"
  ], "short": "Siltinātas durvis ar dekoratīvu līniju dizainu un termopārrāvumu.", "specs": {"Kārbas biezums": "100 mm + termopārrāvums", "Vērtnes biezums": "95 mm", "Slēdzenes": "KALE 257 + KALE 252 (tandēms)", "Slieksnis": "Nerūsējošais tērauds"}},
  {"id": "th-705-431-balts", "name": "Termo House 705/431 Antracīts/Balts satīns", "collection": "TERMO HOUSE", "category": "ardurvis-privatmajai", "price": 960, "oldPrice": null, "sizes": ["850×2050", "950×2050"], "colors": ["Tumšs antracīts", "Balts satīns"], "thermo": true, "glass": false, "isNew": false, "clearance": false, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Tum%C5%A1s%20antrac%C4%ABtsBalts%20sat%C4%ABns/vkhidni-dveri-bulat-termo-house-model-705-431-kolir-temnyi-antratsyt-bilyi-atlasnyi.jpg?updatedAt=1780636650671",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Tum%C5%A1s%20antrac%C4%ABtsBalts%20sat%C4%ABns/VNUTRI~1.JPG",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Tum%C5%A1s%20antrac%C4%ABtsBalts%20sat%C4%ABns/vidkryte-polozhennia-dverei-bulat-termo-house-model-705-431-kolir-t.jpg?updatedAt=1780637683714",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Tum%C5%A1s%20antrac%C4%ABtsBalts%20sat%C4%ABns/antyzriz-na-dveriakh-bulat-termo-house-model-705-431-kolir-temnyi-a.jpg?updatedAt=1780637683221",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Tum%C5%A1s%20antrac%C4%ABtsBalts%20sat%C4%ABns/zamky-ta-furnitura-na-tortsi-polotna-z-vnutrishnoi-storony-dverei-b.jpg?updatedAt=1780637683225",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Tum%C5%A1s%20antrac%C4%ABtsBalts%20sat%C4%ABns/enerhozberihaiuchyi-sklopaket-ta-petli-termo-house-model-705-431-ko.jpg?updatedAt=1780637683216",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Tum%C5%A1s%20antrac%C4%ABtsBalts%20sat%C4%ABns/porih-z-nerzhaviiuchoi-stali-termo-house-model-705-431-kolir-temnyi.jpg?updatedAt=1780637683201",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Tum%C5%A1s%20antrac%C4%ABtsBalts%20sat%C4%ABns/zovnishnia-storona-dverei-bulat-termo-house-model-705-431-kolir-tem.jpg?updatedAt=1780637683182",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Tum%C5%A1s%20antrac%C4%ABtsBalts%20sat%C4%ABns/zamky-ta-furnitura-na-tortsi-polotna-z-zovnishnoi-storony-dverei-bu.jpg?updatedAt=1780637682935",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Tum%C5%A1s%20antrac%C4%ABtsBalts%20sat%C4%ABns/img_9625-kopiya.jpg?updatedAt=1780636650866",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Tum%C5%A1s%20antrac%C4%ABtsBalts%20sat%C4%ABns/img_9594-kopiya.jpg?updatedAt=1780636649319",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Tum%C5%A1s%20antrac%C4%ABtsBalts%20sat%C4%ABns/img_9583-kopiya.jpg?updatedAt=1780636649126"
  ], "short": "Antracīts no ārpuses, balts satīns no iekšpuses, ar termopārrāvumu.", "specs": {"Kārbas biezums": "100 mm + termopārrāvums", "Vērtnes biezums": "95 mm", "Slēdzenes": "KALE 257 + KALE 252 (tandēms)", "Slieksnis": "Nerūsējošais tērauds"}},
  {"id": "th-705-431-venge-balts", "name": "Termo House 705/431 Venge/Balts satīns", "collection": "TERMO HOUSE", "category": "ardurvis-privatmajai", "price": 960, "oldPrice": null, "sizes": ["850×2050", "950×2050"], "colors": ["Venge tumšs", "Balts satīns"], "thermo": true, "glass": false, "isNew": false, "clearance": false, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Venge%20tum%C5%A1sBalts%20sat%C4%ABns/vkhidni-dveri-bulat-termo-house-model-705-431-kolir-venhe-temnyi-bilyi-atlasnyi-1.jpg?updatedAt=1780637566514",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Venge%20tum%C5%A1sBalts%20sat%C4%ABns/img_9583-kopiya.jpg?updatedAt=1780637567374",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Venge%20tum%C5%A1sBalts%20sat%C4%ABns/img_9625-kopiya.jpg?updatedAt=1780637567432",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Venge%20tum%C5%A1sBalts%20sat%C4%ABns/ENERHO~1.JPG?updatedAt=1780637567332",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Venge%20tum%C5%A1sBalts%20sat%C4%ABns/ZAMKY-~2.JPG?updatedAt=1780637567331",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Venge%20tum%C5%A1sBalts%20sat%C4%ABns/ZAMKY-~1.JPG?updatedAt=1780637567305",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Venge%20tum%C5%A1sBalts%20sat%C4%ABns/ZOVNIS~1.JPG?updatedAt=1780637567297",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Venge%20tum%C5%A1sBalts%20sat%C4%ABns/img_9594-kopiya.jpg?updatedAt=1780637566565",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Venge%20tum%C5%A1sBalts%20sat%C4%ABns/VNUTRI~1.JPG?updatedAt=1780637566540",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Venge%20tum%C5%A1sBalts%20sat%C4%ABns/porih-z-nerzhaviiuchoi-stali-termo-house-model-705-431-kolir-venhe-temnyi-bilyi-atlasnyi.jpg?updatedAt=1780637566513",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Venge%20tum%C5%A1sBalts%20sat%C4%ABns/VIDKRY~1.JPG?updatedAt=1780637566506",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/TERMO%20HOUSE%20modelis%20705431%20Venge%20tum%C5%A1sBalts%20sat%C4%ABns/OTVORY~1.JPG?updatedAt=1780637566506"
  ], "short": "Venge no ārpuses, balts satīns no iekšpuses, ar termopārrāvumu.", "specs": {"Kārbas biezums": "100 mm + termopārrāvums", "Vērtnes biezums": "95 mm", "Slēdzenes": "KALE 257 + KALE 252 (tandēms)", "Slieksnis": "Nerūsējošais tērauds"}},
  {"id": "rubicon", "name": "Rubicon ar termo pārrāvumu", "collection": "RUBICON", "category": "ardurvis-privatmajai", "price": 589, "oldPrice": null, "sizes": ["850×2050", "960×2050"], "colors": ["Melns RAL 9005", "Koka griezums Medus"], "thermo": true, "glass": false, "isNew": false, "clearance": false, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/Rubicon/rubicon-%C4%81rpuse-un-iek%C5%A1puse.jpeg?updatedAt=1780636648350",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/Rubicon/rubicon-ner%C5%ABs%C4%93jo%C5%A1%C4%81-t%C4%93rauda-slieksnis.jpg?updatedAt=1780636646103",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/Rubicon/rubicon-galven%C4%81-sl%C4%93dzene.jpg?updatedAt=1780636645262",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/Rubicon/rubicon-nobl%C4%ABv%C4%93juma-regulators.jpg?updatedAt=1780636641987",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/Rubicon/rubicon-sl%C4%93dzenes-aizsl%C4%93gtas.jpg?updatedAt=1780636641881",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/Rubicon/aug%C5%A1%C4%93j%C4%81-sl%C4%93dzene-kale.jpg?updatedAt=1780636641807",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/Rubicon/rubicon-iek%C5%A1puse.jpg?updatedAt=1780636641120",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/Rubicon/rubicon-apak%C5%A1%C4%93j%C4%81-sl%C4%93ne-no-iek%C5%A1puses.jpg?updatedAt=1780636641104"
  ], "short": "Durvis ar 128 mm kārbu, termopārrāvumu un Securemme blīvējuma regulatoru.", "specs": {"Kārbas biezums": "128 mm + termopārrāvums", "Vērtnes biezums": "95 mm", "Svars": "82/92 kg", "Slēdzenes": "Kale 257 + Kale 252", "Pildījums": "Minerālvate ISOVER 2 slāņi"}},
  {"id": "prime-max", "name": "Prime Max ar termo pārrāvumu", "collection": "PRIME", "category": "ardurvis-privatmajai", "price": 649, "oldPrice": null, "sizes": ["850×2050", "960×2050"], "colors": ["Melns RAL 9005", "Balts"], "thermo": true, "glass": true, "isNew": false, "clearance": false, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/PRIME%20MAX/prime-max-1.jpg?updatedAt=1780636640253",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/PRIME%20MAX/prome-max-term-500x840.jpg?updatedAt=1780636645025",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/PRIME%20MAX/prime-max-iek%C5%A1.jpg?updatedAt=1780636644596",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/PRIME%20MAX/prime-max-%C4%81ra.jpg?updatedAt=1780636641045"
  ], "short": "Durvis ar energoefektīvu stikla paketi (argons) un termopārrāvumu.", "specs": {"Kārbas biezums": "80 mm + 12mm termotilts", "Vērtnes biezums": "102 mm", "Svars": "92/98 kg", "Slēdzenes": "Kale 257 + Kale 252", "Stikla pakete": "Energoefektīva ar argonu"}},
  {"id": "termix-adele", "name": "Termix ADELE BLACK 11", "collection": "TERMIX", "category": "ardurvis-privatmajai", "price": 939, "oldPrice": null, "sizes": ["850×2050", "960×2050"], "colors": ["Tumšs antracīts", "Antracīts"], "thermo": true, "glass": true, "isNew": true, "clearance": false, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/Termix%20Adele%20Black%2011/ekr%C4%81nuz%C5%86%C4%93mums-2026-04-07-224012.png?updatedAt=1780636642027",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/Termix%20Adele%20Black%2011/whatsapp-image-2026-04-07-at-17.12.20-2.jpg?updatedAt=1780636648502",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/Termix%20Adele%20Black%2011/whatsapp-image-2026-04-07-at-17.12.20.jpg?updatedAt=1780636642594",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/Termix%20Adele%20Black%2011/whatsapp-image-2026-04-07-at-17.12.20-1.jpg?updatedAt=1780636641843"
  ], "short": "Termix durvis ar 2 kameru reflektoro stikla paketi un nakts aizbīdni.", "specs": {"Kārbas biezums": "142 mm + termopārrāvums", "Vērtnes biezums": "104 mm", "Svars": "114/127 kg", "Stikla pakete": "2 kameru reflektorā", "Nakts aizbīdnis": "Ir"}},
  {"id": "termix-lampre", "name": "Termix LAMPRE 15", "collection": "TERMIX", "category": "ardurvis-privatmajai", "price": 949, "oldPrice": null, "sizes": ["850×2050", "960×2050"], "colors": ["Tumšs antracīts", "Antracīts"], "thermo": true, "glass": true, "isNew": true, "clearance": false, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/Termix%20Lampre%2015/ekr%C4%81nuz%C5%86%C4%93mums-2026-04-07-225552.png?updatedAt=1780636642687",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/Termix%20Lampre%2015/whatsapp-image-2026-04-07-at-17.12.52.jpg?updatedAt=1780636648109",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/Termix%20Lampre%2015/whatsapp-image-2026-04-07-at-17.12.52-1.jpg?updatedAt=1780636640250"
  ], "short": "Termix durvis ar Lampre apdari un reflektoro stikla paketi.", "specs": {"Kārbas biezums": "142 mm + termopārrāvums", "Vērtnes biezums": "104 mm", "Svars": "114/127 kg", "Apdare": "Lampre 15", "Stikla pakete": "2 kameru reflektorā", "Nakts aizbīdnis": "Ir"}},
  {"id": "boston-6012", "name": "Boston AG4 6012 Lite", "collection": "BOSTON", "category": "ardurvis-privatmajai", "price": 885, "oldPrice": null, "sizes": ["860×2050", "960×2050"], "colors": ["Antracīts", "Balts akmens"], "thermo": true, "glass": true, "isNew": true, "clearance": false, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20LITE%20AG2-6012%20Antrac%C4%ABtsBalts%20Akmens/boston-6012-500x489.jpg?updatedAt=1780636645785",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20LITE%20AG2-6012%20Antrac%C4%ABtsBalts%20Akmens/ekr%C4%81nuz%C5%86%C4%93mums-2026-02-02-205217.png?updatedAt=1780636648907",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20LITE%20AG2-6012%20Antrac%C4%ABtsBalts%20Akmens/ekr%C4%81nuz%C5%86%C4%93mums-2026-02-02-204911-360x532.png?updatedAt=1780636645400"
  ], "short": "Alumīnija durvis ar termopārrāvumu, stikla paketi un WALA eņģēm (Uw 1.1).", "specs": {"Biezums": "vērtne 97 / kārba 97 mm", "Slēdzene": "CBA KD 6085, 7 atslēgas", "Stikla pakete": "95 mm četrkameru", "Siltumvadītspēja": "Uw 1.1 W/m²K", "Skaņas izolācija": "40 dB"}},
  {"id": "boston-6114", "name": "Boston AG4 6114 Lite", "collection": "BOSTON", "category": "ardurvis-privatmajai", "price": 855, "oldPrice": null, "sizes": ["860×2050", "960×2050"], "colors": ["Antracīts"], "thermo": true, "glass": true, "isNew": false, "clearance": false, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20LITE%20AG2-6114%20Antrac%C4%ABtsAntrac%C4%ABts/boston-6014.jpg?updatedAt=1780636646143",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20LITE%20AG2-6114%20Antrac%C4%ABtsAntrac%C4%ABts/ekr%C4%81nuz%C5%86%C4%93mums-2026-02-02-205217.png?updatedAt=1780636646207",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20LITE%20AG2-6114%20Antrac%C4%ABtsAntrac%C4%ABts/ekr%C4%81nuz%C5%86%C4%93mums-2026-02-02-204911.png?updatedAt=1780636640231"
  ], "short": "Alumīnija termo durvis ar vertikālu stikla joslu.", "specs": {"Biezums": "vērtne 97 / kārba 97 mm", "Slēdzene": "CBA KD 6085, 7 atslēgas", "Stikla pakete": "95 mm četrkameru", "Siltumvadītspēja": "Uw 1.1 W/m²K"}},
  {"id": "boston-6110", "name": "Boston AG4 6110 Lite Rūgta šokolāde", "collection": "BOSTON", "category": "ardurvis-privatmajai", "price": 855, "oldPrice": null, "sizes": ["860×2050", "960×2050"], "colors": ["Rūgta šokolāde"], "thermo": true, "glass": true, "isNew": false, "clearance": false, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20LITE%20AG-6110/6110-%C5%A1okol%C4%81de-%C5%A1okol%C4%81de.jpg?updatedAt=1780636647330",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20LITE%20AG-6110/ekr%C4%81nuz%C5%86%C4%93mums-2026-02-02-205217.png?updatedAt=1780636648515",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20LITE%20AG-6110/kr%C4%81sa-r%C5%ABgta-%C5%A1okol%C4%81de.png?updatedAt=1780636648479",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20LITE%20AG-6110/kr%C4%81sa-balts-akmens.png?updatedAt=1780636647766",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20LITE%20AG-6110/kr%C4%81sa-zilo%C5%86kauls.png?updatedAt=1780636647745",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20LITE%20AG-6110/kr%C4%81sa-oniks.png?updatedAt=1780636647717",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20LITE%20AG-6110/kr%C4%81sa-antrac%C4%ABts.png?updatedAt=1780636647572",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20LITE%20AG-6110/ekr%C4%81nuz%C5%86%C4%93mums-2026-02-02-204911.png?updatedAt=1780636646971"
  ], "short": "Alumīnija termo durvis šokolādes tonī ar garu stikla joslu.", "specs": {"Biezums": "vērtne 97 / kārba 97 mm", "Slēdzene": "CBA KD 6085, 7 atslēgas", "Stikla pakete": "95 mm četrkameru", "Siltumvadītspēja": "Uw 1.1 W/m²K"}},
  {"id": "boston-6059-sokolade", "name": "Boston AG4 6059 Lite Rūgta šokolāde", "collection": "BOSTON", "category": "ardurvis-privatmajai", "price": 830, "oldPrice": null, "sizes": ["860×2050", "960×2050"], "colors": ["Rūgta šokolāde"], "thermo": true, "glass": false, "isNew": false, "clearance": false, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20LITE%20AG-6059/ag6059-%C5%A1okol%C4%81de-%C5%A1okol%C4%81de-768x768.jpg?updatedAt=1780636650946",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20LITE%20AG-6059/kr%C4%81sa-r%C5%ABgta-%C5%A1okol%C4%81de.png?updatedAt=1780636647686",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20LITE%20AG-6059/kr%C4%81sa-oniks.png?updatedAt=1780636646977",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20LITE%20AG-6059/ekr%C4%81nuz%C5%86%C4%93mums-2026-02-02-205217.png?updatedAt=1780636646560",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20LITE%20AG-6059/kr%C4%81sa-antrac%C4%ABts.png?updatedAt=1780636646207",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20LITE%20AG-6059/kr%C4%81sa-balts-akmens.png?updatedAt=1780636641071",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20LITE%20AG-6059/kr%C4%81sa-zilo%C5%86kauls.png?updatedAt=1780636641032",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20LITE%20AG-6059/ekr%C4%81nuz%C5%86%C4%93mums-2026-02-02-204911-244x360.png?updatedAt=1780636640223"
  ], "short": "Alumīnija termo durvis šokolādes tonī ar paneļu dizainu.", "specs": {"Biezums": "vērtne 97 / kārba 97 mm", "Slēdzene": "CBA KD 6085, 7 atslēgas", "Siltumvadītspēja": "Uw 1.1 W/m²K", "Skaņas izolācija": "40 dB"}},
  {"id": "boston-6157", "name": "Boston AG4 6157 Lite", "collection": "BOSTON", "category": "ardurvis-privatmajai", "price": 785, "oldPrice": null, "sizes": ["860×2050", "960×2050"], "colors": ["Antracīts"], "thermo": true, "glass": false, "isNew": false, "clearance": false, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/Boston%20Lite%20AG-6157/ag6157-antrac%C4%ABts-antrac%C4%ABts.jpg?updatedAt=1780636641821",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/Boston%20Lite%20AG-6157/kr%C4%81sa-antrac%C4%ABts-500x503.png?updatedAt=1780636651221",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/Boston%20Lite%20AG-6157/ekr%C4%81nuz%C5%86%C4%93mums-2026-02-02-205217.png?updatedAt=1780636650179",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/Boston%20Lite%20AG-6157/kr%C4%81sa-r%C5%ABgta-%C5%A1okol%C4%81de.png?updatedAt=1780636644590",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/Boston%20Lite%20AG-6157/kr%C4%81sa-zilo%C5%86kauls.png?updatedAt=1780636644541",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/Boston%20Lite%20AG-6157/kr%C4%81sa-balts-akmens.png?updatedAt=1780636644489",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/Boston%20Lite%20AG-6157/kr%C4%81sa-oniks-500x498.png?updatedAt=1780636640994",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/Boston%20Lite%20AG-6157/ekr%C4%81nuz%C5%86%C4%93mums-2026-02-02-204911.png?updatedAt=1780636640217"
  ], "short": "Alumīnija termo durvis ar minimālistisku antracīta paneli.", "specs": {"Biezums": "vērtne 97 / kārba 97 mm", "Slēdzene": "CBA KD 6085, 7 atslēgas", "Siltumvadītspēja": "Uw 1.1 W/m²K", "Skaņas izolācija": "40 dB"}},
  {"id": "boston-6145-su", "name": "Boston AG4 6145-SU", "collection": "BOSTON", "category": "ardurvis-privatmajai", "price": 1395, "oldPrice": null, "sizes": ["860×2050", "960×2050"], "colors": ["Tumšs ozols", "Ziloņkauls"], "thermo": true, "glass": false, "isNew": true, "clearance": false, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20NATURE%20AG-6145%20P-SU/ag6019-p-su-auto_width_1000.png?updatedAt=1780680938177",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20NATURE%20AG-6145%20P-SU/kr%C4%81sa-decolux-tum%C5%A1s-betons.png?updatedAt=1780680940014",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20NATURE%20AG-6145%20P-SU/tips-8-kr%C4%81sa-hroma-363x360.png?updatedAt=1780680939982",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20NATURE%20AG-6145%20P-SU/kr%C4%81sa-r%C5%ABgta-%C5%A1okol%C4%81de-ral8019.png?updatedAt=1780680940001",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20NATURE%20AG-6145%20P-SU/tips-8-kr%C4%81sa-melna.png?updatedAt=1780680939890",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20NATURE%20AG-6145%20P-SU/kr%C4%81sa-pies%C4%81tin%C4%81ts-rub%C4%ABns-ral3005.png?updatedAt=1780680939787",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20NATURE%20AG-6145%20P-SU/kr%C4%81sa-mirdzo%C5%A1a-pusnakts-ral5011.png?updatedAt=1780680939665",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20NATURE%20AG-6145%20P-SU/kr%C4%81sa-decolux-tum%C5%A1s-ozols.png?updatedAt=1780680939174",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20NATURE%20AG-6145%20P-SU/tips-8-kr%C4%81sa-zelta-360x375.png?updatedAt=1780680939162",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20NATURE%20AG-6145%20P-SU/kr%C4%81sa-zilo%C5%86kauls-ral9001.png?updatedAt=1780680939010",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20NATURE%20AG-6145%20P-SU/kr%C4%81sa-decolux-tum%C5%A1s-t%C4%ABks.png?updatedAt=1780680938997",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20NATURE%20AG-6145%20P-SU/kr%C4%81sa-oniks-ral9005.png?updatedAt=1780680938941",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20NATURE%20AG-6145%20P-SU/ekr%C4%81nuz%C5%86%C4%93mums-2026-02-14-221549.png?updatedAt=1780680938870",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20NATURE%20AG-6145%20P-SU/kr%C4%81sa-antrac%C4%ABts-ral7021.png?updatedAt=1780680938171",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20NATURE%20AG-6145%20P-SU/kr%C4%81sa-balts-akmens-ral9016.png?updatedAt=1780680938134",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20NATURE%20AG-6145%20P-SU/ekr%C4%81nuz%C5%86%C4%93mums-2026-02-14-221509.png?updatedAt=1780680938127",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20NATURE%20AG-6145%20P-SU/kr%C4%81sa-bag%C4%81t%C4%ABgs-smaragds-ral6005-370x357.png?updatedAt=1780680938102",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20NATURE%20AG-6145%20P-SU/cilindrs-_cba_-ar-termostieni-aizgrieznim.png?updatedAt=1780680938093"
  ], "short": "Premium alumīnija durvis ar dekoratīvo kapiteli un bronzas furnitūru.", "specs": {"Biezums": "vērtne 97 / kārba 97 mm", "Slēdzenes": "2 × CBA ar termostieni, 7 atslēgas", "Furnitūra": "Bronza", "Dekoratīvā kapitēlija": "Ir", "Siltumvadītspēja": "Uw 1.1 W/m²K"}},
  {"id": "boston-ag2-6010-antracits", "name": "Boston AG2-6010 Antracīts", "collection": "BOSTON", "category": "ardurvis-privatmajai", "price": 1139, "oldPrice": null, "sizes": ["860×2050", "960×2050"], "colors": ["Antracīts", "Balts akmens"], "thermo": true, "glass": true, "isNew": false, "clearance": false, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20AG2-6010%20Antrac%C4%ABts-antrac%C4%ABts/metala-durvis-majai-ar-stiklu-boston-ag2-6010-antracits-antracits-eirodurvis.jpg?updatedAt=1780636642864"
  ], "short": "Alumīnija durvis ar 2 CBA slēdzenēm, stikla paketi un iespēju sānu/virsgaismām.", "specs": {"Biezums": "vērtne 97 / kārba 97 mm", "Slēdzenes": "2 × CBA ar termostieni, 7 atslēgas", "Stikla pakete": "95 mm četrkameru", "Max konstrukcija": "3000×3000 mm", "Siltumvadītspēja": "Uw 1.1 W/m²K"}},
  {"id": "boston-ag2-6010-balts", "name": "Boston AG2-6010 Antracīts/Balts akmens", "collection": "BOSTON", "category": "ardurvis-privatmajai", "price": 1139, "oldPrice": null, "sizes": ["860×2050", "960×2050"], "colors": ["Antracīts", "Balts akmens"], "thermo": true, "glass": true, "isNew": false, "clearance": false, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/6010%20antrac%C4%ABs-balts/ag6010-500x489.png?updatedAt=1780681199915"
  ], "short": "Alumīnija durvis ar baltu iekšpusi un četrkameru stikla paketi.", "specs": {"Biezums": "vērtne 97 / kārba 97 mm", "Slēdzenes": "2 × CBA ar termostieni, 7 atslēgas", "Stikla pakete": "95 mm četrkameru", "Siltumvadītspēja": "Uw 1.1 W/m²K"}},
  {"id": "boston-ag2-6050", "name": "Boston AG2-6050 Rūgta šokolāde/Ziloņkauls", "collection": "BOSTON", "category": "ardurvis-privatmajai", "price": 1099, "oldPrice": null, "sizes": ["860×2050", "960×2050"], "colors": ["Rūgta šokolāde", "Ziloņkauls"], "thermo": true, "glass": true, "isNew": false, "clearance": false, "images": [
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20AG2-6050/ag6050.png?updatedAt=1780636643827",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20AG2-6010%20Antrac%C4%ABts-antrac%C4%ABts/visp%C4%81r%C4%93ja-inform%C4%81cija-par-konstrukciju.png?updatedAt=1780636643849",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20AG2-6010%20Antrac%C4%ABts-antrac%C4%ABts/sl%C4%93dzene-fuhr-803.png?updatedAt=1780636643828",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20AG2-6010%20Antrac%C4%ABts-antrac%C4%ABts/kr%C4%81su-palete.png?updatedAt=1780636643765",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20AG2-6010%20Antrac%C4%ABts-antrac%C4%ABts/termop%C4%81rr%C4%81vums.png?updatedAt=1780636643504",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20AG2-6010%20Antrac%C4%ABts-antrac%C4%ABts/stikla-pake%C5%A1u-ton%C4%93jumu-sal%C4%ABdzin%C4%81jums.png?updatedAt=1780636642942",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20AG2-6010%20Antrac%C4%ABts-antrac%C4%ABts/siltin%C4%81jums-un-e%C5%86%C4%A3es.png?updatedAt=1780636642878",
    "https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Priv%C4%81tm%C4%81jas%20%C4%81rdurvju%20bildes/BOSTON%20AG2-6010%20Antrac%C4%ABts-antrac%C4%ABts/cilindrs-ar-termo-stieni.png?updatedAt=1780636642903"
  ], "short": "Alumīnija durvis šokolādes/ziloņkaula tonī ar stikla paketi.", "specs": {"Biezums": "vērtne 97 / kārba 97 mm", "Slēdzenes": "2 × CBA ar termostieni, 7 atslēgas", "Stikla pakete": "95 mm četrkameru", "Siltumvadītspēja": "Uw 1.1 W/m²K"}},
  {"id": "rv-06-balts-ultramats-melns", "name": "RV-06 Balts Ultramats st. Melns", "collection": "RV-06", "category": "ieksdurvis", "price": 129, "oldPrice": null, "sizes": ["600", "700", "800", "900 mm"], "colors": ["Balts ultramats", "Melns"], "thermo": false, "glass": false, "isNew": false, "clearance": false, "images": ["https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Ieksdurvis/RV-%2006%20balts%20ultramats%20st,%20melns.png"], "short": "RV-06 modelis baltā ultramatā tonī ar melniem akcentiem.", "specs": {"Modelis": "RV-06", "Tonis": "Balts ultramats", "Akcenti": "Melns"}},
  {"id": "rv-06-peleks-ultramats-melns", "name": "RV-06 Pelēks Ultramats st. Melns", "collection": "RV-06", "category": "ieksdurvis", "price": 139, "oldPrice": null, "sizes": ["600", "700", "800", "900 mm"], "colors": ["Pelēks ultramats", "Melns"], "thermo": false, "glass": false, "isNew": false, "clearance": false, "images": ["https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Ieksdurvis/RV-%2006%20pel%C4%93ks%20ultramats%20st,%20melns.png"], "short": "RV-06 modelis pelēkā ultramatā tonī ar melniem akcentiem.", "specs": {"Modelis": "RV-06", "Tonis": "Pelēks ultramats", "Akcenti": "Melns"}},
  {"id": "ml-01-stoun-ozols-melns", "name": "ML-01 Stoun Ozols st. Melns", "collection": "ML-01", "category": "ieksdurvis", "price": 179, "oldPrice": null, "sizes": ["600", "700", "800", "900 mm"], "colors": ["Stoun ozols", "Melns"], "thermo": false, "glass": true, "isNew": false, "clearance": false, "images": ["https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Ieksdurvis/ML%20-01%20Stoun%20Ozols%20st.%20Melns.png"], "short": "ML-01 modelis stoun ozola tonī ar melnu stikla ielaidumu.", "specs": {"Modelis": "ML-01", "Tonis": "Stoun ozols", "Ielaidums": "Melns"}},
  {"id": "rv-10-zelta-rustik-melns", "name": "RV-10 Zelta Rustik st. Melns", "collection": "RV-10", "category": "ieksdurvis", "price": 149, "oldPrice": null, "sizes": ["600", "700", "800", "900 mm"], "colors": ["Zelta rustik", "Melns"], "thermo": false, "glass": false, "isNew": false, "clearance": false, "images": ["https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Ieksdurvis/RV%20-10%20Zelta%20Rustic%20st.%20Melns.png"], "short": "RV-10 modelis zelta rustik tonī ar melniem akcentiem.", "specs": {"Modelis": "RV-10", "Tonis": "Zelta rustik", "Akcenti": "Melns"}},
  {"id": "rv-10-italu-rieksts-satins", "name": "RV-10 Itāļu Rieksts st. Satīns", "collection": "RV-10", "category": "ieksdurvis", "price": 159, "oldPrice": null, "sizes": ["600", "700", "800", "900 mm"], "colors": ["Itāļu rieksts", "Satīns"], "thermo": false, "glass": true, "isNew": false, "clearance": false, "images": ["https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Ieksdurvis/RV%20-10%20It%C4%81%C4%BCu%20rieksts%20st.%20Melns.png"], "short": "RV-10 modelis itāļu rieksta tonī ar satīna stikla ielaidumiem.", "specs": {"Modelis": "RV-10", "Tonis": "Itāļu rieksts", "Stikls": "Satīns"}},
  {"id": "ml-01-rustik-blan-satins", "name": "ML-01 Rustik Blan st. Satīns", "collection": "ML-01", "category": "ieksdurvis", "price": 189, "oldPrice": null, "sizes": ["600", "700", "800", "900 mm"], "colors": ["Rustik blan", "Satīns"], "thermo": false, "glass": true, "isNew": false, "clearance": false, "images": ["https://ik.imagekit.io/ohgqgb01i/LIetuvie%C5%A1u%20m%C4%81jaslapa/Ieksdurvis/ML%20-%2001%20Rustic%20blant%20st.%20Sat%C4%ABns.png"], "short": "ML-01 modelis rustik blan tonī ar satīna stikla ielaidumu.", "specs": {"Modelis": "ML-01", "Tonis": "Rustik blan", "Stikls": "Satīns"}},
];

export function getProductById(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return product;

  const hasDoorServices = typeof product.category === "string" && product.category.includes("durvis");

  return {
    ...product,
    serviceOptions: hasDoorServices ? doorServiceOptions : [],
    descriptionSections: productDescriptions[id] || { specification: "", set: "" },
  };
}

export function getProductsByCategory(slug) {
  return products.filter((p) => p.category === slug);
}

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug);
}
