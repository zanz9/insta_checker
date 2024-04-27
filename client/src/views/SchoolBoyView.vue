<script setup>
import {useRoute} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import api from "@/api/api.js";
import {Button} from "@/components/ui/button/index.js";
import router, {RouterNames} from "@/router/index.js";
import {Badge} from "@/components/ui/badge/index.js";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {Card, CardContent} from "@/components/ui/card/index.js";
import SvgIcon from '@jamescoyle/vue-icon';
import {mdiEmailOutline, mdiFaceMan, mdiFaceWoman, mdiHumanMaleBoard, mdiInstagram, mdiPhone, mdiSchool} from '@mdi/js';
import Loader from "@/components/custom/Loader.vue";

const route = useRoute()

async function back() {
  await router.push({name: RouterNames.SchoolBoyList})
}

const loading = ref(true)
const loadingPosts = ref(true)

const schoolBoy = reactive({
  firstName: '',
  lastName: '',
  birthday: '',
  age: 0,
  gender: '',
  instagram: '',
  posts: 0,
  phone: '',
  email: '',
  info: {
    classes: {
      name: ''
    },
    school: {
      name: ''
    },
    teacher: {
      name: '',
      phone: ''
    }
  },
  family: []
})

const family = reactive({
  father: {
    name: '',
    job: '',
    jobPlace: '',
    phone: ''
  },
  mother: {
    name: '',
    job: '',
    jobPlace: '',
    phone: ''
  }
})


onMounted(async () => {
  const {data} = await api.get('/schoolBoy/' + route.params.id)
  const now = new Date()
  const dob = new Date(data.birthday)
  const dobNow = new Date(now.getFullYear(), dob.getMonth(), dob.getDate())
  let age = now.getFullYear() - dob.getFullYear()
  if (now < dobNow) {
    age--
  }
  schoolBoy.age = age
  schoolBoy.firstName = data.firstName
  schoolBoy.lastName = data.lastName
  schoolBoy.birthday = data.birthday
  schoolBoy.gender = data.gender.name
  schoolBoy.info.classes.name = data.info.classes.name
  schoolBoy.info.school.name = data.info.school.name
  schoolBoy.info.teacher.name = data.info.teacher.lastName + ' ' + data.info.teacher.firstName
  schoolBoy.info.teacher.phone = data.info.teacher.phone

  schoolBoy.phone = data.phone
  schoolBoy.email = data.email

  schoolBoy.family = data.family

  for (const fam of data.family) {
    const gender = fam.parent.gender.name
    const name = fam.parent.firstName + ' ' + fam.parent.lastName
    if (gender === 'Мужской') {
      family.father.name = name
      family.father.job = fam.parent.job
      family.father.jobPlace = fam.parent.jobPlace
      family.father.phone = fam.parent.phone
    } else if (gender === 'Женский') {
      family.mother.name = name
      family.mother.job = fam.parent.job
      family.mother.jobPlace = fam.parent.jobPlace
      family.mother.phone = fam.parent.phone
    }
  }
  schoolBoy.instagram = data.instagram
  loading.value = false
  const {data: posts} = await api.get('/instagram/' + schoolBoy.instagram)
  schoolBoy.posts = posts.count
  loadingPosts.value = false
})
</script>

<template>
  <div>
    <div v-if="loading.value">
      <div role="status" class="text-center grid items-center justify-center content-center h-screen">
        <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"/>
          <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
  <div v-if="!loading.value">
    <div class="flex justify-between">
      <span class="text-3xl font-bold">{{ schoolBoy.lastName }} {{ schoolBoy.firstName }}</span>

      <Button @click="back">Назад</Button>
    </div>

    <div>
      <Badge class="mr-1">{{ schoolBoy.age }} лет</Badge>
      <Badge class="mr-1">{{ schoolBoy.gender }} пол</Badge>
    </div>

    <div class="my-2">
      <div>
        <svg-icon type="mdi" :path="mdiInstagram" class="inline"></svg-icon>
        {{ schoolBoy.instagram }}
      </div>
      <div>
        <svg-icon type="mdi" :path="mdiPhone" class="inline"></svg-icon>
        {{ schoolBoy.phone }}
      </div>
      <div>
        <svg-icon type="mdi" :path="mdiEmailOutline" class="inline"></svg-icon>
        {{ schoolBoy.email }}
      </div>

      <div>
        <svg-icon type="mdi" :path="mdiSchool" class="inline"></svg-icon>
        {{ schoolBoy.info.school.name }} Класс: {{schoolBoy.info.classes.name}}
      </div>
      <div>
        <svg-icon type="mdi" :path="mdiHumanMaleBoard" class="inline"></svg-icon>
        {{ schoolBoy.info.teacher.name }}
      </div>

      <div class="">
        <div v-if="family.father.name">
          <svg-icon type="mdi" :path="mdiFaceMan" class="inline"></svg-icon>
          {{ family.father.name }}

          <div>
            <svg-icon type="mdi" :path="mdiPhone" class="inline"></svg-icon>
            {{ family.father.phone }}
          </div>
          <div>
            <div>Работа: {{ family.father.job }}</div>
            <div>Место работы: {{ family.father.jobPlace }}</div>
          </div>
        </div>
        <div v-if="family.mother.name">
          <svg-icon type="mdi" :path="mdiFaceWoman" class="inline"></svg-icon>
          {{ family.mother.name }}

          <div>
            <svg-icon type="mdi" :path="mdiPhone" class="inline"></svg-icon>
            {{ family.mother.phone }}
          </div>
          <div>
            <div>Работа: {{ family.mother.job }}</div>
            <div>Место работы: {{ family.mother.jobPlace }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="my-2">
      <Loader v-if="loadingPosts"/>
      <Carousel v-else>
        <CarouselContent>
          <CarouselItem v-for="(_, index) in schoolBoy.posts" :key="index"
                        class="sm:basis-1/2 md:basis-1/2 lg:basis-1/3">
            <div class="p-1">
              <Card>
                <CardContent class="flex aspect-square items-center justify-center p-6">
                  <img :src="`http://localhost:3000/api/images/${schoolBoy.instagram}/${index}.jpg`" alt=""
                       class="max-h-[350px] max-w-[350px] h-auto w-auto"
                  >
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>

  </div>

</template>
