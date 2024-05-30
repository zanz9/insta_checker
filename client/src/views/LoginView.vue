<script setup>
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card/index.js";
import {Button} from "@/components/ui/button/index.js";
import {Input} from "@/components/ui/input/index.js";
import {Label} from "@/components/ui/label/index.js";
import router, {RouterNames} from "@/router/index.js";
import {reactive} from "vue";
import api from "@/api/api.js";

const form = reactive({
  email: '',
  password: ''
})

const message = reactive({
  text: '',
  type: '',
  show: false
})

async function login() {
  try {
    const {data} = await api.post('/auth/login', form)
    localStorage.setItem('accessToken', data.accessToken)
    message.text = data.message
    message.type = 'success'
    message.show = true
    await router.push({name: RouterNames.SchoolBoyList})
  } catch (e) {
    message.text = e.response.data.message
    message.type = 'error'
    message.show = true
  }
}
</script>


<template>
  <div class="grid place-content-center content-center h-screen">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">
          Вход
        </CardTitle>
        <CardDescription>
          Введите свой адрес электронной почты ниже, чтобы войти в свою учетную запись.
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Почта</Label>
          <Input id="email" type="email" placeholder="m@example.com" required v-model="form.email"/>
        </div>
        <div class="grid gap-2">
          <Label for="password">Пароль</Label>
          <Input id="password" type="password" required v-model="form.password"/>
        </div>
        <div v-if="message.show" :class="message.type === 'error' ? 'text-red-400' : 'text-green-400'">{{ message.text }}</div>
        <div>
          <Button class="w-full" @click="login">
            Войти
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Нет аккаунта?
          <RouterLink :to="{name: RouterNames.Register}" class="underline">
            Зарегистрироваться
          </RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>