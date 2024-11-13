<script setup lang="ts">
import ChatUI from './components/ChatUI.vue';
const SEND_IMAGE_LINK = "../src/assets/send_icon.png";
const DEFAULT_INTRO = "Hello! You are chatting with Groupon's AI chat bot. How may I help you today?";

const messages: Array<{msg: string, bot:boolean}> = [];
messages.push({msg: DEFAULT_INTRO, bot:true});
</script>

<template>
  <div class="container">
    <div class="header">
      <h1>Groupon</h1>
      <span>AI Chatbot</span>
    </div>

    <div class="chat-page">
      <ChatUI msg="Incoming msg"></ChatUI>
    </div>

    <div class="input">
      <div class="type-box">
        <input id="user-input" placeholder="Start typing your inquiry here!"></input>
        <button id="submit">
          <img :src="SEND_IMAGE_LINK"height="25px">
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
    height: 99vh;

    position: relative;
}
.header{
  background-color: var(--vt-c-white-mute);
  padding: 3% 5%;
  border-bottom: solid 2px var(--color-border);
}
.chat-page{
  padding: 2% 5%;
  position: relative;
}
.input{
  background-color: var(--vt-c-white-mute);
  border-top: solid 2px var(--color-border);
  padding: 2% 4.9%;
  position: absolute;
  bottom: 0%;
  left: 0%;
  right: 0%;
}
.type-box{
  font-size: medium;
  border: solid 2px var(--color-border);
  border-radius: 15px;
  margin-left: 0.1%;
  width: 100%;
  display: inline-block;
  padding: 0%;
}
#user-input{
  padding: 2%;
  background: none;
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
