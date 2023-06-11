import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const model = req.body.sd_model_checkpoint;
  const changeModelApiUrl =
    process.env.CHANGE_MODEL_API_URL ||
    "http://127.0.0.1:7860/sdapi/v1/options";

  try {
    const response = await fetch(changeModelApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sd_model_checkpoint: model }),
    });

    if (!response.ok) {
      console.error("Error in changing model");
      return res.status(500).json({ error: "Error in changing model" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error in changing model" });
  }
};

export default handler;
