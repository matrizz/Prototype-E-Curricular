import { z } from 'zod'

export type CreateDataSchema = z.infer<typeof createDataSchema>

export const DataFormatter = (formdata: any) => {


    const data: CreateDataSchema = {
        pessoal: {
            nome: formdata['nome'],
            genero: formdata['genero'],
            nascimento: formdata['nascimento'],
            cep: parseInt(formdata['cep']),
            cidade: formdata['cidade'],
            uf: formdata['uf'],
            pais: formdata['pais'],
            celular: formdata['celular'],
            celular2: formdata['celular2'],
            email: formdata['email'],
        },
        educacional: {
            instituto: formdata['instituto'],
            curso: formdata['curso'],
            //@ts-ignore
            inicio: parseInt(formdata['inicio']),
            //@ts-ignore
            fim: parseInt(formdata['fim']),
            idiomas: {
                idiomas: formdata['idiomas'],
                nivel: formdata['nivel'],
            }
        },
        descricao: {
            habilidades: formdata['habilidades'],
            objetivo: formdata['objetivo']
        }
    }
    return data
}

export const DataValidation = (obj: CreateDataSchema) => {
    return createDataSchema.safeParse(obj)
}

const createDataSchema = z.object({
    pessoal: z.object({
        nome: z.string(),
        nascimento: z.string(),
        genero: z.string(),
        cidade: z.string(),
        cep: z.number(),
        uf: z.string(),
        pais: z.string().default('Brasil'),
        celular: z.string(),
        celular2: z.string().optional(),
        email: z.string().email()
    }),
    educacional: z.object({
        instituto: z.string().default('Etec de Itanhaém'),
        curso: z.string(),
        inicio: z.number(),
        fim: z.number(),
        idiomas: z.object({
            idiomas: z.string().optional(),
            nivel: z.string().optional()
        })
    }),
    picture: z.string().optional(),
    descricao: z.object({
        habilidades: z.string(),
        objetivo: z.string()
    })
})
