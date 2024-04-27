<script setup>
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card/index.js";
import {Input} from "@/components/ui/input/index.js";
import {Label} from "@/components/ui/label/index.js";
import {Button} from "@/components/ui/button/index.js";
import {ref} from "vue";
import Loader from "@/components/custom/Loader.vue";
import {RouterNames} from "@/router/index.js";
import api from "@/api/api.js";
import {useToast} from "@/components/ui/toast/index.js";
import {useRouter} from "vue-router";

const loading = ref(false)

const name = ref('')

const {toast} = useToast()
const router = useRouter()

async function create() {
  try {
    const {data} = await api.post('/class', {
      name: name.value
    })
    toast({
      title: 'Успешно',
      description: `Класс ${data.name} успешно создан`
    })
    await back()
  } catch (e) {
    toast({
      title: 'Что-то пошло не так...',
    })
  }
}

async function back() {
  await router.push({name: RouterNames.SchoolBoyList})
}
</script>

<template>
  <Loader v-if="loading"/>
  <Card v-else>
    <CardHeader>
      <CardTitle>Класс</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="grid gap-6">
        <div class="grid gap-3">
          <Label>Название</Label>
          <Input
              v-model="name"
              type="text"
              class="w-full"
              placeholder="1А"
              required
          />
        </div>
      </div>
    </CardContent>
    <CardFooter class="flex justify-end">
      <Button variant="outline" @click="back">Отмена</Button>
      <Button class="ml-2" @click="create">Сохранить</Button>
    </CardFooter>
  </Card>
</template>
