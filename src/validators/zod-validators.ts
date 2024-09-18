import * as z from "zod";

const swissPhonePattern = /^\+41\d{9}$/
const frenchPhonePattern = /^\+33\d{9}$/

const s1 = z.string({required_error: 'Champs requis.'}).regex(swissPhonePattern, 'Numéro de téléphone non valide. (+41/+33)');
const s2 = z.string({required_error: 'Champs requis.'}).regex(frenchPhonePattern, 'Numéro de téléphone non valide. (+41/+33)');

export const formSchema = [
    // Step Responsable
    z.object({
        // Responsable
        responsablePersonneId: z
            .optional(),
        responsableSexe: z
            .optional(),
        responsablePrenom: z
            .string({
                required_error: 'Champs requis.',
            }),
        responsableNom: z
            .string({
                required_error: 'Champs requis.',
            }),

        // Contact
        responsableNumeroTelephone: z
            .union([s1,s2]),
        responsableEmail: z
            .string({
                required_error: 'Champs requis.',
            })
            .email({
                message: 'Email non valide.'
            }),

        // Adresse
        responsablePays: z
            .string({
                required_error: 'Champs requis.',
            }),
        responsableNpa: z
            .string({
                required_error: 'Champs requis.',
            })
            .min(4, 'NPA non valide.')
            .max(4, 'NPA non valide.'),
        responsableLocalite: z
            .string({
                required_error: 'Champs requis.',
            }),
        responsableRue: z
            .string({
                required_error: 'Champs requis.',
            }),
        responsableNumeroDeRue: z
            .string({
                required_error: 'Champs requis.',
            }),
    }),

    // Step Inscription
    z.object({
        // Unite Légale
        typeInscription: z
            .string({
                required_error: 'Champs requis.',
            }),
        ide: z
            .string({
                required_error: 'Champs requis.',
            })
            .regex(/^CHE\d{9}$/, {
                message: "Le format doit être 'CHE' suivi de 9 chiffres",
            }),
        nameUniteLocal: z
            .string({
                required_error: 'Champs requis.',
            }),
        formeJuridique: z
            .string({
                required_error: 'Champs requis.',
            }),
        pays: z
            .string({
                required_error: 'Champs requis.',
            }),
        langue: z
            .string({
                required_error: 'Champs requis.',
            }),
        descriptionActiEconomiques: z
            .string()
            .optional(),
        noga: z
            .string()
            .optional(),

        // Adresse
        npa: z
            .string({
                required_error: 'Champs requis.',
            })
            .min(4, 'NPA non valide.')
            .max(4, 'NPA non valide.'),
        localite: z
            .string({
                required_error: 'Champs requis.',
            }),
        rue: z
            .string({
                required_error: 'Champs requis.',
            }),
        adresseUniteNumero: z
            .string({
                required_error: 'Champs requis.',
            }),
        uniteCasePostaleNumero: z
            .string({
                required_error: 'Champs requis.',
            })
            .optional(),
        uniteCasePostaleNpa: z
            .string({
                required_error: 'Champs requis.',
            })
            .optional(),
        uniteCasePostaleLocalite: z
            .string({
                required_error: 'Champs requis.',
            })
            .optional(),

        // Contact
        numeroTelephone: z
            .union([s1,s2]),
        emailEntreprise: z
            .string({
                required_error: 'Champs requis.',
            })
            .email({
                message: 'Email non valide.'
            }),

        // Autre
        remarque: z
            .optional(),
        attachedFile: z
            .optional()
    }),
]