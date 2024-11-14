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


const SEND_IMAGE_LINK = "../src/assets/send_icon.png";
//dummy testing phase: 
const DEFAULT_INTRO = "Hello! You are chatting with Groupon's AI chat bot. How may I help you today?";
const DEFAULT_RESPONSE = "Hi! We're sorry for the inconvenience, but all our agents are offline at the moment. We appreciate your patience and understanding. Feel free to leave a message, and we'll be back to assist you soon!"
//user request:
const userInput = ref("");
const isLoading = ref(false);
//controls whether input enabled, turned off during LLM API call: 

interface M{
  msg: string,
  bot: boolean,
  time: Date
}
//array for all the messages: 
const messages = ref<Array<M>> ([]);

onBeforeMount(async () => {
  messages.value.push({msg: DEFAULT_INTRO, bot:true, time: new Date()});
  //chatUI component enables input again!
});

async function sendInput(){
  //adds input to msg base, automatically renders  
  messages.value.push({msg: userInput.value, bot: false, time: new Date()}); 
  userInput.value = "";

  //disables input
  disableInput();
  isLoading.value = true;

  //process & render response:
  //const response = DEFAULT_RESPONSE;
  const response = await generateBotResponse(userInput.value); 

  messages.value.push({msg: response, bot: true, time: new Date()} ); 
  isLoading.value = false;
  //re-enables input when chatUI comp finishes typing!
}
</script>

<template>
  <div class="container">
    <!-- shows who you're chatting with, ai chatbot -->
    <div class="header">
      <h1>Groupon</h1>
      <h2>AI Chatbot</h2>
    </div>

    <!-- interfaces for all the messages -->
    <div class="chat-page">
      <ChatUI v-for="m in messages" :msg="m.msg" :bot="m.bot" :time="m.time"><br></ChatUI>
      <!-- loading message so user doesn't get bored  -->
      <div class="loader-container" v-if="isLoading">
        <div class="loader">
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
          <img :src="SEND_IMAGE_LINK" height="25px">
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
.container{
    background-color: var(--vt-c-white);
    border: solid 2px var(--color-border);
    width: 100vh;
    height: 100vh;

    position: relative;
}
.header{
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
