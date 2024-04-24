<script setup >
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import router, {RouterNames} from "@/router/index.js";
import {reactive} from "vue";
import api from "@/api/api";

const form = reactive({
  email: '',
  password: ''
})

const message = reactive({
  text: '',
  type: '',
  show: false
})

async function register() {
  try {
    const {data} = await api.post('/auth/register', form)
    localStorage.setItem('accessToken', data.accessToken)
    message.text = data.message
    message.type = 'success'
    message.show = true

    await router.push({name: RouterNames.Home})
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
        <CardTitle class="text-xl">
          Регистрация
        </CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Почта</Label>
            <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                v-model="form.email"
            />
          </div>
          <div class="grid gap-2">
            <Label for="password">Пароль</Label>
            <Input id="password" type="password" v-model="form.password"/>
          </div>
          <div v-if="message.show" :class="message.type === 'error' ? 'text-red-400' : 'text-green-400'">{{ message.text }}</div>
          <Button type="submit" class="w-full" @click="register">
            Зарегистрироваться
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Уже есть аккаунт?
          <RouterLink :to="{name: RouterNames.Login}" class="underline">
            Войти
          </RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>