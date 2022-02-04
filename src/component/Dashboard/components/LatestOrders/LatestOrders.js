import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useEffect } from 'react/cjs/react.development';
import { useAuthContext } from '../../../../hooks/useAuthContext';
import { useCollection } from '../../../../hooks/useCollection';
import { useFirestore } from '../../../../hooks/useFirestore';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import mockData from './data';
import  StatusBullet  from '../../../../component/StatusBullet/StatusBullet';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const statusColors = {
            placed:'danger',
                 confirm:'warning',
               preparing:'info',
              deliever:'primary',
                 complete:'success'
  

};

const LatestOrders = props => {
  const { className,order, ...rest } = props;

  const classes = useStyles();
 
  const [orders] = useState(order);
  const {user,location} =useAuthContext();
  const { documents, error }=useCollection("purchases");
  console.log(documents);
  if(documents){
    for (let i = 0; i < orders.length; i++) {
     let my =documents[i];
      orders[i]={...my}
      
    }
  }
  const {addDocument, updateDocument,response}=useFirestore("purchases");
  
 
  


  const changeStatus= async (value,item,id)=>{     //change the status of customer
    item.status=value;
    await updateDocument(id,item);
    if(response){
      console.log(response)
    }

}
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
       
        title="Latest Orders"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        Location
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Change Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map(order => { return(
                  
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>
                      {order.loc}
                      
                    </TableCell>
                    <TableCell>
                      <div className={classes.statusContainer}>
                        <StatusBullet
                          className={classes.status}
                          color={statusColors[order.status]}
                          size="sm"
                        /> 
                        {order.status}
                      
                      </div>
                    </TableCell>
                    <TableCell>
                    <select name="status" id="state" defaultValue={order.status} onChange={(e)=>changeStatus(e.target.value,order,order.id)}>
                    <option value="placed">Placed</option>
                    <option value="confirm">Confirm</option>
                    <option value="preparing">Preparing</option>
                    <option value="deliever">Delievered</option>
                    <option value="complete">Completed</option>
                    
                </select>
                </TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
