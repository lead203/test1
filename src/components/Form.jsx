import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
      minWidth: 275,
      margin: '20px auto',
    },
    input: {
        width: '100%',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

export const Form = ({formValue, setFormValue, addComment}) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <form className={classes.root} onSubmit={addComment} noValidate autoComplete="off">
                    <div>
                        <TextField
                            id="outlined-basic"
                            className={classes.input}
                            label="Name"
                            onChange={e => setFormValue({ ...formValue, name: e.target.value })}
                            variant="outlined" />
                        </div>
                    <div>
                        <TextField
                            id="outlined-basic"
                            className={classes.input}
                            label="Text"
                            onChange={e => setFormValue({ ...formValue, message: e.target.value })}
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <Button variant="contained" type="submit" color="primary" endIcon={<Icon>send</Icon>}>
                            Send
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}