import React,{useState} from 'react';
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
  const { className,documents, ...rest } = props;
  let ff=[];
  let df=[];
  let count=0;
  let documentss=documents.sort((a,b)=>(a.createdAt>b.createdAt)?-1:((b.createdAt>a.createdAt)?1:0))
  const [filter,setFilter]=useState(10);
  let oredrslabel=[]
  for (let xy = 0; xy < filter; xy++) {
    
    oredrslabel.push(xy);
    
  }
  if(documents){
    for(var i=documentss.length-1;i>=0;i--,count++){
      documentss[i].product.map((i)=>{
        if(i.category==="Desi"){df.push(i.price*i.quantity);}
         
        if(i.category==="Fast Food"){ff.push(i.price*i.quantity)}
      })
      if(count===filter){
        break
      }
    }
    
   
  }
 


  const classes = useStyles();


  



const data1 = {
  labels: oredrslabel,
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
        <div >
          <span style={{ marginRight:"10px"}}>No of Past Items:</span>

      <select name="status" style={{ padding:"0px 20px"}}  onChange={(e)=>{setFilter(Number(e.target.value))}}>
      <option value="10">10</option>
      <option value="50">50</option>
      <option value="100">100</option>
      <option value="500">500</option>
      <option value="1000">1000</option>
        </select>
        </div>
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
  )
};

LatestSales.propTypes = {
  className: PropTypes.string
};

export default LatestSales;
