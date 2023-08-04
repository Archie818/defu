interface Image {
  url: string; // Adjust this based on the actual structure of your image data
}

type ModelType = "eastern" | "western" | "comic" | "cute" | null;

const modelMapping = {
  eastern: "beautifulRealistic_v60.safetensors [bc2f30f4ad]",
  western: "realisticVisionV50_v50VAE.safetensors [d7fc69397d]",
  comic: "lyriel_v16.safetensors [ec6f68ea63]",
  cute: "chilloutmix_NiPrunedFp32Fix.safetensors [fc2511737a]",
};

export async function generateImages(
  prompt: string,
  negative_prompt: string,
  batch_size: number,
  model: ModelType,
  steps: number = 50
): Promise<Image[] | null> {
  // 1. Change the model first
  if (model) {
    const modelChangeResponse = await fetch("/api/changeModel", {
      // Replace '/api/changeModel' with your actual change model API endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sd_model_checkpoint: modelMapping[model] }),
    });

    if (!modelChangeResponse.ok) {
      console.error("Error in changing model");
      return null;
    }
  }

  // 2. Then generate images
  const payload = {
    prompt,
    negative_prompt,
    batch_size,
    steps,
  };

  const response = await fetch("/api/generateImages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    console.error("Error in API call");
    return null;
  }

  const data = await response.json();
  return data.images; // adjust based on your API response structure
}
