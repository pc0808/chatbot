<script setup lang="ts">
import moment from "moment";
import { storeToRefs } from "pinia";
import { useBotStore } from "@/stores/bot";
const { enableInput, disableInput } = useBotStore();
const botStore = useBotStore();
const { isDisabled } = storeToRefs(botStore); 
import { onBeforeMount, ref } from "vue";
const props = defineProps<{
  msg: string,
  bot:boolean, 
  time: Date
}>();

let typeValue = ref(""); //iterating string for bot messages to appear like "typing"
const typeEffect = () => {
  if (typeValue.value.length < props.msg.length) {
    disableInput();
    typeValue.value += props.msg.charAt(typeValue.value.length);
    setTimeout(typeEffect, 50);
  } else{
    enableInput();
  }
  
}
if(props.bot){
  typeEffect(); //call
  typeEffect(); //enables 
}

function convertTime(time: Date){
  return moment(time).format("MMMM Do, h:mm a"); 
}
</script>

<template>
  <div :class="{'right-container': !bot, 'left-container': bot}">
    <!-- if bot chat -->
    <div v-if="bot" class="bot-chat">
      {{ typeValue }}
    </div>
    <br><span class="timestamp" v-if="bot">{{ convertTime(time) }}</span>

    <!-- otherwise diff format -->
    <div v-if="!bot" class="my-chat">
      {{ msg }}
    </div>
    <br><div class="timestamp" v-if="!bot" style="margin-top: 6%; position: static; text-align: right;">{{ convertTime(time) }}</div>
  </div>
</template>

<style scoped>
.left-container{
  width: 100%;
}

.right-container{
  padding-left: 40vh;
}
.bot-chat{
  margin: 5% 0 -4%;
  background-color: var(--vt-c-text-dark-2);
  border-radius: 15px;
  padding: 1% 2%;
  max-width: 50vh;

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
  padding: 2% 3%;
  color: white;
  float: right;
}
.timestamp{
  font-size: small;
  color: #aaa;
}
</style>
