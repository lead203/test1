import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      backgroundColor: '#00BFFF',
      color: '#fff',
      marginBottom: '15px',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
});

export const Messages = ({data}) => {
    const classes = useStyles();

    const name = data.name
    const text = data.text

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {name}
                </Typography>
                <Typography variant="body2" component="p">
                    {text}
                </Typography>
            </CardContent>
        </Card>
    )
}