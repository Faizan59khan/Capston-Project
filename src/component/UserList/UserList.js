import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import  UsersTable  from './components/UsersTable/UsersTable';
import {useCollection} from '../../hooks/useCollection'
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();
const {documents}=useCollection('users')
  const [users] = useState(mockData);
if(documents){
  console.log(documents);
  console.log(documents.sort())
}
  return (
    <div className={classes.root}>
      <div className={classes.content}>
       {documents && <UsersTable users={documents} />}
      </div>
    </div>
  );
};

export default UserList;
