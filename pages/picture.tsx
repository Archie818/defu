import Footer from "@/components/Footer";
import Header from "../components/Header";
import { BeatLoader } from "react-spinners";
import Head from "next/head";
import { generateImages } from "./api/imageAPI";
import React, { useContext } from "react";
import { useAccount, useConnect, useEnsName, useNetwork } from "wagmi";
import { useState, useEffect } from "react";
import { UserContext } from "@/components/UserContext";
import Link from "next/link";

const modelDescriptions: { [key: string]: string } = {
  eastern: "Eastern style",
  western: "Western style",
  comic: "Comic style",
  cute: "Cute style",
};

export default function HomePage() {
  const [model, setModel] = useState<any>(null);
  const [prompt, setPrompt] = useState(""); // For storing input prompt
  const [negativePrompt, setNegativePrompt] = useState(""); // For storing input prompt
  const [numberImages, setNumberImages] = useState(4); // For storing number of images to generate
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { address, isConnected } = useAccount();

  const { fetchUserData, user, incrementPicsGenerated } =
    useContext(UserContext) || {};

  useEffect(() => {
    if (address && fetchUserData) {
      fetchUserData(address);
    }
  }, [address, fetchUserData]);
  // console.log("user:", user);

  const isVipUser = user?.isVipUser;
  const picsGenerated = user?.picsGenerated;
  // console.log("isVipUser:", isVipUser);
  // console.log("picsGenerated:", picsGenerated);

  const canGenerate = isConnected && (isVipUser || (picsGenerated ?? 0) < 10);

  // useEffect(() => {
  //   console.log("address:", address);
  //   console.log("isConnected:", isConnected);
  //   console.log("___________");
  // }, [address, isConnected]);

  const base64toBlob = (base64Data: string, contentType = "") => {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  const handleClick = (image: any) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const base64Images = await generateImages(
      prompt,
      negativePrompt,
      numberImages,
      model
    );
    if (base64Images) {
      const blobUrls: string[] = base64Images.map((base64Image) => {
        const base64ImageString = "data:image/png;base64," + base64Image;
        const parts = base64ImageString.split(",", 2);
        const imageType = parts[0].split(":")[1].split(";")[0];
        const imageBlob = base64toBlob(parts[1], imageType);
        const blobUrl = URL.createObjectURL(imageBlob);
        return blobUrl;
      });
      setImages(blobUrls);
      // After successfully generating images
      if (typeof incrementPicsGenerated === "function") {
        incrementPicsGenerated();
      }
    } else {
      alert("Error generating images");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center mt-2 justify-center min-h-screen">
      <Head>
        <title>Defu</title>
      </Head>

      <Header />

      {/* Images Display Area */}
      <div className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20 background-gradient">
        <div className="flex flex-1 w-full p-4 rounded-lg shadow-md ml-4 flex-col items-center">
          <h2 className="text-lg font-bold mb-4">Generated Images</h2>
          <div className="flex flex-row flex-wrap justify-center">
            {images.length > 0
              ? images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Generated ${index}`}
                    className="m-2 cursor-pointer"
                    style={{ width: "23%" }}
                    onClick={() => handleClick(image)}
                  />
                ))
              : [...Array(4)].map((_, index) => (
                  <img
                    key={index}
                    src={`/defu/${index + 1}.png`}
                    alt={`Default ${index + 1}`}
                    className="m-2 cursor-pointer"
                    style={{ width: "23%" }}
                    onClick={() => handleClick(`/defu/${index + 1}.png`)}
                  />
                ))}
          </div>
          {selectedImage && (
            <div
              className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
              onClick={closeModal}
            >
              <img
                src={selectedImage}
                alt="Enlarged"
                className="max-w-full max-h-full scale-150"
              />
            </div>
          )}
        </div>
      </div>

      {/* prompt Area */}
      <div className="flex flex-1 w-3/4 p-4 rounded-lg shadow-md flex-col items-center">
        <h2 className="text-lg font-bold mb-4 text-center">Enter Prompt</h2>
        <Link
          className="text-sm font-bold mb-4 text-center underline text-gray-400"
          href="/samples"
        >
          View Samples
        </Link>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="prompt"
            >
              Prompt
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-gray-800 leading-tight focus:outline-none focus:shadow-outline h-24"
              id="prompt"
              placeholder="Enter a phrase or sentence to guide the image generation..."
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="negativePrompt"
            >
              Negative Prompt
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-gray-800 leading-tight focus:outline-none focus:shadow-outline h-14"
              id="negativePrompt"
              placeholder="Enter elements or themes you'd like to avoid in the generated image..."
              onChange={(e) => setNegativePrompt(e.target.value)}
            />
          </div>
          <div className="flex space-x-4">
            <div className="mb-2 w-1/2">
              <label
                className="block text-gray-200 text-sm font-bold mb-2 w-1/2"
                htmlFor="numberImages"
              >
                Number of Images
              </label>
              <input
                type="number"
                min="1"
                max="4"
                defaultValue="4"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                id="numberImages"
                onChange={(e) => setNumberImages(parseInt(e.target.value))}
              />
            </div>
            <div className="mb-2 w-1/2">
              <label
                className="block text-gray-200 text-sm font-bold mb-2"
                htmlFor="modelSelection"
              >
                Select Model
              </label>
              <select
                id="modelSelection"
                className="block appearance-none w-full bg-gray-800 border border-gray-800 text-gray-200 py-2 px-4 pr-8 rounded leading-tight focus:outline-none "
                onChange={(e) => setModel(e.target.value)}
              >
                {Object.keys(modelDescriptions).map((model, index) => (
                  <option key={index} value={model}>
                    {modelDescriptions[model]}
                  </option>
                ))}
              </select>{" "}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2 ${
                isLoading || !canGenerate ? "cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isLoading || !canGenerate}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-3">
                  <BeatLoader size={10} color={"#fff"} />{" "}
                  {/* Adjust size and color as per your needs */}
                  <span>Generating...</span>
                </div>
              ) : isVipUser ? (
                "Generate"
              ) : (
                `Generate (${10 - (picsGenerated ?? 0)} remaining)`
              )}
            </button>
          </div>{" "}
        </form>
      </div>

      <Footer />
    </div>
  );
}
