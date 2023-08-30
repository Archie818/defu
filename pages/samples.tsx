import Footer from "@/components/Footer";
import Header from "../components/Header";
import Head from "next/head";
import Link from "next/link";

export default function SamplesPage() {
  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center mt-2 justify-center min-h-screen">
      <Head>
        <title>Defu</title>
      </Head>

      <Header />
      <div className="page-body">
        <h1 className="text-3xl font-bold mb-4 mt-4 text-center">
          Prompt Samples
        </h1>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/picture"
            className="px-8 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform bg-gray-200 rounded-md hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Back
          </Link>
        </div>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-2">Eastern style:</h2>
          <figure className="mb-4 my-4 flex justify-center">
            <a href="grid-0013.png">
              <img className="w-full max-w-4xl mx-auto" src="grid-0013.png" />
            </a>
          </figure>
          <div className="text-base">
            <h2 className="font-bold mb-1">Prompt</h2>
            <p className="mb-4">
              Photo of a Beautiful Woman, [Cozy|Floating] Fitbit, wearing
              glasses, Fangs, Bowtie, field, Spring, film grain, Polaroid, 80mm,
              Plain white background
            </p>
            <h2 className="font-bold mb-1">Negative Prompt</h2>
            <p>(worst_quality:2.0)</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-2">Western style:</h2>
          <figure className="mb-4 my-4 flex justify-center">
            <a href="grid-0014.png">
              <img className="w-full max-w-4xl mx-auto" src="grid-0014.png" />
            </a>
          </figure>
          <div className="text-base">
            <h2 className="font-bold mb-1">Prompt</h2>
            <p className="mb-4">
              high quality, photo of 22 y.o european woman, wearing summer
              dress, happy face, detailed face, skin pores
            </p>
            <h2 className="font-bold mb-1">Negative Prompt</h2>
            <p>
              (deformed iris, deformed pupils, semi-realistic, cgi, 3d, render,
              sketch, cartoon, drawing, anime), text, cropped, out of frame,
              worst quality, low quality, jpeg artifacts, ugly, duplicate,
              morbid, mutilated, extra fingers, mutated hands, poorly drawn
              hands, poorly drawn face, mutation, deformed, blurry, dehydrated,
              bad anatomy, bad proportions, extra limbs, cloned face,
              disfigured, gross proportions, malformed limbs, missing arms,
              missing legs, extra arms, extra legs, fused fingers, too many
              fingers, long neck, BadDream, UnrealisticDream
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-2">Comic style:</h2>
          <figure className="mb-4 my-4 flex justify-center">
            <a href="grid-0015.png">
              <img className="w-full max-w-4xl mx-auto" src="grid-0015.png" />
            </a>
          </figure>
          <div className="text-base">
            <h2 className="font-bold mb-1">Prompt</h2>
            <p className="mb-4">
              hypercars cyberpunk, muted colors ,swirling color smokes, legend,
              cityscape, space, mercedez benz
            </p>
            <h2 className="font-bold mb-1">Negative Prompt</h2>
            <p>
              3d, cartoon, anime, sketches, (worst quality:2), (low quality:2),
              (normal quality:2), lowres, normal quality, ((monochrome)),
              ((grayscale)), skin spots, acnes, skin blemishes, bad anatomy,
              girl, loli, young, large breasts, red eyes, muscular
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-2">Cute style:</h2>
          <figure className="mb-4 my-4 flex justify-center">
            <a href="grid-0016.png">
              <img className="w-full max-w-4xl mx-auto" src="grid-0016.png" />
            </a>
          </figure>
          <div className="text-base">
            <h2 className="font-bold mb-1">Prompt</h2>
            <p className="mb-4">
              realistic, portrait of a girl, AI language model, silver hair,
              question answering, smart, kind, energetic, cheerful, creative,
              with sparkling eyes and a contagious smile, information providing,
              conversation engaging, wide range of topics, accurate responses,
              helpful responses, knowledgeable, reliable, friendly, intelligent,
              sleek and futuristic design elements, and a complex network of
              circuits and processors. Others may imagine me as a friendly and
              approachable virtual assistant, with a smiling avatar or animated
              character representing me on their screen. Still, others may
              envision me as a disembodied voice, speaking from an unseen
              source, providing helpful and informative responses with a calm
              and reassuring tone
            </p>
            <h2 className="font-bold mb-1">Negative Prompt</h2>
            <p>
              (((sexy))), paintings, loli, big head, sketches, (worst
              quality:2), (low quality:2), (normal quality:2), lowres, normal
              quality, ((monochrome)), ((grayscale)), skin spots, acnes, skin
              blemishes, age spot, glans, nsfw, nipples, extra fingers, ((extra
              arms)), (extra legs), mutated hands, (fused fingers), (too many
              fingers), (long neck:1.3)
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
