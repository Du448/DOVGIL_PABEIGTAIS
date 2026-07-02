import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "src", "data", "products.js");
const sourcePath = path.join(root, "door_specification");
const outputPath = path.join(root, "src", "data", "productDescriptions.generated.js");

const productSource = await readFile(productsPath, "utf8");
const specificationSource = await readFile(sourcePath, "utf8");

const productMatches = [...productSource.matchAll(/\{\s*"id":\s*"([^"]+)"[\s\S]*?"name":\s*"([^"]+)"/g)].map((match) => ({
  id: match[1],
  name: match[2],
}));

const normalize = (value) =>
  value
    .toLowerCase()
    .replace(/["'«»]/g, "")
    .replace(/[–—-]/g, " ")
    .replace(/\//g, " ")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const stopWords = new Set([
  "metala",
  "metāla",
  "durvis",
  "durvju",
  "dzivoklim",
  "dzīvoklim",
  "privatmajai",
  "privātmājai",
  "privatmajām",
  "privātmājām",
  "ar",
  "termoparvarumu",
  "termopārrāvumu",
  "modelis",
  "modeļis",
  "kvadro",
  "uz",
  "pasutijumu",
  "pasūtījumu",
  "vardu",
  "spoguli",
  "spogulis",
]);

const stripStopWords = (value) =>
  normalize(value)
    .split(" ")
    .filter((word) => word && !stopWords.has(word))
    .join(" ");

const titleBlocks = specificationSource
  .split(/\r?\n\s*\r?\n/)
  .map((block) => block.trim())
  .filter(Boolean)
  .map((block) => block.split(/\r?\n/).map((line) => line.trim()).filter(Boolean))
  .filter((lines) => lines.length > 1);

const titleOverrides = [
  {
    includes: "Privātmājas metāla durvis TERMO HOUSE 705/431 Tumšs antracīts/Antracīts pelēks",
    id: "th-705-431-antracits",
  },
  {
    includes: "Privātmājas metāla durvis TERMO HOUSE 705/431 Tumšs antracīts/Balts satīns",
    id: "th-705-431-balts",
  },
  {
    includes: "Privātmājas metāla durvis TERMO HOUSE 705/431 Venge tumšs/Balts satīns",
    id: "th-705-431-venge-balts",
  },
  {
    includes: "Alumīnija metāla durvis ar termopārrāvumu privātmājām BOSTON AG2-6010 Antracīts",
    id: "boston-ag2-6010-antracits",
  },
  {
    includes: "Alumīnija metāla durvis ar termopārrāvumu privātmājām BOSTON AG2-6010 Antracīts/Balts akmens",
    id: "boston-ag2-6010-balts",
  },
];

const normalizedOverrides = titleOverrides.map((item) => ({
  id: item.id,
  normalizedTitle: normalize(item.includes),
}));

const technicalPrefixes = [
  "izmēri",
  "kārbas biezums",
  "durvju svars",
  "kārbas metāla biezums",
  "vērtnes konstrukciju metāla biezums",
  "ārējās metāla loksnes biezums",
  "vērtnes biezums",
  "durvju vērtnes mala apšūta ar mdf",
  "vērtnes pildījums",
  "kārbas pildījums",
  "eņģes",
  "eņģu pretnoņemamie aizsargi",
  "blīvējuma kontūru skaits",
  "blīvējuma kontūri",
  "stingruma ribas",
  "durvju blīvējuma regulators",
  "siltuma vadīšanas koeficients",
  "skaņas izolācija",
  "vērtnes siltinājums",
  "vērtnes ārējā apdare",
  "vērtnes iekšējā apdare",
  "vēršanas virziens",
  "iekšējais vēršanas virziens",
  "iekšējais vērsanas virziens",
  "augstums",
  "vērtnes metāla biezums",
  "kārbas metāla biezums",
  "cenas aprēķins",
];

const completionPrefixes = [
  "ārējā apdare",
  "iekšējā apdare",
  "kārbas metāla krāsa",
  "mdf aplodas biezums/platums",
  "metāla aplodes no ārpuses",
  "aplodes",
  "augšējā slēdzene",
  "apakšējā slēdzene",
  "slēdzene",
  "cylindrs",
  "cilindrs",
  "rokturis",
  "papildu aizsargājošas metāla kabatas iekšpusē slēdzeņu zonā",
  "furnitūras krāsa",
  "furnitūra",
  "slieksnis",
  "actiņa",
  "nakts aizbīdnis",
  "stikla pakete",
  "nestandarta izmēri uz pasūtījumu",
  "dizainu izmaiņas/plēves krāsu izmaiņas",
  "krāsu maiņa pēc ral",
  "individuālie izmēri platumā/augstumā",
  "iekšējais vēršanas virziens",
  "iekšējais vērsanas virziens",
  "uz pasūtījumu",
  "cena",
];

const isTechnicalLine = (line) => {
  const lowered = line.toLowerCase();
  if (lowered.startsWith("⚠")) return false;
  if (technicalPrefixes.some((prefix) => lowered.startsWith(prefix))) return true;
  return false;
};

const hasCompletionSignal = (line) => {
  const lowered = line.toLowerCase();
  return completionPrefixes.some((prefix) => lowered.startsWith(prefix));
};

const splitSections = (lines) => {
  const specification = [];
  const set = [];

  for (const line of lines) {
    if (!line.trim()) continue;
    if (line.startsWith("⚠")) {
      set.push(line);
      continue;
    }
    if (isTechnicalLine(line) && !hasCompletionSignal(line)) {
      specification.push(line);
      continue;
    }
    set.push(line);
  }

  return {
    specification: specification.join("\n"),
    set: set.join("\n"),
  };
};

const unmatchedTitles = [];
const descriptions = {};

for (const block of titleBlocks) {
  const [title, ...detailLines] = block;
  const titleKey = stripStopWords(title);
  const manualOverride = normalizedOverrides.find((item) => normalize(title) === item.normalizedTitle);

  let match = null;
  let bestScore = 0;

  if (manualOverride) {
    match = productMatches.find((product) => product.id === manualOverride.id) || null;
    bestScore = match ? 1 : 0;
  }

  if (!match) {
    for (const product of productMatches) {
    const nameKey = stripStopWords(product.name);
    const titleWords = new Set(titleKey.split(" ").filter(Boolean));
    const nameWords = nameKey.split(" ").filter(Boolean);
    const nameMatches = nameWords.filter((word) => titleWords.has(word)).length;
    const titleMatches = [...titleWords].filter((word) => nameWords.includes(word)).length;
    const overlap = nameWords.length ? nameMatches / nameWords.length : 0;
    const reverseOverlap = titleWords.size ? titleMatches / titleWords.size : 0;
    const substring = titleKey.includes(nameKey) || nameKey.includes(titleKey) ? 1 : 0;
    const score = Math.max(overlap, reverseOverlap) + substring;

    if (score > bestScore) {
      bestScore = score;
      match = product;
    }
  }
  }

  if (!match || bestScore < 0.45) {
    unmatchedTitles.push(title);
    continue;
  }

  descriptions[match.id] = splitSections(detailLines);
}

const missingDescriptions = productMatches
  .filter((product) => !descriptions[product.id])
  .map((product) => product.name);

if (unmatchedTitles.length || missingDescriptions.length) {
  console.warn("[generate-product-descriptions] Unmatched titles:");
  unmatchedTitles.forEach((title) => console.warn(` - ${title}`));
  console.warn("[generate-product-descriptions] Products without descriptions:");
  missingDescriptions.forEach((name) => console.warn(` - ${name}`));
}

const orderedDescriptions = Object.fromEntries(
  productMatches.map((product) => [
    product.id,
    descriptions[product.id] || { specification: "", set: "" },
  ])
);

const output = `export const productDescriptions = ${JSON.stringify(orderedDescriptions, null, 2)};\n`;
await writeFile(outputPath, output, "utf8");

console.log(`[generate-product-descriptions] Wrote ${Object.keys(orderedDescriptions).length} product descriptions to ${path.relative(root, outputPath)}`);
