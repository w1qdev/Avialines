import {
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    Box
  } from '@chakra-ui/react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import './RegisterPassenger.scss'

const steps = [
    { title: 'Знакомство', description: 'Данные пасажира' },
    { title: 'Рейс', description: 'Выбор рейса' },
    { title: 'Завершение', description: 'Печать билета' },
]


const RegisterPassengerPage = () => {
    
    const [currentStepIndex, setCurrentStepIndex] = useState(0)


    const buttonText = currentStepIndex >= 2 ? "Завершить" : "Продолжить"
    const nextStep = () => setCurrentStepIndex(prev => prev + 1)
    

    return (
        <motion.div 
            className="register-passenger__wrapper"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
        >
            <Stepper index={currentStepIndex}>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepIndicator>
                            <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={<StepNumber />}
                            />
                        </StepIndicator>

                        <Box flexShrink='0'>
                            <StepTitle>{step.title}</StepTitle>
                            <StepDescription>{step.description}</StepDescription>
                        </Box>

                        <StepSeparator />
                    </Step>
                ))}
            </Stepper>
                
            <form className="form">
                <div className="form__item">
                    <div className="form__item__inner"> 
                        <div className="label">Фамилия, Имя и Отчество пассажира</div>
                        <input className='input' type="text" placeholder='Иванов Иван Иванович' />
                    </div>
                    <div className="form__item__inner"> 
                        <div className="label">Введите паспортные данные пассажира</div>
                        <div className="multi">
                            <input className='input ' type="text" placeholder='Серия XXXX' style={{ width: '49%' }} />
                            <input className='input' type="text" placeholder='Номер XXXXXX' style={{ width: '49%' }} />
                        </div>
                    </div>
                </div>
            </form>

            <div className="button__wrapper">
                <button 
                    className="next-step-button"
                    onClick={nextStep}
                    >{buttonText}
                </button>
            </div>
        </motion.div>
    )
}

export default RegisterPassengerPage