import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import {useCollection} from '../../../../hooks/useCollection'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import  {data} from './chart';
import  {options}  from './chart';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestSales = props => {
  const { className, ...rest } = props;
  const {documents}=useCollection('purchases');
  let ff=[];
  let df=[];
  if(documents){
    for(var i=documents.length-1,j=0;i>=0;i--,j++){
      documents[i].product.map((i)=>{
        if(i.category==="Desi"){df.push(i.price);console.log("jjjpjjoj");}
         
        if(i.category==="Fast Food"){ff.push(i.price)}
      })
      if(j===100){
        break
      }
    }
  }
 


  const classes = useStyles();




const data1 = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Fast Food",
      data: ff,
      fill: false,
      borderColor: "rgba(75,192,192,1)"
    },
    {
      label: "Desi Food",
      data: df,
      fill: false,
      borderColor: "#742774"
    }
  ]
};



  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
       
        title="Earning"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Line
            data={data1}
           
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          
        </Button>
      </CardActions>
    </Card>
  );
};

LatestSales.propTypes = {
  className: PropTypes.string
};

export default LatestSales;
