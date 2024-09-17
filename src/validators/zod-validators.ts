import * as z from "zod";

export const formSchema = [
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
            }),
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
            .string({
                required_error: 'Champs requis.',
            }),
        emailEntreprise: z
            .string({
                required_error: 'Champs requis.',
            })
            .email({
                message: 'Email non valide.'
            }),

        // Autre
        remarque: z
            .string({
                required_error: 'Champs requis.',
            })
            .optional(),
        attachedFile: z
            .string({
                required_error: 'Champs requis.',
            })
            .optional()
    }).refine(
        data => !!data.descriptionActiEconomiques || !!data.noga,
        'Vous devez remplir au moins un des deux champs.',
    ),

    // Step Responsable
    z.object({

    }),
]