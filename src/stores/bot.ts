//Stores related to the functions of chatbot response 
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { GoogleGenerativeAI } from "@google/generative-ai";

const DEFAULT_FAIL_MSG = "Apologies but I seemed to have made a mistake. Please try sending your message again."

const genAI = new GoogleGenerativeAI("AIzaSyAJVdS5ci1Vr2y1AdYEvoSXwYg86OkHhZc");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

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
        try{
          const result = await model.generateContent(query);
          return result.response.text();
        } catch(error){
          return DEFAULT_FAIL_MSG; 
        }
      }
  
      return {
        isDisabled,
        disableInput,
        enableInput,
        generateBotResponse,
      };
    },

  );
  