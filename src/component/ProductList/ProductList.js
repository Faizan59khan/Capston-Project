import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AdminItems from '../../components/AdminItems'

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

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        
        <AdminItems documents={documents} error={error}/>
        
      </div>
    </div>
  );
};

export default ProductList;
