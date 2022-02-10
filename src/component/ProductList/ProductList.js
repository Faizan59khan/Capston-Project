import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AdminItems from '../../components/AdminItems'
import {useAuthContext} from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom';
import  ProductCard  from './components/ProductCard/ProductCard';
import { useCollection } from '../../hooks/useCollection'
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const ProductList = () => {
  const classes = useStyles();
  const { documents, error } = useCollection('products')
  const [products] = useState(mockData);
  const navigate=useNavigate();
    
  
  const {user}=useAuthContext();

  useEffect(()=>{
    if(user){
      if(user.email !== "sudofyproject@gmail.com"){
        navigate("/");
      }
    }
    if(!user){
      navigate("/");
    }
  },[user,navigate])

  return (
    <div className={classes.root}>

        
        <AdminItems documents={documents} error={error}/>
        

    </div>
  );
};

export default ProductList;
