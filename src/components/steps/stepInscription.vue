<script setup lang="ts">
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {BookText, CircleHelp, Contact, Info, MapPinHouse, Scale, Search} from "lucide-vue-next";
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
import {ref, watch, inject, Ref} from "vue";
import {Label} from "@/components/ui/label";

// Variables et références
const uniteLocale = inject<Ref>("uniteLocale");
const isIdeVisible = ref(false);

const dialog = ref(false);

let isDescriptionFilled = ref(false);
let isNogaFilled = ref(false);

const exampleType = ['Type 1', 'Type 2', 'Type 3']
const exampleIDE = [
  {
    legal_id: 'CHE100000012',
    name: 'Spital User AG',
  },
  {
    legal_id: 'CHE100039845',
    name: 'Google Sarl',
  }
]

// Watch for changes in the fields
watch(() => uniteLocale.value.descriptionActiEconomiques, (newValue) => {
  isDescriptionFilled.value = !!newValue;
});

watch(() => uniteLocale.value.noga, (newValue) => {
  isNogaFilled.value = !!newValue;
});

watch(() => uniteLocale.value.ide, (newValue: string) => {
  isIdeVisible.value = !!newValue;
  if (newValue) {
    // fetchData();
  }
});
function importIDE(uniteLegale) {
  if (uniteLegale) {
    uniteLocale.value.ide = uniteLegale.legal_id
    dialog.value = false;
  }
}
</script>

<template>
  <!-- Unite Légale -->
  <h3 class="flex items-center gap-3 scroll-m-20 text-2xl font-semibold tracking-tight">
    Unite Légale
    <Scale/>
  </h3>
  <div class="flex gap-3 flex-col">
    <FormField v-model="uniteLocale.typeInscription" v-slot="{ componentField }" name="typeInscription">
      <FormItem class="w-1/2">
        <FormLabel>Type d'inscription*</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder=""/>
            </SelectTrigger>
          </FormControl>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Types</SelectLabel>
              <SelectItem v-for="item in exampleType" :value="item">
                {{ item }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage/>
      </FormItem>
    </FormField>
    <FormField v-model="uniteLocale.ide" v-slot="{ componentField }" name="ide">
      <FormItem class="w-1/2">
        <FormLabel>IDE*</FormLabel>
        <FormControl>
          <div class="flex items-center gap-2">
            <Input type="text" v-bind="componentField"/>
            <Dialog :open="dialog">
              <DialogTrigger as-child>
                <Button size="sm" variant="tonal" @click="dialog = true">
                  <Search class="mr-2 h-4 w-4"/>
                  Rechercher
                </Button>
              </DialogTrigger>
              <DialogContent>
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
                      <TableRow  v-for="item in exampleIDE" :key="item.ide">
                        <TableCell class="font-semibold text-left">
                          {{ item.legal_id }}
                        </TableCell>
                        <TableCell>
                          {{ item.name }}
                        </TableCell>
                        <TableCell class="text-right">
                          <Button variant="information" size="sm" type="button" @click="importIDE(item)">
                            Import
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <DialogFooter>
                  <DialogClose as-child>
                    <Button type="button" variant="tonal" @click="dialog = false">
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
    <div v-if="isIdeVisible">
      <h4 class="scroll-m-20 text-xl font-semibold tracking-tight py-5">
        Informations de l'entreprise
      </h4>
      <div class="flex gap-3 italic">
        <div class="flex flex-col gap-3 w-1/2">
          <div class="w-full items-center gap-1.5">
            <Label for="nameUniteLegale">Nom de l'entreprise</Label>
            <Input disabled v-model="uniteLocale.nameUniteLegale" id="nameUniteLegale" type="text" />
          </div>
          <div class="w-full items-center gap-1.5">
            <Label for="legalForm">Form juridique</Label>
            <Input disabled v-model="uniteLocale.legalForm" id="legalForm" type="text" />
          </div>
        </div>

        <div class="flex flex-col gap-3 w-1/2">
          <div class="flex gap-3">
            <div class="w-1/2 items-center gap-1.5">
              <Label for="npaUniteLegale">NPA de l'unité légale</Label>
              <Input disabled v-model="uniteLocale.npaUniteLegale" id="npaUniteLegale" type="text" />
            </div>
            <div class="w-1/2 items-center gap-1.5">
              <Label for="localiteUniteLegale">Localité de l'unité légale</Label>
              <Input disabled v-model="uniteLocale.localiteUniteLegale" id="localiteUniteLegale" type="text" />
            </div>
          </div>

          <div class="w-full items-center gap-1.5">
            <Label for="rueUniteLegale">Rue de l'unité légale</Label>
            <Input disabled v-model="uniteLocale.rueUniteLegale" id="rueUniteLegale" type="text" />
          </div>
        </div>

      </div>
    </div>
  </div>
  <Separator class="my-5" label=""/>

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

    <div class="flex gap-3">
      <FormField v-model="uniteLocale.pays" v-slot="{ componentField }" name="pays">
        <FormItem class="w-full">
          <FormLabel>Pays*</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder=""/>
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Pays</SelectLabel>
                <SelectItem v-for="item in exampleType" :value="item">
                  {{ item }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage/>
        </FormItem>
      </FormField>
      <FormField v-model="uniteLocale.langue" v-slot="{ componentField }" name="langue">
        <FormItem class="w-full">
          <FormLabel>Langue*</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder=""/>
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Langues</SelectLabel>
                <SelectItem v-for="item in exampleType" :value="item">
                  {{ item }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage/>
        </FormItem>
      </FormField>
    </div>

    <FormField v-model="uniteLocale.descriptionActiEconomiques" v-slot="{ componentField }" name="descriptionActiEconomiques">
      <FormItem class="w-full">
        <FormLabel>Description de l'activité éconmique*</FormLabel>
        <FormControl>
          <Textarea :disabled="isNogaFilled"
                    placeholder="" v-bind="componentField"/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
    <Separator class="my-5" label="Ou"/>
    <FormField v-model="uniteLocale.noga" v-slot="{ componentField }" name="noga">
      <FormItem class="w-full">
        <FormLabel>Noga 2008*</FormLabel>
        <FormControl>
          <Select :disabled="isDescriptionFilled" v-bind="componentField">
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
  </div>
  <Separator class="my-5"/>

  <!-- Adresse -->
  <h3 class="flex items-center gap-3 scroll-m-20 text-2xl font-semibold tracking-tight">
    Adresse
    <MapPinHouse/>
  </h3>
  <div class="flex gap-3 flex-col">
    <div class="flex gap-3">
      <FormField v-model="uniteLocale.npa" v-slot="{ componentField }" name="npa">
        <FormItem class="w-full">
          <FormLabel>NPA*</FormLabel>
          <FormControl>
            <Input class="" type="text" v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
      <FormField v-model="uniteLocale.localite" v-slot="{ componentField }" name="localite">
        <FormItem class="w-full">
          <FormLabel>Localité*</FormLabel>
          <FormControl>
            <Input class="" type="text" v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
      <FormField v-model="uniteLocale.rue" v-slot="{ componentField }" name="rue">
        <FormItem class="w-full">
          <FormLabel>Rue*</FormLabel>
          <FormControl>
            <Input class="" type="text" v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
      <FormField v-model="uniteLocale.adresseUniteNumero" v-slot="{ componentField }" name="adresseUniteNumero">
        <FormItem class="w-full">
          <FormLabel>Numéro de rue*</FormLabel>
          <FormControl>
            <Input class="" type="text" v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
    </div>
    <div class="flex gap-3">
      <FormField v-model="uniteLocale.uniteCasePostaleNumero" v-slot="{ componentField }" name="uniteCasePostaleNumero">
        <FormItem class="w-full">
          <FormLabel>Case postale: numéro</FormLabel>
          <FormControl>
            <Input class="" type="text" v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
      <FormField v-model="uniteLocale.uniteCasePostaleNpa" v-slot="{ componentField }" name="uniteCasePostaleNpa">
        <FormItem class="w-full">
          <FormLabel>Case postale: NPA</FormLabel>
          <FormControl>
            <Input class="" type="text" v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
      <FormField v-model="uniteLocale.uniteCasePostaleLocalite" v-slot="{ componentField }" name="uniteCasePostaleLocalite">
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

  <!-- Contact -->
  <h3 class="flex items-center gap-3 scroll-m-20 text-2xl font-semibold tracking-tight">
    Contact
    <Contact/>
  </h3>
  <div class="flex gap-3">
    <FormField v-model="uniteLocale.numeroTelephone" v-slot="{ componentField }" name="numeroTelephone">
      <FormItem class="w-full">
        <FormLabel>Numéro de téléphone*</FormLabel>
        <FormControl>
          <Input class="" type="text" v-bind="componentField"/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
    <FormField v-model="uniteLocale.emailEntreprise" v-slot="{ componentField }" name="emailEntreprise">
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

  <!-- Autre -->
  <h3 class="flex items-center gap-3 scroll-m-20 text-2xl font-semibold tracking-tight">
    Autre
    <CircleHelp/>
  </h3>
  <div class="flex gap-3 flex-col">
    <FormField v-model="uniteLocale.remarque" v-slot="{ componentField }" name="remarque">
      <FormItem class="w-full">
        <FormLabel>Remarque</FormLabel>
        <FormControl>
          <Textarea placeholder=""/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
    <FormField v-model="uniteLocale.attachedFile" v-slot="{ componentField }" name="attachedFile">
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