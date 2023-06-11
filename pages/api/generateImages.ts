import type { NextApiRequest, NextApiResponse } from 'next'

const apiUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:7860/sdapi/v1/txt2img';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
        return;
    }

    const { prompt, negative_prompt, batch_size,steps } = req.body;
    
    const payload = {
        prompt,
        negative_prompt,
        batch_size,
        steps,
    };
    
    const response = await fetch(`${apiUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        res.status(response.status).json({ message: 'Error in API call' });
        return;
    }

    const data = await response.json();
    res.status(200).json(data);  // adjust based on your API response structure
}
