<script setup lang="ts">
import moment from "moment";
import { storeToRefs } from "pinia";
import { useBotStore } from "@/stores/bot";
const { enableInput } = useBotStore();
const botStore = useBotStore();
const { isDisabled } = storeToRefs(botStore); 
import { ref } from "vue";
const props = defineProps<{
  msg: string,
  bot:boolean, 
  time: Date
}>();

let typeValue = ref(""); //iterating string for bot messages to appear like "typing"
const typeEffect = () => {
  if (typeValue.value.length < props.msg.length) {
    typeValue.value += props.msg.charAt(typeValue.value.length);
    setTimeout(typeEffect, 50);
  } else{
    enableInput();
  }
  
}
typeEffect(); //call
typeEffect();

function convertTime(time: Date){
  return moment(time).format("MMMM Do YY, h:mm a"); 
}
</script>

<template>
  <div class="chat-container">
    <!-- if bot chat -->
    <div v-if="bot" class="bot-chat">
      {{ typeValue }}
    </div>
    <br><span v-if="bot">{{ convertTime(time) }}</span>

    <!-- otherwise diff format -->
    <div v-if="!bot" class="my-chat">
      {{ msg }}
    </div>
    <br><br><span v-if="!bot" style="float:right">{{ convertTime(time) }} whoa</span>
  </div>
</template>

<style scoped>
.chat-container{
  width: 100%;
  display: inline-block;
}
.bot-chat{
  background-color: var(--vt-c-text-dark-2);
  border-radius: 15px;
  padding: 1% 2%;
  max-width: 50vh;
  display: inline-block;

  /* typewriter fx  */
  width: 0;
  overflow: hidden; /* Ensure the text is not visible until the typewriter effect*/
  animation: typing 2s steps(30) forwards;
}

/* The typing animation */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

.my-chat{
  background-color: var(--groupon-green);
  border-radius: 15px;
  color: white;

  float: right;
  display: inline-block;
  padding: 1% 2%;
  max-width: 50vh;
}
span{
  font-size: small;
  color: #aaa;
}
</style>
