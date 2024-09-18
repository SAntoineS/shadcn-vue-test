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
import {ref, inject, Ref} from "vue";


// Variables et références
const uniteLocale = inject<Ref>("uniteLocale");

const dialog = ref(false);

const exampleType = ['Type 1', 'Type 2', 'Type 3']
const exampleResp = [
  {
    legal_id: 'CHE100000012',
    name: 'Spital User AG',
  },
  {
    legal_id: 'CHE100039845',
    name: 'Google Sarl',
  }
]

function importResp(responsable) {
  if (responsable) {
    const {
      nom, prenom, telephone, email, sexe, personne_id,
      adresse_plz4, adresse_plznamk, adresse_deinr, adresse_rue_longname
    } = responsable;

    Object.assign(uniteLocale.value, {
      responsableNom: nom,
      responsablePrenom: prenom,
      ResponsablenumeroTelephone: telephone,
      responsableEmail: email,
      responsableSexe: sexe,
      responsablePersonneId: personne_id,
      responsableNpa: adresse_plz4,
      responsableLocalite: adresse_plznamk,
      responsableNumeroDeRue: adresse_deinr,
      responsableRue: adresse_rue_longname,
    });

    dialog.value = false;
  }
}
</script>

<template>
  <!-- Responsable -->
  <h3 class="flex items-center gap-3 scroll-m-20 text-2xl font-semibold tracking-tight">
    Responsable
    <User/>
  </h3>
  <div class="flex gap-3 flex-col">
    <FormField v-model="uniteLocale.responsablePersonneId" v-slot="{ componentField }" name="responsablePersonneId">
      <FormItem class="w-1/2">
        <FormLabel>ID Responsable</FormLabel>
        <FormControl>
          <div class="flex items-center gap-2">
            <Input type="text" v-bind="componentField"/>
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
    <FormField v-model="uniteLocale.responsableSexe" v-slot="{ componentField }" name="responsableSexe">
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
  <Separator class="my-5" label=""/>

  <!-- Contact -->
  <h3 class="flex items-center gap-3 scroll-m-20 text-2xl font-semibold tracking-tight">
    Contact
    <Contact/>
  </h3>
  <div class="flex gap-3">
    <FormField v-model="uniteLocale.responsableNumeroTelephone" v-slot="{ componentField }" name="responsableNumeroTelephone">
      <FormItem class="w-full">
        <FormLabel>Numéro de téléphone*</FormLabel>
        <FormControl>
          <Input class="" type="text" v-bind="componentField"/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
    <FormField v-model="uniteLocale.responsableEmail" v-slot="{ componentField }" name="responsableEmail">
      <FormItem class="w-full">
        <FormLabel>Email*</FormLabel>
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
    <FormField v-model="uniteLocale.responsablePays" v-slot="{ componentField }" name="responsablePays">
      <FormItem class="w-full">
        <FormLabel>Pays*</FormLabel>
        <FormControl>
          <Select v-bind="componentField">
            <SelectTrigger>
              <SelectValue placeholder=""/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Types</SelectLabel>
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
    <div class="flex gap-3">
      <FormField v-model="uniteLocale.responsableNpa" v-slot="{ componentField }" name="responsableNpa">
        <FormItem class="w-full">
          <FormLabel>NPA*</FormLabel>
          <FormControl>
            <Input class="" type="text" v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
      <FormField v-model="uniteLocale.responsableLocalite" v-slot="{ componentField }" name="responsableLocalite">
        <FormItem class="w-full">
          <FormLabel>Localité*</FormLabel>
          <FormControl>
            <Input class="" type="text" v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
      <FormField v-model="uniteLocale.responsableRue" v-slot="{ componentField }" name="responsableRue">
        <FormItem class="w-full">
          <FormLabel>Rue*</FormLabel>
          <FormControl>
            <Input class="" type="text" v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
      <FormField v-model="uniteLocale.responsableNumeroDeRue" v-slot="{ componentField }" name="responsableNumeroDeRue">
        <FormItem class="w-full">
          <FormLabel>Numéro de rue*</FormLabel>
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