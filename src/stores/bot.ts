//Stores related to the functions of chatbot response 
import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyDU5378rFXFRyQgQHs8C2EbirB9shLhoLs");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const useBotStore = defineStore(
    "chatbot",
    () => {
      const isDisabled = ref(true);

      const disableInput = () => {
        isDisabled.value = true;
      };
      const enableInput = () => {
        isDisabled.value = false; //no longer disabled 
      }

      const generateBotResponse = async (query: string) => {
        const result = await model.generateContent(query);
        return result.response.text();
      }
  
      return {
        isDisabled,
        disableInput,
        enableInput,
        generateBotResponse,
      };
    },

  );
  