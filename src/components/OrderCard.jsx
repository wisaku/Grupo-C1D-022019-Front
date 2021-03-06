import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));


export default function OrderCard({order}) {
    const classes = useStyles();
    const [ordert, setOrdert] = React.useState(order);

    const statusHandler = () => {
        return (
            <div>
                <Typography variant="body2" style={{ cursor: 'pointer', color:'green' }}>
                    {ordert.status}
                </Typography>
                {ordert.status === 'Accept' ? (
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Typography component="legend">Controlled</Typography>
                            <Rating
                                name="Valoración"
                                onChange={(event, newValue) => {
                                    axios.get((process.env.REACT_APP_API_URL || 'http://localhost:8080') + `/api/orders/valuate?orderId=${order.orderId}&valoration=${newValue}`)
                                        .then(res => {
                                            const newOrder = res.data;
                                            setOrdert(newOrder)})
                                }}
                            />
                        </Box>
                    ) :
                    <div> </div>
                }


            </div>
        )
    };


    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={order.urlImage} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {order.menuName}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Cantidad: {order.cant}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Fecha: {order.date}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" style={{ cursor: 'pointer'}}>
                                    Proveedor: {order.nameProvider}
                                </Typography>
                                {statusHandler()}

                            </Grid>
                        </Grid>
                            <Typography variant="subtitle1">{order.menuPrice}</Typography>
                        <Grid item>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
