require("@tensorflow/tfjs");
const use = require("@tensorflow-models/universal-sentence-encoder");

async function createEmbeddings(sentencesA: string, sentencesB: string) {
  const model = await use.load();
  //   const embeddings = await model.embed(sentencesA);
  return [
    await model
      .embed(sentencesA, sentencesB)
      .then((x: any) => x.arraySync()[0]),
    await model.embed(sentencesB).then((x: any) => x.arraySync()[0]),
  ];
}
function magnitude(vec: number[]) {
  let sum = 0;
  for (let i = 0; i < vec.length; i++) {
    sum += vec[i] * vec[i];
  }
  return Math.sqrt(sum);
}

function dotProduct(vecA: number[], vecB: number[]) {
  let product = 0;
  for (let i = 0; i < vecA.length; i++) {
    product += vecA[i] * vecB[i];
  }
  return product;
}

function cosineSimilarity(vecA: any, vecB: any) {
  return dotProduct(vecA, vecB) / (magnitude(vecA) * magnitude(vecB));
}

export const processSkills = async (
  jdSkills: string[],
  resumeSkills: string[]
) => {
  const [x, y] = await createEmbeddings(
    jdSkills.join(" "),
    resumeSkills.join(" ")
  );
  return cosineSimilarity(x, y);
};
