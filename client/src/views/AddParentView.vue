<script setup>
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card/index.js";
import {Input} from "@/components/ui/input/index.js";
import {Label} from "@/components/ui/label/index.js";
import {Button} from "@/components/ui/button/index.js";
import {cn} from "@/lib/utils.js";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover/index.js";
import {Calendar as CalendarIcon} from 'lucide-vue-next'
import {Calendar} from '@/components/ui/v-calendar'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select/index.js";
import {onMounted, reactive, ref} from "vue";
import {useToast} from "@/components/ui/toast/index.js";
import {useRouter} from "vue-router";
import api from "@/api/api.js";
import {RouterNames} from "@/router/index.js";
import Loader from "@/components/custom/Loader.vue";

const loading = ref(true)
const onSubmit = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  job: '',
  jobPlace: '',
})
const birthday = ref('')
const genderId = ref()

const gender = ref([])

onMounted(async () => {
  const {data: genderData} = await api.get('/gender')
  gender.value = genderData

  loading.value = false
})

const {toast} = useToast()
const router = useRouter()

async function create() {
  onSubmit.value = true
  console.log({...form, birthday: birthday.value, genderId: genderId.value})
  if (!form.firstName || !form.lastName || !form.phone || !birthday.value || !genderId.value) {
    toast({
      title: 'Не все поля заполнены',
    })
    return onSubmit.value = false
  }
  try {
    const {data} = await api.post('/parent', {
      ...form,
      birthday: new Date(birthday.value).toISOString(),
      genderId: genderId.value
    })
    toast({
      title: 'Успешно',
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
      <CardTitle>Родитель</CardTitle>
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
        <div class="grid gap-3">
          <Label>Название работы</Label>
          <Input
              v-model="form.job"
              type="text"
              class="w-full"
              placeholder="Строитель"
              required
          />
        </div>
        <div class="grid gap-3">
          <Label>Место работы</Label>
          <Input
              v-model="form.jobPlace"
              type="text"
              class="w-full"
              placeholder="Улица Байтурсунова, 5"
              required
          />
        </div>

        <div>
          <Label class="block mb-2">Дата рождения</Label>
          <Popover>
            <PopoverTrigger as-child>
              <Button
                  :variant="'outline'"
                  :class="cn(
          'w-[280px] justify-start text-left font-normal',
          !birthday && 'text-muted-foreground',
        )"
              >
                <CalendarIcon class="mr-2 h-4 w-4"/>
                <span>{{ birthday }}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <Calendar v-model="birthday"/>
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label>Пол</Label>
          <Select v-model="genderId" required>
            <SelectTrigger id="gender" aria-label="Select gender">
              <SelectValue placeholder="Выберите пол"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup v-for="g in gender">
                <SelectItem :value="g.id.toString()">
                  {{ g.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </CardContent>
    <CardFooter class="flex justify-end">
      <Button variant="outline" @click="back">Отмена</Button>
      <Button class="ml-2" @click="create" :disabled="onSubmit">Сохранить</Button>
    </CardFooter>
  </Card>
</template>
