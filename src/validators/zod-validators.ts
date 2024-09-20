import * as z from "zod";

export const formSchema = [
    // Step Inscription
    z.object({
        nameUniteLocal: z
        .string().trim().min(1, 'Champs requis.'),

        formeJuridique: z
        .string().trim().min(1, 'Champs requis.'),
    }),

    // Step Responsable
    z.object({       
        responsablePrenom: z
        .string().trim().min(1, 'Champs requis.'),

        responsableNom: z
        .string().trim().min(1, 'Champs requis.'),
    }),
]