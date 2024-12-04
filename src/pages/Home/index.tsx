import { Play } from "phosphor-react";

import { HomeContainer, FormContainer,  CountDownContainer, Separator, StartCountdownButton, TaskInput, MinutesAmountInput } from "./styles";

export function Home(){
    return(
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput 
                        id="task" 
                        type="text" 
                        placeholder="Dê um nome para o seu projeto"
                        list="task-suggest" /* definindo a lista de sugestões */
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

                <StartCountdownButton disabled type="submit">
                    <Play size={24}/>
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}