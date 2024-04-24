<script setup>
import {Button} from "@/components/ui/button/index.js";
import api from "@/api/api.js";
import router, {RouterNames} from "@/router/index.js";

async function logout() {
  try {
    await api.get('/auth/logout')
    localStorage.removeItem('accessToken')
    await router.push({name: RouterNames.Login})
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  HOMEsadsd
  <Button @click="logout">Logout</Button>
</template>
