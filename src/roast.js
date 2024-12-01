import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";






function Prompt(name, place, bio, public_repos, followers, following) {
    return `You're the best AI that exists in terms of roasting content. Below are the details of a person's GitHub profile.
  Create a violent roast based on these details. It should be a long roast and funny, harsh, and without regard for feelings.
  Focus on the bio, number of repositories, followers, and other details. Just provide the roast content and nothing else.
  
  Details:
  - Name: ${name}
  - Location: ${place || "no information available"}
  - Bio: ${bio || "no information available"}
  - Public Repositories: ${public_repos}
  - Followers: ${followers}
  - Following: ${following}`;
  }
  

export default async function generate(name, place, bio, public_repos, followers, following) {
    try {

        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

        const schema = {
            description: "Roast",
            type: SchemaType.STRING,
            nullable: false,
        };

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });





        const result = await model.generateContent(Prompt(name, place, bio, public_repos, followers, following));
        const text = result.response.text();
        return text;

    } catch (error) {
        console.error("Error generating roast:", error);
        return "Oops! Something went wrong while generating the roast.";
    }
}