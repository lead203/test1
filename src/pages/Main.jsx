import React , {useState, useEffect} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import {Form} from '../components/Form'
import {Messages} from '../components/Messages'
import {Pagin} from '../components/Pagin'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

const url = process.env.REACT_APP_API_URL

export const Main = () => {
    const classes = useStyles();

    const [formValue, setFormValue] = useState({
        name: '',
        message: ''
    })

    const [isFetching, setIsFetching] = useState({
        loading: true,
        error: null
    })

    const [dataApi, setDataApi] = useState({})
    const [numberPages, setNumberPages] = useState({
        current: 1,
        event: 'default',
        all: 1
    })

    const addComment = async (e) => {
        e.preventDefault()
        if(formValue.name && formValue.message) {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'charset': 'UTF-8'
                },
                body: JSON.stringify({...formValue})
            });

            // return await response.json();
        }
    }

    const getParamUrl = (url, name) => {
        if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(url))
           return decodeURIComponent(name[1]);
    }

    const fetchComments = async (id) => {
        const response = await fetch(`${url}?page=${id}`);
        const data = await response.json();
        return data
    }

    const loadMore = () => {
        let {current} = numberPages
        current++
        setNumberPages({...numberPages, current, event: 'more'})
    }

    useEffect(() => {
        if(numberPages.event === 'default') {
            fetchComments(numberPages.current)
                .then(data => { 
                    setDataApi(data)
                    setIsFetching({...isFetching, loading: false})
                })
                .catch(err => console.log(err))
        } else if(numberPages.event === 'more') {
            fetchComments(numberPages.current)
                .then(data => {
                    let newData = {...dataApi}
                    newData.data.push(...data.data)

                    setDataApi(newData)
                })
                .catch(err => console.log(err))
        }
        
    }, [numberPages.current])

    useEffect(() => {
        let allPages = getParamUrl(dataApi.last_page_url, 'page')
        setNumberPages({...numberPages, all: +allPages})
    }, [dataApi])

    // {...dataApi.last_page_url && true}
    console.log(dataApi)
    console.log(numberPages.current)

    return (
        <Container maxWidth="sm">
            <Form formValue={formValue} setFormValue={setFormValue} addComment={addComment} />
            {console.log(!dataApi.next_page_url)}
            <div>
                { !isFetching.loading && dataApi.data
                    .map((data, index) => <Messages data={data} index={index} key={index} />)}
                { !isFetching.loading && <div className={classes.container}>
                    <Button onClick={loadMore} disabled={numberPages.current == dataApi.last_page} variant="outlined">More</Button>
                </div> }
                { !isFetching.loading && <Pagin numberPages={numberPages} setNumberPages={setNumberPages} /> }
            </div>
        </Container>
    )
}