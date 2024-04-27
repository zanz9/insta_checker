<script setup>
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card/index.js";
import {Label} from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {ChevronLeft} from 'lucide-vue-next'
import {Input} from '@/components/ui/input'
import {onMounted, reactive, ref} from "vue";
import {mdiDelete, mdiPlusCircle} from "@mdi/js";
import SvgIcon from '@jamescoyle/vue-icon';
import {Calendar} from '@/components/ui/v-calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {cn} from "@/lib/utils.js";
import {Calendar as CalendarIcon} from 'lucide-vue-next'
import {useRouter} from "vue-router";
import {RouterNames} from "@/router/index.js";
import api from "@/api/api.js";
import {SelectGroup} from "@/components/ui/select/index.js";
import {useToast} from '@/components/ui/toast/use-toast'
import Loader from "@/components/custom/Loader.vue";

const {toast} = useToast()

const loading = ref(true)
const onSubmit = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  instagram: '',
})

const birthday = ref('')
const genderId = ref()
const parentValues = ref([])
const schoolId = ref()
const classId = ref()
const teacherId = ref()

const gender = ref([])
const parents = ref([])
const schools = ref([])
const classes = ref([])
const teachers = ref([])

onMounted(async () => {
  const {data: genderData} = await api.get('/gender')
  gender.value = genderData

  const {data: parentData} = await api.get('/parent')
  parents.value = parentData

  const {data: schoolData} = await api.get('/school')
  schools.value = schoolData

  const {data: classData} = await api.get('/class')
  classes.value = classData

  const {data: teacherData} = await api.get('/teacher')
  teachers.value = teacherData

  loading.value = false
})

const router = useRouter()

function back() {
  router.push({name: RouterNames.SchoolBoyList})
}

async function create() {
  onSubmit.value = true
  if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.instagram ||
      !birthday.value || !genderId.value || !schoolId.value || !classId.value || !teacherId.value
  ) {
    toast({
      title: 'Не все поля заполнены',
    })
    return onSubmit.value = false
  }

  try {
    const {data} = await api.post('/schoolBoy', {
      ...form,
      birthday: new Date(birthday.value).toISOString(),
      genderId: genderId.value,
      schoolId: schoolId.value,
      classId: classId.value,
      teacherId: teacherId.value,
      parentId: parentValues.value
    })
    if (data.id) {
      toast({
        title: 'Ученик создан',
        description: 'Ученик успешно создан',
      })
      await router.push({name: RouterNames.SchoolBoyList})
    } else {
      toast({
        title: 'Что-то произшло не так',
      })
    }
  } catch (e) {
    toast({
      title: 'Что-то произшло не так',
    })
  }
  onSubmit.value = false
}
</script>

<template>
  <Loader v-if="loading"/>
  <div v-else class="flex min-h-screen w-full flex-col bg-muted/40">
    <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div class="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div class="flex items-center gap-4">
            <Button variant="outline" size="icon" @click="back">
              <ChevronLeft class="w-4 h-4"/>
            </Button>
            <h1 class="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Добавить ученика
            </h1>
            <div class="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm" @click="back">
                Отмена
              </Button>
              <Button @click="create" :disabled="onSubmit">
                Сохранить
              </Button>
            </div>
          </div>
          <div class="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div class="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Детали ученика</CardTitle>
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
                          placeholder="Петькин"
                          required
                      />
                    </div>
                    <div class="grid gap-3">
                      <Label>Почта</Label>
                      <Input
                          v-model="form.email"
                          type="email"
                          class="w-full"
                          placeholder="e@email.com"
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
                      <Label>Инстаграм</Label>
                      <Input
                          v-model="form.instagram"
                          type="text"
                          class="w-full"
                          placeholder="@vasyapetkin"
                          required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Родители</CardTitle>
                </CardHeader>
                <CardContent v-for="(v, i) in parentValues">
                  <div class="flex items-center">
                    <Select v-model="parentValues[i]" class="inline-block">
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup v-for="parent in parents">
                          <SelectItem :value="parent.id.toString()">
                            {{ parent.lastName }} {{ parent.firstName }} | {{parent.gender.name}}
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <SvgIcon :path="mdiDelete" type="mdi" class="ml-2 cursor-pointer"
                             @click="()=>{parentValues.splice(i, 1)}"
                    />
                  </div>

                </CardContent>
                <CardFooter class="justify-center border-t p-4">
                  <SvgIcon type="mdi" :path="mdiPlusCircle" class="cursor-pointer"
                           @click="parentValues.push(null)"></SvgIcon>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Дата рождения</CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            </div>
            <div class="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Пол</CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Детали</CardTitle>
                  <CardDescription>
                    Выберите школу, класс и учителя.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Label>Школа</Label>
                  <Select v-model="schoolId" class="inline-block" required>
                    <SelectTrigger>
                      <SelectValue placeholder=""/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup v-for="school in schools">
                        <SelectItem :value="school.id.toString()">
                          {{ school.name }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Label>Класс</Label>
                  <Select v-model="classId" class="inline-block" required>
                    <SelectTrigger>
                      <SelectValue placeholder=""/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup v-for="cl in classes">
                        <SelectItem :value="cl.id.toString()">
                          {{ cl.name }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Label>Учитель</Label>
                  <Select v-model="teacherId" class="inline-block" required>
                    <SelectTrigger>
                      <SelectValue placeholder=""/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup v-for="teacher in teachers">
                        <SelectItem :value="teacher.id.toString()">
                          {{ teacher.lastName }} {{ teacher.firstName }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>
          </div>
          <div class="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm" @click="back">
              Отмена
            </Button>
            <Button size="sm" @click="create" :disabled="onSubmit">
              Сохранить
            </Button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>