<script setup>
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card/index.js";
import {Input} from "@/components/ui/input/index.js";
import {Label} from "@/components/ui/label/index.js";
import {Button} from "@/components/ui/button/index.js";
import {reactive, ref} from "vue";
import {useToast} from "@/components/ui/toast/index.js";
import {useRouter} from "vue-router";
import api from "@/api/api.js";
import {RouterNames} from "@/router/index.js";
import Loader from "@/components/custom/Loader.vue";

const loading = ref(false)
const onSubmit = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  phone: '',
})

const {toast} = useToast()
const router = useRouter()

async function create() {
  onSubmit.value = true
  if (!form.firstName || !form.lastName || !form.phone) {
    toast({
      title: 'Не все поля заполнены',
    })
    return onSubmit.value = false
  }
  try {
    const {data} = await api.post('/teacher', {
      ...form
    })
    toast({
      title: 'Успешно добавлен учитель',
      description: `${data.lastName} ${data.firstName} успешно добавлен`
    })
    await back()
  } catch (e) {
    toast({
      title: 'Что-то пошло не так...',
    })
  }
  onSubmit.value = false
}

async function back() {
  await router.push({name: RouterNames.SchoolBoyList})
}
</script>

<template>
  <Loader v-if="loading"/>
  <Card v-else>
    <CardHeader>
      <CardTitle>Учитель</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="grid gap-6">
        <div class="grid gap-3">
          <Label>Имя</Label>
          <Input
              v-model="form.firstName"
              type="text"
              class="w-full"
              placeholder="Вася"
              required
          />
        </div>
        <div class="grid gap-3">
          <Label>Фамилия</Label>
          <Input
              v-model="form.lastName"
              type="text"
              class="w-full"
              placeholder="Пупкин"
              required
          />
        </div>
        <div class="grid gap-3">
          <Label>Номер телефона</Label>
          <Input
              v-model="form.phone"
              type="text"
              class="w-full"
              placeholder="+7____________"
              required
          />
        </div>
      </div>
    </CardContent>
    <CardFooter class="flex justify-end">
      <Button variant="outline" @click="back">Отмена</Button>
      <Button class="ml-2" @click="create" :disabled="onSubmit">Сохранить</Button>
    </CardFooter>
  </Card>
</template>
