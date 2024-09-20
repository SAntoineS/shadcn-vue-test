<script setup lang="ts">
import {BookText} from "lucide-vue-next";
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
import {inject, Ref} from "vue";

// Variables et références
const uniteLocale = inject<Ref>("uniteLocale");


const exampleType = ['Type 1', 'Type 2', 'Type 3']
</script>

<template>
  <!-- Informations -->
  <h3 class="flex items-center gap-3 scroll-m-20 text-2xl font-semibold tracking-tight">
    Informations
    <BookText/>
  </h3>
  <div class="flex gap-3 flex-col">
    <div class="flex gap-3">
      <FormField v-model="uniteLocale.nameUniteLocal" v-slot="{ componentField }" name="nameUniteLocal">
        <FormItem class="w-full">
          <FormLabel>Nom de l'entreprise*</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
      <FormField v-model="uniteLocale.formeJuridique" v-slot="{ componentField }" name="formeJuridique">
        <FormItem class="w-full">
          <FormLabel>Forme juridique*</FormLabel>
          <FormControl>
            <Select v-bind="componentField">
              <SelectTrigger>
                <SelectValue placeholder=""/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Formes</SelectLabel>
                  <SelectItem v-for="item in exampleType" :value="item">
                    {{ item }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
    </div>
  </div>
</template>

<style scoped>

</style>