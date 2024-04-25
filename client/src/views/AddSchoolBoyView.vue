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
import {reactive} from "vue";
import {mdiPlusCircle} from "@mdi/js";
import SvgIcon from '@jamescoyle/vue-icon';

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  instagram: '',
})

</script>

<!--firstName, lastName, email, phone, instagram-->
<!--birthday-->
<!--gender, school, class, teacher, parent-->

<!--TODO: school, class, teacher-->
<template>
  <div class="flex min-h-screen w-full flex-col bg-muted/40">
    <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div class="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div class="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <ChevronLeft class="w-4 h-4"/>
            </Button>
            <h1 class="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Добавить ученика
            </h1>
            <div class="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm">
                Отмена
              </Button>
              <Button>
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
                      />
                    </div>
                    <div class="grid gap-3">
                      <Label>Фамилия</Label>
                      <Input
                          v-model="form.lastName"
                          type="text"
                          class="w-full"
                          placeholder="Петькин"
                      />
                    </div>
                    <div class="grid gap-3">
                      <Label>Почта</Label>
                      <Input
                          v-model="form.email"
                          type="email"
                          class="w-full"
                          placeholder="e@email.com"
                      />
                    </div>
                    <div class="grid gap-3">
                      <Label>Номер телефона</Label>
                      <Input
                          v-model="form.phone"
                          type="text"
                          class="w-full"
                          placeholder="+7____________"
                      />
                    </div>
                    <div class="grid gap-3">
                      <Label>Инстаграм</Label>
                      <Input
                          v-model="form.instagram"
                          type="text"
                          class="w-full"
                          placeholder="@vasyapetkin"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Родители</CardTitle>
                </CardHeader>
                <CardContent>
                </CardContent>
                <CardFooter class="justify-center border-t p-4">
                  <SvgIcon type="mdi" :path="mdiPlusCircle" class="cursor-pointer"></SvgIcon>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Дата рождения</CardTitle>
                </CardHeader>
                <CardContent>
                </CardContent>
              </Card>
            </div>
            <div class="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Пол</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select>
                    <SelectTrigger id="status" aria-label="Select status">
                      <SelectValue placeholder="Выберите пол"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">
                        Мужской
                      </SelectItem>
                      <SelectItem value="published">
                        Женский
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Archive Product</CardTitle>
                  <CardDescription>
                    Lipsum dolor sit amet, consectetur adipiscing elit.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div/>
                  <Button size="sm" variant="secondary">
                    Archive Product
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          <div class="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm">
              Отмена
            </Button>
            <Button size="sm">
              Сохранить
            </Button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>