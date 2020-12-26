import React, { useState } from "react";
import { Box, Button, Card, CardContent, CircularProgress, createStyles, Grid, Icon, LinearProgress, makeStyles, Step, StepConnector, StepIconProps, StepLabel, Stepper, Theme, withStyles } from "@material-ui/core";
import { Field, Form, Formik, FormikConfig, FormikValues } from "formik";
import { TextField } from "formik-material-ui";
import * as yup from 'yup'
import '../App.css'

import PersonIcon from '@material-ui/icons/Person';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import CastForEducationIcon from '@material-ui/icons/CastForEducation';

import clsx from 'clsx';
import { Preview } from "./Preview";


const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
});

function ColorlibStepIcon(props: StepIconProps) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons: { [index: string]: React.ReactElement } = {
        1: <PersonIcon />,
        2: <ContactMailIcon />,
        3: <CastForEducationIcon />,
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        button: {
            marginRight: theme.spacing(1),
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    }),
);


const sleep = (time: any) => new Promise((acc) => setTimeout(acc, time));

export const MultiStepForm = () => {
    return (
        <div className="middle">
            <Card className="size">
                <CardContent>
                    <FormikStepper
                        initialValues={{
                            FirstName: "",
                            LastName: "",
                            AdressLine: "",
                            province:"",
                            Email: "",
                            Password: "",
                            username: "",
                            Age: "",
                            SchoolName: "",
                            CollegeName: "",
                            UniversityName: "",
                            DegreeName: "",

                        }}
                        onSubmit={async (values) => {
                            await sleep(3000)
                            console.log(values);
                            alert(JSON.stringify(values));

                        }}
                    >
                        <FormikStep label="Personal"
                            validationSchema={yup.object({
                                FirstName: yup.string().required().max(13, "Name should be less then 13 characters"),
                                LastName: yup.string().required().max(13, "Name should be less then 13 characters"),
                            })}
                        >
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        component={TextField}
                                        name="FirstName"
                                        type="text"
                                        label="First Name"
                                        id="outlined-secondary"
                                        variant="outlined"
                                        color="secondary"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        component={TextField}
                                        name="LastName"
                                        type="text"
                                        label="Last Name"
                                        id="outlined-secondary"
                                        variant="outlined"
                                        color="secondary"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        component={TextField}
                                        name="province"
                                        type="text"
                                        label="Province"
                                        id="outlined-secondary"
                                        variant="outlined"
                                        color="secondary"
                                        fullWidth
                                    />
                                </Grid>
                               
                                <Grid item xs={12} >
                                    <Field
                                        component={TextField}
                                        name="AdressLine"
                                        type="text"
                                        label="Adress Line"
                                        id="outlined-secondary"
                                        variant="outlined"
                                        color="secondary"
                                        fullWidth
                                    />
                                </Grid>
                                
                              
                            </Grid>
                        </FormikStep>
                        <FormikStep label="Account"
                            validationSchema={yup.object({
                                Password: yup.string().required().min(6, "Min 6 chracters"),
                                age: yup.number().required().min(18, "Only Adults are allowed")
                            })}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        component={TextField}
                                        name="username"
                                        type="text"
                                        label="UserName"
                                        id="outlined-secondary"
                                        variant="outlined"
                                        color="secondary"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        component={TextField}
                                        name="age"
                                        type="number"
                                        label="Age"
                                        id="outlined-secondary"
                                        variant="outlined"
                                        color="secondary"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <Field
                                        component={TextField}
                                        name="Email"
                                        type="email"
                                        label="Email"
                                        id="outlined-secondary"
                                        variant="outlined"
                                        color="secondary"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        component={TextField}
                                        name="Password"
                                        type="password"
                                        label="Password"
                                        id="outlined-secondary"
                                        variant="outlined"
                                        color="secondary"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                            </Grid>


                        </FormikStep>
                        <FormikStep label="Educational Qualification">
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        component={TextField}
                                        name="SchoolName"
                                        type="text"
                                        label="School Name"
                                        id="outlined-secondary"
                                        variant="outlined"
                                        color="secondary"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        component={TextField}
                                        name="CollegeName"
                                        type="text"
                                        label="College Name"
                                        id="outlined-secondary"
                                        variant="outlined"
                                        color="secondary"
                                        fullWidth
                                    />
                                </Grid>
                               
                                <Grid item xs={12}>
                                    <Field
                                        component={TextField}
                                        name="UniversityName"
                                        type="text"
                                        label="University Name"
                                        id="outlined-secondary"
                                        variant="outlined"
                                        color="secondary"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        component={TextField}
                                        name="DegreeName"
                                        type="text"
                                        label="Program/Degree"
                                        id="outlined-secondary"
                                        variant="outlined"
                                        color="secondary"
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                        </FormikStep>

                    </FormikStepper>
                </CardContent>
            </Card>
        </div>
    )
}
interface formikStepType extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
    label: String
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
            validationSchema={currentStep.props.validationSchema}
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
                <Stepper alternativeLabel activeStep={step} connector={<ColorlibConnector />}>
                    {childrenArray.map((child) => (
                        <Step>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{child.props.label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {currentStep}
                <br />
                <br />
                { step > 0 ? <Button disabled={isSubmitting} onClick={() => setstep((s) => s - 1)}  variant="contained"
                    color="primary">Back</Button> : null} &nbsp;
                <Button disabled={isSubmitting} startIcon={isSubmitting ? <CircularProgress color="secondary" size="1rem" /> : null} type="submit"
                 variant="contained"
                    color="primary"
                    endIcon={<Icon>send</Icon>}> {step == childrenArray.length - 1 ? "Submit" : "Next"}</Button>
            </Form>)}

        </Formik>
    )
}
