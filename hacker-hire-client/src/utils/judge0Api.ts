import axios, { isAxiosError } from "axios";

export const executeCode = async (
  sourceCode: string,
  languageId: number,
  input: string
) => {
  const apiUrl = "https://judge0-ce.p.rapidapi.com/submissions";
  const apiKey = process.env.NEXT_PUBLIC_JUDGE0_API_KEY;

  const options = {
    method: "POST",
    url: apiUrl,
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    data: {
      language_id: languageId,
      source_code: Buffer.from(sourceCode).toString("base64"),
      stdin: Buffer.from(input).toString("base64"),
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // `error` is of type AxiosError
      throw new Error(`Error: ${error.response?.data}`);
    } else {
      // Handle other types of errors
      throw new Error(`Unknown Error: ${error}`);
    }
  }
};
