<script setup lang="ts">
import moment from "moment";
defineProps<{
  msg: string,
  bot:boolean, 
  time: Date
}>()

function convertTime(time: Date){
  return moment(time).format("MMMM Do YY, h:mm a"); 
}
</script>

<template>
  <div class="chat-container">
    <!-- if bot chat -->
    <div v-if="bot" class="bot-chat">
      {{ msg }}
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
