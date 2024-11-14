<script setup lang="ts">
import { ref, computed } from 'vue';
import ChatUI from './components/ChatUI.vue'; //styles each individual message 
const SEND_IMAGE_LINK = "../src/assets/send_icon.png";
const DEFAULT_INTRO = "Hello! You are chatting with Groupon's AI chat bot. How may I help you today?";
let userInput = "";

interface M{
  msg: string,
  bot: boolean,
  time: Date
}
//array for all the messages: 
const messages = ref<Array<M>> ([]);
messages.value.push({msg: DEFAULT_INTRO, bot:true, time: new Date()});
messages.value.push({msg:"huh", bot: false, time: new Date()});


function sendInput(){
  console.log(messages.value);
  messages.value.push({msg: userInput, bot: false, time: new Date()}); 
  console.log(messages.value);
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
    </div>

    <!-- input ui at the bottom -->
    <div class="input">
      <div class="type-box">
        <input id="user-input" placeholder="Start typing your inquiry here!" v-model="userInput"></input>
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
  padding: 2% 5%;
  max-height: 65vh;
  overflow-y:auto
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
#user-input{
  padding: 2%;
  background: none;
  font-size: medium;
  float: left;
  width: 88%;
  border: 0;
}
#user-input:focus{
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
