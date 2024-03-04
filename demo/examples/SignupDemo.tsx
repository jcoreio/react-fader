import { Flow } from 'flow-to-typescript-codemod'
import * as React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Fader from '../../src'
import ArrowBack from '@material-ui/icons/ArrowBack'
import ArrowForward from '@material-ui/icons/ArrowForward'
import withStyles from '@material-ui/core/styles/withStyles'
import { useAutofocusRef } from 'react-transition-context'
type Classes = ReturnType<
  <T>(arg1: (theme?: any) => T) => Flow.ObjMap<T, () => string>
>
export type Props = {
  classes: Classes
}

const styles = (theme: any) => ({
  root: {
    margin: '32px auto',
  },
  contentHolder: {},
  backButton: {
    marginTop: 32,
    marginBottom: 8,
  },
  paper: {},
  form: {
    margin: 32,
    [theme.breakpoints.down('xs')]: {
      margin: 16,
    },
    '& button[type="submit"]': {
      alignSelf: 'flex-start',
      marginTop: 32,
    },
  },
  h5: {
    marginBottom: 32,
    '& > em': {
      fontStyle: 'initial',
      fontWeight: 'bold',
      color: theme.palette.primary.main,
    },
  },
})

const SignupDemo = ({ classes }: Props): React.ReactElement => {
  const [step, setStep] = React.useState(0)
  let content
  const Step = steps[step]

  if (Step) {
    content = (
      <Step
        classes={classes}
        onSubmit={(e: Event) => {
          e.preventDefault()
          setStep(step + 1)
        }}
      />
    )
  }

  return (
    <div className={classes.root}>
      <Typography variant="h6">Signup Form Example</Typography>
      <Button
        className={classes.backButton}
        onClick={() => setStep(step - 1)}
        disabled={step <= 0}
      >
        <ArrowBack /> Back
      </Button>
      <div className={classes.contentHolder}>
        <Paper className={classes.paper}>
          <Fader animateHeight>{content}</Fader>
        </Paper>
      </div>
    </div>
  )
}

export default withStyles(styles)(SignupDemo)
type FormProps = {
  classes: Classes
  onSubmit: (e: Event) => any
}

const EmailForm = ({ classes, onSubmit }: FormProps): React.ReactElement => {
  const autofocusRef = useAutofocusRef()
  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <Typography variant="h5" className={classes.h5}>
        <em>Welcome,</em> enter your email address to get started.
      </Typography>
      <TextField
        inputRef={autofocusRef}
        type="text"
        name="email"
        placeholder="Enter email address"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Get Started <ArrowForward />
      </Button>
    </form>
  )
}

const VerificationCodeForm = ({
  classes,
  onSubmit,
}: FormProps): React.ReactElement => {
  const autofocusRef = useAutofocusRef()
  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <Typography variant="h5" className={classes.h5}>
        <em>Next,</em> enter the code we sent to you.
      </Typography>
      <TextField
        inputRef={autofocusRef}
        type="text"
        name="verificationCode"
        label="Verification Code"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Verify
      </Button>
    </form>
  )
}

const OrganizationForm = ({
  classes,
  onSubmit,
}: FormProps): React.ReactElement => {
  const autofocusRef = useAutofocusRef()
  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <Typography variant="h5" className={classes.h5}>
        <em>Success!</em> Next, set up your organization.
      </Typography>
      <TextField
        inputRef={autofocusRef}
        type="text"
        name="name"
        label="Organization Code"
        fullWidth
      />
      <TextField
        type="text"
        name="displayName"
        label="Organization Name"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Continue <ArrowForward />
      </Button>
    </form>
  )
}

const PasswordForm = ({ classes, onSubmit }: FormProps): React.ReactElement => {
  const autofocusRef = useAutofocusRef()
  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <Typography variant="h5" className={classes.h5}>
        <em>Almost Done!</em> Finally, create a password.
      </Typography>
      <TextField
        inputRef={autofocusRef}
        type="password"
        name="password"
        label="Password"
        fullWidth
      />
      <TextField
        type="password"
        name="retypePassword"
        label="Retype Password"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Finish <ArrowForward />
      </Button>
    </form>
  )
}

const DoneForm = ({ classes, onSubmit }: FormProps): React.ReactElement => (
  <div className={classes.form}>
    <Typography variant="h5" className={classes.h5}>
      <em>End of Demo</em>
    </Typography>
  </div>
)

const steps = [
  EmailForm,
  VerificationCodeForm,
  OrganizationForm,
  PasswordForm,
  DoneForm,
]
