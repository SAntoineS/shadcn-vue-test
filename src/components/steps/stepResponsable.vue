<script setup lang="ts">
import {User} from "lucide-vue-next";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {inject, Ref} from "vue";


// Variables et références
const uniteLocale = inject<Ref>("uniteLocale");
</script>

<template>
  <!-- Responsable -->
  <h3 class="flex items-center gap-3 scroll-m-20 text-2xl font-semibold tracking-tight">
    Responsable
    <User/>
  </h3>
  <div class="flex gap-3 flex-col">
    <div class="flex gap-3">
      <FormField v-model="uniteLocale.responsablePrenom" v-slot="{ componentField }" name="responsablePrenom">
        <FormItem class="w-full">
          <FormLabel>Prénom*</FormLabel>
          <FormControl>
            <Input class="" type="text" v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
      <FormField v-model="uniteLocale.responsableNom" v-slot="{ componentField }" name="responsableNom">
        <FormItem class="w-full">
          <FormLabel>Nom*</FormLabel>
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