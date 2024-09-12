<script setup lang="ts">
import {
  Building2,
  UserCheck,
  Check,
  Search,
  Scale,
  BookText,
  MapPinHouse,
  CircleHelp,
  User,
  Contact,
  Info
} from 'lucide-vue-next'
import {toTypedSchema} from '@vee-validate/zod'
import * as z from 'zod'
import {h, ref} from 'vue'
import {
  Stepper,
  StepperDescription,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger
} from '@/components/ui/stepper'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel, SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {toast} from '@/components/ui/toast'
import {Toaster} from '@/components/ui/toast'
import {Card, CardContent} from "@/components/ui/card";
import {Separator} from '@/components/ui/separator'
import {Textarea} from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

/*const formSchema = [
  z.object({
    fullName: z.string(),
    email: z.string().email(),
  }),
  z.object({
    password: z.string().min(2).max(50),
    confirmPassword: z.string(),
  }).refine(
      (values) => {
        return values.password === values.confirmPassword
      },
      {
        message: 'Passwords must match!',
        path: ['confirmPassword'],
      },
  ),
  z.object({
    favoriteDrink: z.union([z.literal('coffee'), z.literal('tea'), z.literal('soda')]),
  }),
]*/

const stepIndex = ref(1)
const steps = [
  {
    step: 1,
    title: 'Détails',
    description: 'Remplir les champs de l\'unité locale',
    icon: Building2,

  },
  {
    step: 2,
    title: 'Responsable',
    description: 'Remplir les champs du responsable',
    icon: UserCheck,
  },
]

function HandleSubmit(meta, values, validate) {
  validate()

  if (stepIndex.value === steps.length && meta.valid) {
    onSubmit(values)
  }
}

function onSubmit(values: any) {
  toast({
    title: 'Vérifier les valeurs',
    description: h('pre', {class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4'}, h('code', {class: 'text-white'}, JSON.stringify(values, null, 2)))
  })
}
</script>

<template>
  <div class="flex justify-center items-center bg-[#fbf7f5] p-10">
    <Toaster/>
    <Card class="w-full">
      <CardContent class="pt-20">
        <!--        <Form v-slot="{ meta, values, validate }" as="" keep-values :validation-schema="toTypedSchema(formSchema[stepIndex - 1])">-->
        <Form v-slot="{ meta, values, validate }" as="" keep-values>
          <Stepper v-slot="{ isNextDisabled, isPrevDisabled, nextStep, prevStep }" v-model="stepIndex"
                   class="block w-full">
            <form @submit.prevent="HandleSubmit(meta, values, validate)">
              <div class="flex w-full flex-start gap-2">
                <StepperItem
                    v-for="step in steps"
                    :key="step.step"
                    v-slot="{ state }"
                    class="relative flex w-full flex-col items-center justify-center"
                    :step="step.step">
                  <StepperSeparator
                      v-if="step.step !== steps[steps.length - 1].step"
                      class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"/>

                  <StepperTrigger as-child>
                    <Button
                        :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
                        size="icon"
                        class="z-10 rounded-full shrink-0"
                        :class="[state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background']"
                        :disabled="state !== 'completed' && !meta.valid">
                      <Check v-if="state === 'completed'" class="size-5"/>
                      <component v-if="state === 'active' || state === 'inactive'" :is="step.icon" class="w-4 h-4"/>
                    </Button>
                  </StepperTrigger>

                  <div class="mt-5 flex flex-col items-center text-center">
                    <StepperTitle
                        :class="[state === 'active' && 'text-primary']"
                        class="text-sm font-semibold transition lg:text-base">
                      {{ step.title }}
                    </StepperTitle>
                    <StepperDescription
                        :class="[state === 'active' && 'text-primary']"
                        class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm">
                      {{ step.description }}
                    </StepperDescription>
                  </div>
                </StepperItem>
              </div>

              <div class="flex flex-col gap-4 mt-4">
                <template v-if="stepIndex === 1">
                  <Separator class="my-5" label=""/>

                  <!-- Unite Légale -->
                  <h3 class="flex items-center gap-3 scroll-m-20 text-2xl font-semibold tracking-tight">
                    Unite Légale
                    <Scale/>
                  </h3>
                  <div class="flex gap-3 flex-col">
                    <FormField v-slot="{ componentField }" name="fullName">
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
                                    <div class="relative w-full max-w-sm items-center">
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
                                    <Info class="w-8 h-8" />
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

                <template v-if="stepIndex === 2">
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
                                  <Info class="w-8 h-8" />
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
              </div>

              <div class="flex items-center justify-between mt-4">
                <Button :disabled="isPrevDisabled" variant="ghost" size="sm" @click="prevStep()">
                  Précédent
                </Button>
                <div class="flex items-center gap-3">
                  <Button variant="informationTonal" v-if="stepIndex !== 2" :type="meta.valid ? 'button' : 'submit'"
                          :disabled="isNextDisabled"
                          size="sm" @click="meta.valid && nextStep()">
                    Suivant
                  </Button>
                  <Button variant="successTonal"
                          v-if="stepIndex === 2" size="sm" type="submit">
                    Soumettre
                  </Button>
                </div>
              </div>
            </form>
          </Stepper>
        </Form>
      </CardContent>

    </Card>
  </div>
</template>

<style scoped>

</style>
