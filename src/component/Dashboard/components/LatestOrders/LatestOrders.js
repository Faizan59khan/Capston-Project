import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
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
                 confirmed:'warning',
               preparing:'info',
              delivered:'primary',
                 completed:'success'
                 
  

};

const LatestOrders = props => {
  const { className,order, ...rest } = props;
console.log(order)
  const classes = useStyles();
 
  const [orders] = useState(order);
  const {user,location} =useAuthContext();
  const { documents, error }=useCollection("purchases");

  
  const {addDocument, updateDocument,response}=useFirestore("purchases");
  
 
  

 
  const changeStatus= async (value,item,id)=>{  
       //change the status of customer
    let  myst;
    switch (value) {
      case "placed":
          console.log("CC"+value);
          myst=["placed","confirmed","preparing","delivered","completed"]
        break;
        case "confirmed":
          console.log("CC"+value);
          myst=["confirmed","preparing","delivered","completed"]
        break;
        case "preparing":
      
          myst=["preparing","delivered","completed"]
        break;
        case "delivered":

          console.log("DD"+value);
          myst=["delivered","completed"]
        break;
        case "completed":
          myst=["completed"]
        break;
    
    
      default:
        break;
    }
   item.status=myst;
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
                  <TableCell>Email</TableCell>
                  <TableCell >
                   
                        Location
                     
         
                  </TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Change Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.sort((a,b)=>(a.createdAt>b.createdAt)?-1:((b.createdAt>a.createdAt)?1:0)).map(ord => { return(
                  
                  <TableRow
                    hover
                    key={ord.id}
                  >
                    <TableCell>{ord.id}</TableCell>
                    <TableCell>{ord.name}</TableCell>
                    <TableCell>{ord.userEmail}</TableCell>
                    <TableCell>
                      {ord.loc}
                      
                    </TableCell>
                    <TableCell>
                      <div className={classes.statusContainer}>
                        <StatusBullet
                          className={classes.status}
                          color={statusColors[ord.status[0]]}
                          size="sm"
                        /> 
                        {ord.status[0]}
                      
                      </div>
                    </TableCell>
                    <TableCell>
                    <select name="status" id="state"  onChange={(e)=>changeStatus(e.target.value,ord,ord.id)}>
                      {ord.status[0]==="placed" && 
                      <><option value="placed">placed</option>
                      <option value="confirmed">confirmed</option>
                      <option value="preparing">preparing</option>
                      <option value="delivered">delivered</option>
                      <option value="completed">completed</option>
                      </>
                      }
                      {ord.status[0]==="confirmed" && 
                      <>
                      <option value="confirmed">confirmed</option>
                      <option value="preparing">preparing</option>
                      <option value="delivered">delivered</option>
                      <option value="completed">completed</option>
                      </>
                      }
                      {ord.status[0]==="preparing" && 
                      <>
                      <option value="preparing">preparing</option>
                      <option value="delivered">delivered</option>
                      <option value="completed">completed</option>
                      </>
                      }
                      {ord.status[0]==="delivered" && 
                      <>
                      <option value="delivered">delivered</option>
                      <option value="completed">completed</option>
                      </>
                      }
                      {ord.status[0]==="completed" && 
                      <>
                     
                      </>
                      }
                      
                    
                    
                     
                   
                   
                    
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
