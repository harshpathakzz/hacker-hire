import Link from "next/link";

const MachineCodingPlayground = () => {
  const templates = [
    "static",
    "angular",
    "react",
    "react-ts",
    "solid",
    "svelte",
    "vanilla-ts",
    "vanilla",
    "vue",
    "vue-ts",
    "node",
    "nextjs",
    "vite",
    "vite-react",
    "vite-react-ts",
    "vite-vue",
    "vite-vue-ts",
    "vite-svelte",
    "vite-svelte-ts",
    "astro",
  ];

  const generateRandomUID = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  return (
    <div className="flex justify-center my-10">
      <div className="flex flex-wrap gap-11 w-4/5 flex-col  justify-center md:flex-row">
        {templates.map((template) => (
          <Link
            key={template}
            href={`/code/${template}/${generateRandomUID()}`}
          >
            <div className="flex items-center justify-center border rounded-lg shadow-md p-4 w-4/5 h-24 m-auto hover:bg-accent hover:scale-110 md:w-48">
              <h2 className="text-lg font-semibold">{template}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MachineCodingPlayground;
