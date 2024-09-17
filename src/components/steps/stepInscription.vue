<script setup lang="ts">
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {BookText, Building2, CircleHelp, Info, MapPinHouse, Scale, Search, UserCheck} from "lucide-vue-next";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Separator} from "@/components/ui/separator";
import {Textarea} from "@/components/ui/textarea";
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import {useForm} from "vee-validate";

const uniteLocale: any = defineModel('uniteLocale');

</script>

<template>

  <!-- Unite Légale -->
  <h3 class="flex items-center gap-3 scroll-m-20 text-2xl font-semibold tracking-tight">
    Unite Légale
    <Scale/>
  </h3>
  <div class="flex gap-3 flex-col">
    <FormField v-slot="{ componentField }" name="typeInscription">
      <FormItem class="w-1/2">
        <FormLabel>Type d'inscription</FormLabel>
        <FormControl>
          <Select v-bind="componentField">
            <SelectTrigger>
              <SelectValue placeholder=""/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Types</SelectLabel>
                <SelectItem v-for="type in exampleType" :value="type">
                  {{ type }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="email">
      <FormItem class="w-1/2">
        <FormLabel>IDE</FormLabel>
        <FormControl>
          <div class="flex items-center gap-2">
            <Input type="text" v-bind="componentField"/>

            <Dialog>
              <DialogTrigger as-child>
                <Button size="sm" variant="tonal">
                  <Search class="mr-2 h-4 w-4"/>
                  Rechercher
                </Button>
              </DialogTrigger>
              <DialogContent class="">
                <DialogHeader>
                  <DialogTitle>Importer une entreprise</DialogTitle>
                  <DialogDescription>
                    Cherchez et importez une entreprise par CHE ou nom
                  </DialogDescription>
                </DialogHeader>
                <div class="flex flex-col gap-4 py-4">
                  <div class="relative w-full items-center">
                    <Input id="search" type="text" placeholder="Search..." class="pl-10"/>
                    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                      <Search class="size-6 text-muted-foreground"/>
                    </span>
                  </div>
                  <div>
                    <Table>
                      <TableCaption>Liste des entreprises</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead class="text-left">IDE</TableHead>
                          <TableHead>Nom</TableHead>
                          <TableHead class="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell class="font-semibold text-left">
                            CHE100000012
                          </TableCell>
                          <TableCell>
                            Spital Uster AG
                          </TableCell>
                          <TableCell class="text-right">
                            <Button variant="information" size="sm">
                              Import
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose as-child>
                    <Button type="button" variant="tonal">
                      Fermer
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
  </div>
  <Separator class="my-5" label=""/>

  <!-- Informations -->
  <h3 class="flex items-center gap-3 scroll-m-20 text-2xl font-semibold tracking-tight">
    Informations
    <BookText/>
  </h3>
  <div class="flex gap-3 flex-col">
    <div class="flex gap-3">
      <FormField v-slot="{ componentField }" name="tes2t">
        <FormItem class="w-full">
          <FormLabel>Nom de l'entreprise</FormLabel>
          <FormControl>
            <Input class="" type="text" v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="fullName">
        <FormItem class="w-full">
          <FormLabel>Type d'inscription</FormLabel>
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
    </div>

    <div class="flex gap-3">
      <FormField v-slot="{ componentField }" name="test">
        <FormItem class="w-full">
          <FormLabel>Pays</FormLabel>
          <FormControl>
            <Input class="" type="text" v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="ds">
        <FormItem class="w-full">
          <FormLabel>Langue</FormLabel>
          <FormControl>
            <Input class="" type="text" v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
    </div>

    <FormField v-slot="{ componentField }" name="dss">
      <FormItem class="w-full">
        <FormLabel>Description de l'activité éconmique</FormLabel>
        <FormControl>
          <Textarea placeholder=""/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
    <Separator class="my-5" label="Ou"/>
    <FormField v-slot="{ componentField }" name="fullName">
      <FormItem class="w-full">
        <FormLabel>Noga 2008</FormLabel>
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

  </div>
  <Separator class="my-5"/>

  <!-- Adresse -->
  <h3 class="flex items-center gap-3 scroll-m-20 text-2xl font-semibold tracking-tight">
    Adresse
    <MapPinHouse/>
  </h3>
  <div class="flex gap-3 flex-col">
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
    <div class="flex gap-3">
      <FormField v-slot="{ componentField }" name="dfgd">
        <FormItem class="w-full">
          <FormLabel>Case postale: numéro</FormLabel>
          <FormControl>
            <Input class="" type="text" v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="dfghfs">
        <FormItem class="w-full">
          <FormLabel>Case postale: NPA</FormLabel>
          <FormControl>
            <Input class="" type="text" v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="dmnbmsf">
        <FormItem class="w-full">
          <FormLabel>Case postale: localité</FormLabel>
          <FormControl>
            <Input class="" type="text" v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
    </div>
  </div>
  <Separator class="my-5"/>

  <!-- Autre -->
  <h3 class="flex items-center gap-3 scroll-m-20 text-2xl font-semibold tracking-tight">
    Autre
    <CircleHelp/>
  </h3>
  <div class="flex gap-3 flex-col">
    <FormField v-slot="{ componentField }" name="dsddasdss">
      <FormItem class="w-full">
        <FormLabel>Remarque</FormLabel>
        <FormControl>
          <Textarea placeholder=""/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="dfghfs">
      <FormItem>
        <FormLabel>Pièce jointe</FormLabel>
        <FormControl>
          <Input type="file"/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
  </div>

</template>

<style scoped>

</style>