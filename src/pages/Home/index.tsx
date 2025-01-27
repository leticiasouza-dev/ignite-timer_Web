import { HandPalm, Play } from "phosphor-react"; // biblioteca de icones

import { useForm } from 'react-hook-form'; // biblioteca para utilizar em formulários

import {zodResolver} from '@hookform/resolvers/zod' // biblioteca para validação de formulários integradas a hook forms
import * as zod from 'zod'

import { HomeContainer, FormContainer,  CountDownContainer, Separator, StartCountdownButton, TaskInput, MinutesAmountInput, StopCountdownButton } from "./styles";
import { useEffect, useState } from "react";
import {differenceInSeconds} from 'date-fns'

const newCycleFormValidationShema = zod.object({
    task: zod.string().min(1, 'informe a tarefa'),
    minutesAmount: zod.number().min(5).max(60)
})

type newCycleFormData = zod.infer< typeof newCycleFormValidationShema>

interface Cycle{
    id: string,
    task: string,
    minutesAmount: number
    startDate: Date
    interrupDate?: Date 
}

export function Home(){
    const [cycles, setCycles] = useState<Cycle[]>([]) // defini o tipo do meu estado e que ele será um array 
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed,] = useState(0);

    const {register, handleSubmit, watch, reset} = useForm <newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationShema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    useEffect(() => {
        let interval: number;

        if(activeCycle){
            interval = setInterval(() => {
                setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate))
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }

    }, [activeCycle])



    function handleCreateNewCycle(data: newCycleFormData){
        const id = String( new Date().getTime() )

        const newCycle: Cycle = {
            id,// pegando a data atual e transformando em milisegundo
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        setCycles((state) => [...state, newCycle ])
        setActiveCycleId(id)
        setAmountSecondsPassed(0)

        reset()
    }

    function handleInterruptCycle(){
        

        setCycles(
            cycles.map(cycle => {
                if(cycle.id === activeCycleId){
                    return {...cycle, interrupDate: new Date()}
                } else {
                    return cycle
                }
        }))  

        setActiveCycleId(null)
    }
    

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secundsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0');
    const secunds = String(secundsAmount).padStart(2, '0')

    useEffect(() => {
        if(activeCycle){
            document.title = `${minutes}:${minutes}`
        }
        
    }, [minutes, secunds, activeCycle])

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
                        disabled={!!activeCycle}
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
                        disabled={!!activeCycle}
                        {...register('minutesAmount', {valueAsNumber: true})}  // definindo que o valor digitado é um numero(number)
                    />

                    <span>minutos.</span>
                </FormContainer>
                
           

                <CountDownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{secunds[0]}</span>
                    <span>{secunds[1]}</span>
                </CountDownContainer>

                {activeCycle ? (
                    <StopCountdownButton onClick={handleInterruptCycle} type="button">
                        <HandPalm size={24}/>
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24}/>
                        Começar
                    </StartCountdownButton>
                )}

                
            </form>
        </HomeContainer>
    )
}