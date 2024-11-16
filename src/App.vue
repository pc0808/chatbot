<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useBotStore } from "@/stores/bot";
const botStore = useBotStore();
const { isDisabled } = storeToRefs(botStore); 
const { enableInput, disableInput, generateBotResponse } = useBotStore();
//bot store is a very elaborate way to disable/enable inputs to keep up with LLM response 
import ChatUI from './components/ChatUI.vue'; //styles each individual message 

const SEND_IMAGE_LINK = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJqInnAS_WPLdAqnhDyRkL8cZPZQVKsd05fjLJFMK6_m4scsfMPT_S8PxWFm0G2jR5aQU&usqp=CAU";
const GROUPON_LOGO = "M19.634 10.78C19.661 11.213 19.689 11.645 19.689 12.051C19.689 14.213 19.149 16.05 18.042 17.671C16.205 20.346 13.126 21.966 9.858 21.966C7.022 21.966 4.618 20.913 2.728 18.913C0.917 16.995 0 14.617 0 11.78C0 9.132 1.026 6.701 2.916 4.836C4.807 2.972 7.184 2 9.911 2C14.017 2 17.608 4.513 19.148 8.62H13.8C12.612 7.378 11.369 6.756 9.857 6.756C7.049 6.756 4.834 9.052 4.834 11.807C4.834 14.86 7.21 17.21 9.857 17.21C11.64 17.21 13.233 16.292 14.178 14.616H8.696V10.78H19.634ZM30.358 14.995L35.057 21.587H29.25L25.577 15.4V21.587L20.878 21.588V2.378H27.252C29.277 2.378 30.817 2.513 32.113 3.433C33.815 4.621 34.706 6.432 34.706 8.809C34.707 11.916 33.086 14.238 30.358 14.995ZM29.952 8.917C29.952 7.323 28.953 6.674 26.873 6.674H25.577V11.24H26.495C28.818 11.24 29.952 10.645 29.952 8.917ZM118.278 2.378V13.05L111.228 2.378H106.989V21.588H111.687V10.89L118.844 21.589H122.976V2.378H118.278ZM103.097 4.865C105.042 6.783 106.069 9.242 106.069 11.863C106.069 14.618 105.096 17.077 103.287 18.942C101.423 20.887 98.883 21.941 96.21 21.941C93.374 21.941 90.943 20.915 89.053 18.915C87.243 16.997 86.324 14.62 86.324 11.782C86.324 9.133 87.35 6.701 89.24 4.837C91.131 2.973 93.507 2.028 96.236 2.028C98.804 2.028 101.234 3.028 103.097 4.865ZM101.207 11.835C101.207 9.025 98.965 6.783 96.264 6.783C93.401 6.783 91.159 9.025 91.159 11.835C91.159 14.861 93.563 17.184 96.211 17.184C98.965 17.184 101.207 14.968 101.207 11.835ZM52.208 4.865C54.153 6.783 55.18 9.242 55.18 11.863C55.18 14.618 54.207 17.077 52.398 18.942C50.534 20.887 47.995 21.941 45.321 21.941C42.485 21.941 40.054 20.915 38.164 18.915C36.354 16.997 35.436 14.62 35.436 11.782C35.436 9.133 36.462 6.701 38.353 4.837C40.244 2.973 42.62 2.028 45.349 2.028C47.914 2.028 50.344 3.028 52.208 4.865ZM50.317 11.835C50.317 9.025 48.075 6.783 45.374 6.783C42.511 6.783 40.269 9.025 40.269 11.835C40.269 14.861 42.673 17.184 45.32 17.184C48.076 17.184 50.317 14.968 50.317 11.835ZM85.705 8.836C85.705 11.322 84.57 13.375 82.653 14.536C81.437 15.265 79.924 15.4 77.925 15.4H76.574V21.587L71.875 21.588V2.378H78.249C80.273 2.378 81.813 2.513 83.11 3.433C84.813 4.621 85.705 6.432 85.705 8.836ZM80.95 8.917C80.95 7.323 79.951 6.674 77.871 6.674H76.629V11.24H77.492C79.816 11.24 80.95 10.645 80.95 8.917ZM65.821 14.212C65.821 16.4 65.038 17.481 63.39 17.481C61.797 17.481 61.121 16.373 61.121 14.212V2.378H56.394V14.401C56.394 19.211 59.013 21.884 63.362 21.884C67.656 21.884 70.519 19.102 70.519 14.401V2.378H65.821V14.212Z";

//dummy testing phrases: 
const DEFAULT_INTRO = "Hello! You are chatting with Groupon's AI chat bot. How may I help you today?";
const DEFAULT_RESPONSE = "Hi! We're sorry for the inconvenience, but all our agents are offline at the moment. We appreciate your patience and understanding. Feel free to leave a message, and we'll be back to assist you soon!"
//user request:
const userInput = ref(""); //controls whether input enabled, turned off during LLM API call & response typing: 
const isLoading = ref(false); //shows loading bubbles if true (when async calls occur)

interface M{
  msg: string,
  bot: boolean,
  time: Date
}
//array for all the messages: 
const messages = ref<Array<M>> ([]);

onBeforeMount(async () => { //renders intro message 
  messages.value.push({msg: DEFAULT_INTRO, bot:true, time: new Date()});
  //chatUI component enables input again!
});

async function sendInput(){
  //adds input to msg base, automatically renders  
  messages.value.push({msg: userInput.value, bot: false, time: new Date()}); 

  //disables input
  disableInput();
  isLoading.value = true;

  //process & render response:
  //const response = DEFAULT_RESPONSE;
  const response = await generateBotResponse(userInput.value); 

  messages.value.push({msg: response, bot: true, time: new Date()} ); 
  isLoading.value = false;
  userInput.value = "";
  //re-enables input when chatUI comp finishes typing!
}
</script>

<template>
  <div class="container">
    <!-- shows who you're chatting with, ai chatbot -->
    <header>
      <h1>
        <svg height="24" viewBox="0 0 123 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[100px] text-primary md:w-[123px]">
          <path :d="GROUPON_LOGO" fill="currentColor">
          </path>
        </svg>
      </h1>
      <h2>AI Chatbot</h2>
    </header>

    <!-- interfaces for all the messages -->
    <div class="chat-page">
      <ChatUI v-for="m in messages" :msg="m.msg" :bot="m.bot" :time="m.time"><br></ChatUI>
      <!-- loading message so user doesn't get bored  -->
      <div class="loader-container" v-if="isLoading">
        <div class="loader">  <!-- three loading circles below -->
          <div></div> 
          <div></div>
          <div></div>
        </div>
      </div>
    </div>

    <!-- input ui at the bottom -->
    <div class="input">
      <div class="type-box">
        <input :class="{'user-input': isDisabled === false, 'user-input-disabled': isDisabled === true}" 
                placeholder="Start typing your inquiry here!" v-model="userInput" :disabled="isDisabled"></input>
        <button id="submit" @click="sendInput">
          <img :src="SEND_IMAGE_LINK" height="25px" v-if="!isDisabled">
        </button>
      </div>
      
      
    </div>
  </div>
</template>

<style scoped>
template{
  align-items: center;
  float: none;
}
h1{
  display: inline;
}
.container{
  background-color: var(--vt-c-white);
  border: solid 2px var(--color-border);
  width: 100vh;
  height: 100vh;

  position: relative;
}
header{
  background-color: var(--vt-c-white-mute);
  padding: 3% 5%;
  border-bottom: solid 2px var(--color-border);
}
.chat-page{
  padding: 0% 5% 2%;
  max-height: 65vh;
  overflow-y:auto
}
/* loading animation: */
.loader-container {
  display: flex;
}

.loader {
  display: flex;
  justify-content: space-between;
  width: 10vh;
}

.loader div {
  width: 16px;
  height: 16px;
  background-color: var(--color-border);
  border-radius: 50%;
  animation: grow-shrink 1.5s infinite;
}

.loader div:nth-child(1) {
  animation-delay: 0s;
}

.loader div:nth-child(2) {
  animation-delay: 0.3s;
}

.loader div:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes grow-shrink {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}
.input{
  background-color: var(--vt-c-white-mute);
  border-top: solid 2px var(--color-border);
  padding: 2% 5%;
  position: absolute;
  bottom: 0%;
  left: 0%;
  right: 0%;
}
.type-box{
  font-size: medium;
  border: solid 2px var(--color-border);
  border-radius: 15px;
  width: 100%;
  display: inline-block;
  padding: 0%;
}
.user-input{
  padding: 2%;
  background: none;
  font-size: medium;
  float: left;
  width: 88%;
  border: 0;
}
.user-input-disabled{
  padding: 2%;
  background: none;
  font-size: medium;
  float: left;
  width: 88%;
  border: 0;

  opacity: 50%;
}
.user-input-disabled:hover{
  cursor: not-allowed;
}
.user-input:focus{
  outline: none;
}
#submit{
  background-color: transparent;
  border: 0;
  border-radius: 5%;
  padding: 0%;
  float: right;
  width: 7%;
  padding-top: 1.5%;
}
#submit:hover{
  cursor: pointer;
}
img{
  opacity: 50%;
}
img:hover{
  opacity: 100%;
}
</style>
