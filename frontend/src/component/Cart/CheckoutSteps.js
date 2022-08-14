import { AccountBalance, LibraryAddCheck, LocalShipping } from '@mui/icons-material'
import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import "./CheckoutSteps.css"

const CheckoutSteps = ({activeStep}) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShipping />
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheck />
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalance />
        }
    ]

    const stepStyles = {
        boxSizing: "border-box",
    }

  return (
    <Fragment>
        <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
            {
                steps.map((item,index) => (
                    <Step   active={activeStep === index ? true : false}
                    completed={activeStep >= index ? true : false}
                        key={index}>
                            <StepLabel  style={{
                                color: activeStep >= index ? "teal" : "rgba(0, 0, 0, 0.649)",
                            }}
                             icon={item.icon}>
                                {item.label}
                            </StepLabel>
                        </Step>
                ))
            }
        </Stepper>

    </Fragment>
  )
}

export default CheckoutSteps