<script setup>
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card/index.js";
import {Input} from "@/components/ui/input/index.js";
import {Label} from "@/components/ui/label/index.js";
import {Button} from "@/components/ui/button/index.js";
import {cn} from "@/lib/utils.js";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover/index.js";
import {Calendar} from "@/components/ui/v-calendar/index.js";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select/index.js";
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Родитель</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="grid gap-6">
        <div class="grid gap-3">
          <Label>Имя</Label>
          <Input
              type="text"
              class="w-full"
              placeholder="Вася"
              required
          />
        </div>
        <div class="grid gap-3">
          <Label>Фамилия</Label>
          <Input
              type="text"
              class="w-full"
              placeholder="Пупкин"
              required
          />
        </div>
        <div class="grid gap-3">
          <Label>Номер телефона</Label>
          <Input
              type="text"
              class="w-full"
              placeholder="+7____________"
              required
          />
        </div>
        <div class="grid gap-3">
          <Label>Название работы</Label>
          <Input
              type="text"
              class="w-full"
              placeholder="Строитель"
              required
          />
        </div>
        <div class="grid gap-3">
          <Label>Место работы</Label>
          <Input
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
      <Button variant="outline">Отмена</Button>
      <Button class="ml-2">Сохранить</Button>
    </CardFooter>
  </Card>
</template>
