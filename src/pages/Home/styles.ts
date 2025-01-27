import styled from "styled-components";

export const HomeContainer = styled.main`
    flex:  1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem;
    }

`

export const FormContainer = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: ${(props) => props.theme['gray-100']};
    font-size: 1.125rem;
    font-weight: bold;
    flex-wrap: wrap;
`

const BaseInput = styled.input`
    background: transparent;

    height: 2.5rem;
    border: 0;
    border-bottom: 2px solid ${(props) => props.theme['gray-500']};
    font-weight: bold;
    font-size: inherit; // propriedade que erda a propriedade do container
    padding: 0 0.5rem;

    color: ${(props) => props.theme['gray-100']};

    &:focus{
        box-shadow: none;
        border-color:  ${(props) => props.theme['green-500']};
    }

    &::placeholder{
        color: ${(props) => props.theme['gray-500']};
    }
`

export const TaskInput = styled(BaseInput)` // utilizando o meu componentes estilizado base
    flex: 1;

    &::-webkit-calendar-picker-indicator{ // retirando a flecha do datalist (de sugestões)
        display: none !important;
    }
`

export const MinutesAmountInput = styled(BaseInput)`
    width: 4rem;
`

export const CountDownContainer = styled.div`
    font-family: 'Roboto Mono', monospace;
    font-size: 10rem;
    line-height: 8rem;
    color: ${(props) => props.theme['gray-100']};

    display: flex;
    gap: 1rem;

    span{
        background: ${(props) => props.theme['gray-700']};
        padding: 2rem 1rem;
        border-radius: 8px;
    }
`

export const Separator = styled.div`
    padding: 2rem 0;
    color: ${(props) => props.theme['green-500']};

    width: 4rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
`

export const BaseCountdownButton = styled.button`
color: ${(props) => props.theme['gray-100']};
    width: 100%;
    border: 0;
    padding: 1rem;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0.5rem;
    font-weight: bold;

    cursor: pointer;

    &:disabled{
        opacity: 0.7;
        cursor: not-allowed;
    }

`

export const StartCountdownButton = styled(BaseCountdownButton)`
    background: ${(props) => props.theme['green-500']};

    &:not(:disabled):hover{ // se não estiver disable, quando fazer o hover
        background: ${(props) => props.theme['green-700']};
    }
`

export const StopCountdownButton = styled(BaseCountdownButton)`
    background: ${(props) => props.theme['red-500']};
    

    &:not(:disabled):hover{ // se não estiver disable, quando fazer o hover
        background: ${(props) => props.theme['red-700']};
    }
`
