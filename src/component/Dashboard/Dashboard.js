import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Budget from './components/Budget/Budget'
import TotalUsers from './components/TotalUsers/TotalUsers'
import TasksProgress from './components/TasksProgress/TasksProgress'
import LatestSales from './components/LatestSales/LatestSales'
import UsersByDevice from './components/UsersByDevice/UsersByDevice'
import LatestOrders from './components/LatestOrders/LatestOrders'
import {useCollection} from '../../hooks/useCollection'
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const {documents:userr}=useCollection('users')
  const {documents:order}=useCollection('purchases')
  let totalusers=0;
  let orders;
  let income=0;
  if(userr){totalusers=userr.length;}
  if(order){
    
    orders=order.length
    order.map((orderr)=>income+=orderr.total)
  }

  

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
        justifyContent='space-evenly'
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
         {order &&  <Budget income={income}/>}
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
         {userr && <TotalUsers totalusers={totalusers}/>}
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
         {orders && <TasksProgress orders={orders}/>}
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
        {order &&  <LatestSales documents ={order}/>}
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
       {order &&   <UsersByDevice documents={order}/>}
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          xl={9}
          xs={12}
        >
         {order && <LatestOrders order={order}/>}
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
