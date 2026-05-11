// Server-side query embedder. Uses the same MiniLM model the build script
// used so query vectors live in the same space as the indexed chunks.
//
// The pipeline is lazy-loaded and cached for the lifetime of the Node
// process. On Vercel serverless the only writable path is /tmp, so we
// point the HF cache there before the pipeline downloads weights.

import { env, pipeline, type FeatureExtractionPipeline } from "@huggingface/transformers";

env.cacheDir = "/tmp/transformers-cache";

const MODEL = "Xenova/all-MiniLM-L6-v2";

let pipePromise: Promise<FeatureExtractionPipeline> | null = null;

function getPipeline(): Promise<FeatureExtractionPipeline> {
  if (!pipePromise) {
    // q8 matches the quantized weights the build-embeddings script used,
    // so query vectors stay in the same numerical regime as the corpus.
    pipePromise = pipeline("feature-extraction", MODEL, { dtype: "q8" }) as Promise<FeatureExtractionPipeline>;
  }
  return pipePromise;
}

export async function embedQuery(text: string): Promise<Float32Array> {
  const extract = await getPipeline();
  const out = await extract(text, { pooling: "mean", normalize: true });
  // Tensor.data is a typed array view; copy into a clean Float32Array so the
  // backing buffer isn't retained by the pipeline's internal allocator.
  const data = out.data as Float32Array;
  return new Float32Array(data);
}
