import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },

    display: 'flex',
    justifyContent: 'center'
  },
}));

export const Pagin = ({numberPages, setNumberPages}) => {
    const classes = useStyles();

    
    const handleChange = (event, value) => {
      setNumberPages({...numberPages, current: value})
    };

    return (
        <div className={classes.root}>
            <Pagination count={numberPages.all} tabIndex={1} onChange={handleChange} color="primary" />
        </div>
    )
}