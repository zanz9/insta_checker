<script setup>
import {Button} from "@/components/ui/button/index.js";
import api from "@/api/api.js";
import router, {RouterNames} from "@/router/index.js";
import {onMounted, reactive} from "vue";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert/index.js";

async function logout() {
  try {
    await api.get('/auth/logout')
    localStorage.removeItem('accessToken')
    await router.push({name: RouterNames.Login})
  } catch (e) {
    console.log(e)
  }
}

const schoolBoys = reactive({
  count: 0,
  data: []
})

const params = reactive({
  page: 1,
  limit: 10
})

onMounted(async () => {
  const {data} = await api.get('/schoolBoy', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    },
    params,
  })
  schoolBoys.count = data.total
  schoolBoys.data = data.schoolBoys
})

async function clickSchoolBoy(id) {
  await router.push({name: RouterNames.SchoolBoy, params: {id}})
}

</script>

<template>
  <div class="sm:flex justify-between">
    <span class="text-3xl font-bold">Список учеников </span>

    <div>
      <Button class="mr-2" @click="router.push({name: RouterNames.AddSchoolBoy})" variant="outline">Добавить ученика</Button>
      <Button @click="logout">Выйти</Button>
    </div>
  </div>

  <div v-for="item in schoolBoys.data">
    <Alert class="bg-slate-200 border-black my-2 cursor-pointer"
           @click="clickSchoolBoy(item.id)">
      <AlertTitle>{{ item.lastName }} {{ item.firstName }}</AlertTitle>
      <AlertDescription>
        {{ item.info.school.name }} Класс: {{ item.info.classes.name }}
      </AlertDescription>
    </Alert>
  </div>
</template>
