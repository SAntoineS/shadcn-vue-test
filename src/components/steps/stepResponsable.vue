<script setup lang="ts">
import {Contact, Info, MapPinHouse, Search, User} from "lucide-vue-next";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";


</script>

<template>
  <!-- Responsable -->
  <h3 class="flex items-center gap-3 scroll-m-20 text-2xl font-semibold tracking-tight">
    Responsable
    <User/>
  </h3>
  <div class="flex gap-3 flex-col">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem class="w-1/2">
        <FormLabel>ID Responsable</FormLabel>
        <FormControl>
          <div class="flex items-center gap-2">
            <Input disabled type="text" v-bind="componentField"/>
            <Button type="submit" size="sm" variant="tonal">
              <Search class="mr-2 h-4 w-4"/>
              Rechercher
            </Button>

            <TooltipProvider>
              <Tooltip :delay-duration="200">
                <TooltipTrigger as-child>
                  <Info class="w-8 h-8"/>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Pour modifier veuillez passer par l'interface de modification</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="fullName">
      <FormItem class="w-1/2">
        <FormLabel>Sexe</FormLabel>
        <FormControl>
          <Select v-bind="componentField">
            <SelectTrigger>
              <SelectValue placeholder=""/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Types</SelectLabel>
                <SelectItem v-for="item in steps" :value="item.title">
                  {{ item.title }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
    <div class="flex gap-3">
      <FormField v-slot="{ componentField }" name="tessds2t">
        <FormItem class="w-full">
          <FormLabel>Prénom</FormLabel>
          <FormControl>
            <Input class="" type="text" v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="tesgfdgdf2t">
        <FormItem class="w-full">
          <FormLabel>Nom</FormLabel>
          <FormControl>
            <Input class="" type="text" v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
    </div>
  </div>
  <Separator class="my-5" label=""/>

  <!-- Contact -->
  <h3 class="flex items-center gap-3 scroll-m-20 text-2xl font-semibold tracking-tight">
    Contact
    <Contact/>
  </h3>
  <div class="flex gap-3">
    <FormField v-slot="{ componentField }" name="tes2gfdgdt">
      <FormItem class="w-full">
        <FormLabel>Numéro de téléphone</FormLabel>
        <FormControl>
          <Input class="" type="text" v-bind="componentField"/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="tes2gfgfdgfddgdt">
      <FormItem class="w-full">
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input class="" type="text" v-bind="componentField"/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
  </div>
  <Separator class="my-5"/>

  <!-- Adresse -->
  <h3 class="flex items-center gap-3 scroll-m-20 text-2xl font-semibold tracking-tight">
    Adresse
    <MapPinHouse/>
  </h3>
  <div class="flex gap-3 flex-col">
    <FormField v-slot="{ componentField }" name="fullNamdfge">
      <FormItem class="w-full">
        <FormLabel>Pays</FormLabel>
        <FormControl>
          <Select v-bind="componentField">
            <SelectTrigger>
              <SelectValue placeholder=""/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Types</SelectLabel>
                <SelectItem v-for="item in steps" :value="item.title">
                  {{ item.title }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
    <div class="flex gap-3">
      <FormField v-slot="{ componentField }" name="test">
        <FormItem class="w-full">
          <FormLabel>NPA</FormLabel>
          <FormControl>
            <Input class="" type="text" v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="ds">
        <FormItem class="w-full">
          <FormLabel>Localité</FormLabel>
          <FormControl>
            <Input class="" type="text" v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="dsf">
        <FormItem class="w-full">
          <FormLabel>Rue</FormLabel>
          <FormControl>
            <Input class="" type="text" v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="gdfgdf">
        <FormItem class="w-full">
          <FormLabel>Numéro de rue</FormLabel>
          <FormControl>
            <Input class="" type="text" v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
    </div>
  </div>
</template>

<style scoped>

</style>