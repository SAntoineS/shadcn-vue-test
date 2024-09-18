<script setup lang="ts">
import {
  Building2,
  UserCheck,
  Check,
} from 'lucide-vue-next'
import {toTypedSchema} from '@vee-validate/zod'
import {h, provide, ref} from 'vue'
import {
  Stepper,
  StepperDescription,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger
} from '@/components/ui/stepper'
import {Form} from '@/components/ui/form'
import {Button} from '@/components/ui/button'
import {toast} from '@/components/ui/toast'
import {Toaster} from '@/components/ui/toast'
import {Card, CardContent} from "@/components/ui/card";
import StepInscription from "@/components/steps/stepInscription.vue";
import StepResponsable from "@/components/steps/stepResponsable.vue";
import {formSchema} from "@/validators/zod-validators.ts";

// Variables et références
const stepIndex = ref(1)

const uniteLocale = ref<any>({});
provide('uniteLocale', uniteLocale);

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
  console.log("UniteLocale: ", uniteLocale.value)

  if (stepIndex.value === steps.length && meta.valid) {
    toast({
      title: 'Vérifier les valeurs',
      description: h('pre', {class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4'}, h('code', {class: 'text-white'}, JSON.stringify(values, null, 2)))
    })
  }
}
</script>

<template>
  <div class="flex justify-center items-center bg-[#fbf7f5] p-10">
    <Toaster/>
    <Card class="w-full">
      <CardContent class="pt-20">
        <Form v-slot="{ meta, values, validate }" as="" keep-values
              :validation-schema="toTypedSchema(formSchema[stepIndex - 1])">
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

              <div class="flex flex-col gap-4 mt-20">
                <step-inscription v-if="stepIndex === 1"/>
                <step-responsable v-if="stepIndex === 2"/>
              </div>

              <!-- Step Actions -->
              <div class="flex items-center justify-between mt-4">
                <Button :disabled="isPrevDisabled" variant="ghost" size="sm" @click="prevStep()">
                  Précédent
                </Button>
                <!-- Next or Submit Actions -->
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
