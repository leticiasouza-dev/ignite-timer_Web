import { Play } from "phosphor-react"; // biblioteca de icones

import { useForm } from 'react-hook-form'; // biblioteca para utilizar em formulários

import {zodResolver} from '@hookform/resolvers/zod' // biblioteca para validação de formulários integradas a hook forms
import * as zod from 'zod'

import { HomeContainer, FormContainer,  CountDownContainer, Separator, StartCountdownButton, TaskInput, MinutesAmountInput } from "./styles";
import { useState } from "react";

const newCycleFormValidationShema = zod.object({
    task: zod.string().min(1, 'informe a tarefa'),
    minutesAmount: zod.number().min(5).max(60)
})

type newCycleFormData = zod.infer< typeof newCycleFormValidationShema>

interface Cycle{
    id: string,
    task: string,
    minutesAmount: number
}

export function Home(){
    const [cycles, setCycles] = useState<Cycle[]>([]) // defini o tipo do meu estado e que ele será um array 
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

    const {register, handleSubmit, watch, reset} = useForm <newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationShema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    function handleCreateNewCycle(data: newCycleFormData){
        const id = String( new Date().getTime() )

        const newCycle: Cycle = {
            id,// pegando a data atual e transformando em milisegundo
            task: data.task,
            minutesAmount: data.minutesAmount,
        }

        setCycles((state) => [...state, newCycle ])
        setActiveCycleId(id)

        reset()
    }

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    const task = watch('task') // observando meu campo de task
    const isSubmitDisabled = !task

    return(
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action=""> 
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput 
                        id="task" 
                        type="text" 
                        placeholder="Dê um nome para o seu projeto"
                        list="task-suggest" /* definindo a lista de sugestões */
                        {...register('task')} // definindo um nome para o meu input
                    />

                    <datalist id="task-suggest"> {/*definindo uma lista de sugestões com base no que foi digitada*/}
                        <option value="projeto 1"></option>
                    </datalist>

                    <label htmlFor="minutesAmount"> durante</label>
                    <MinutesAmountInput 
                        type="number" 
                        id="minutesAmount" 
                        placeholder="00" 
                        step={5} // definindo que a cada clique vai ser de 5 em 5
                        min={5} // definindo o valor minimo
                        max={60} // definindo o valor máximo
                        {...register('minutesAmount', {valueAsNumber: true})}  // definindo que o valor digitado é um numero(number)
                    />

                    <span>minutos.</span>
                </FormContainer>
                
           

                <CountDownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountDownContainer>

                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24}/>
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}