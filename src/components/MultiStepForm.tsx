import React, { useState } from "react";
import { Box, Button, Card, CardContent, CircularProgress, LinearProgress, Step, StepLabel, Stepper } from "@material-ui/core";
import { Field, Form, Formik, FormikConfig, FormikValues } from "formik";
import { TextField } from "formik-material-ui";
import * as yup from 'yup'
const sleep = (time: any) => new Promise((acc) => setTimeout(acc, time));

export const MultiStepForm = () => {
    return (
        <div>
            <Card>
                <CardContent>
                    <FormikStepper
                        initialValues={{
                            FirstName: "",
                            LastName: "",
                            Email: "",
                            Password: "",
                            DateOfBirth: "",
                          
                        }}
                        onSubmit={async (values) => {
                            await sleep(3000)
                            console.log(values);
                                alert(JSON.stringify(values));
                        }}
                    >
                        <FormikStep label="Personal"
                        validationSchema= {yup.object({
                           FirstName: yup.string().required().max(13,"Name should be less then 13 characters"), 
                           LastName: yup.string().required().max(13,"Name should be less then 13 characters")
                        })}
                        >
                            <Box>
                                <Field
                                    component={TextField}
                                    name="FirstName"
                                    type="text"
                                    label="First Name"
                                /></Box>
                            <Box>
                                <Field
                                    component={TextField}
                                    name="LastName"
                                    type="text"
                                    label="Last Name"
                                /></Box>
                        </FormikStep>
                        <FormikStep label="Account"
                        validationSchema={yup.object({
                            Password: yup.string().required().min(6,"Min 6 chracters")
                        })}>
                            <Box>
                                <Field
                                    component={TextField}
                                    name="Email"
                                    type="email"
                                    label="Email"
                                /></Box>
                            <Box>
                                <Field
                                    component={TextField}
                                    name="Password"
                                    type="password"
                                    label="Password"
                                /></Box>
                        </FormikStep>
                        <FormikStep label="Eligibility">
                            <Box>
                            Date Of Birth <br/><br/>  <Field
                                    component={TextField}
                                    name="DateOfBirth"
                                    type="date"
                                    // label="Date Of Birth"
                                /></Box>
                           
                        </FormikStep>

                    </FormikStepper>
                </CardContent>
            </Card>
        </div>
    )
}
interface formikStepType extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
    label : String
}

export const FormikStep = ({ children }: formikStepType) => {
    return <>{children}</>
}


export const FormikStepper = ({ children, ...props }: FormikConfig<FormikValues>) => {
    const childrenArray = React.Children.toArray(children) as React.ReactElement<formikStepType>[];
    const [step, setstep] = useState(0);
    const currentStep = childrenArray[step];
    return (
        <Formik
            {...props}
            validationSchema= {currentStep.props.validationSchema}
            onSubmit={async (values, action) => {
                if (step == childrenArray.length - 1) {
                    await props.onSubmit(values, action);
                }
                else {
                    setstep((s) => s + 1)
                }
            }
            }
        >
            {({ isSubmitting }) => (<Form>
                <Stepper activeStep={step} alternativeLabel>
        {childrenArray.map((child) => (
          <Step>
            <StepLabel>{child.props.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
       {currentStep}
                { step > 0 ? <Button disabled={isSubmitting}  onClick={() => setstep((s) => s - 1)}>Back</Button> : null}
                <Button disabled={isSubmitting} startIcon={isSubmitting ?  <CircularProgress color="secondary" size="1rem" /> : null} type="submit"> {step == childrenArray.length - 1 ? "Submit" : "Next"}</Button>
            </Form>)}

        </Formik>
    )
}
