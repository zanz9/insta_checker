<script setup>
import {Button} from "@/components/ui/button/index.js";
import api from "@/api/api.js";
import router, {RouterNames} from "@/router/index.js";
import {onMounted, reactive, ref} from "vue";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert/index.js";
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'
import Loader from "@/components/custom/Loader.vue";

const loading = ref(true)

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

const pagination = reactive({
  page: 1,
  limit: 7,
  total: 0
})


onMounted(fetchSchoolBoys)

async function clickSchoolBoy(id) {
  await router.push({name: RouterNames.SchoolBoy, params: {id}})
}

async function fetchSchoolBoys() {
  const {data} = await api.get('/schoolBoy', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    },
    params: {
      page: pagination.page,
      limit: pagination.limit
    },
  })
  schoolBoys.count = data.total
  pagination.total = schoolBoys.count
  schoolBoys.data = data.schoolBoys
  loading.value = false
}
</script>

<template>
  <Loader v-if="loading"/>
  <div v-else>
    <div class="sm:flex justify-between">
      <span class="text-3xl font-bold">Список учеников </span>

      <div>
        <Button class="mr-2" @click="router.push({name: RouterNames.AddSchoolBoy})" variant="outline">Добавить ученика
        </Button>
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

    <Pagination v-slot="{ page }" :total="pagination.total" :sibling-count="1" show-edges :items-per-page="pagination.limit"
                :default-page="pagination.page" class="flex justify-center">
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst/>
        <PaginationPrev/>

        <template v-for="(item, index) in items">
          <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
            <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'" @click="()=>{
              pagination.page = item.value
              fetchSchoolBoys()
            }">
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index"/>
        </template>

        <PaginationNext/>
        <PaginationLast/>
      </PaginationList>
    </Pagination>
  </div>
</template>
