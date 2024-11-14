//Stores related to the functions of chatbot response 
import { defineStore } from "pinia";
import { computed, ref } from "vue";
// import { BodyT, fetchy } from "@/utils/fetchy";

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
  
      return {
        isDisabled,
        disableInput,
        enableInput,
      };
    },

  );
  