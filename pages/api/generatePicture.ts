// import { NextApiRequest, NextApiResponse } from "next";
// import { ecsign, toBuffer, keccak256, pubToAddress } from "ethereumjs-util";

// let userDB = {}; // A simple in-memory "database" to store users' picture count

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   const { signature, publicAddress } = req.body;
//   if (!signature || !publicAddress) {
//     res
//       .status(401)
//       .json({ error: "Request should have signature and publicAddress" });
//     return;
//   }

//   const msg =
//     "Please sign this message to confirm your request to generate a picture.";
//   const msgBuffer = keccak256(msg);
//   const msgHash = toBuffer(msgBuffer);
//   const signatureBuffer = toBuffer(signature);
//   const sigParams = ecsign(msgHash, signatureBuffer);

//   const recoveredPublicKey = pubToAddress(
//     sigParams.v,
//     sigParams.r,
//     sigParams.s,
//     true
//   );
//   const recoveredPublicAddress = `0x${recoveredPublicKey.toString("hex")}`;

//   // The signature verification has failed
//   if (recoveredPublicAddress.toLowerCase() !== publicAddress.toLowerCase()) {
//     res.status(401).json({ error: "Signature verification failed" });
//     return;
//   }

//   const today = new Date().toISOString().slice(0, 10); // Get today's date

//   const user = userDB[publicAddress] || {
//     picturesGenerated: 0,
//     lastGeneratedDate: null,
//   };

//   // Reset picture count if a day has passed since the last generated date
//   if (user.lastGeneratedDate !== today) {
//     user.picturesGenerated = 0;
//     user.lastGeneratedDate = today;
//   }

//   if (user.picturesGenerated >= 20) {
//     res.status(400).json({ error: "Daily limit reached" });
//     return;
//   }

//   user.picturesGenerated++;
//   userDB[publicAddress] = user; // Store the updated user data

//   // Your picture generation logic here

//   res.status(200).json({ success: true });
// };
