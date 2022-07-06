import { PoolClient, QueryResult, ResultBuilder } from 'pg';
import { connect } from './connect';
import { DB } from '../types/db';

// CommonJS
const { Pool, Client } = require('pg')
require('dotenv').config();
const pool = connect();

export const db: DB = {
  query: async (queryString: string, params: Array<any>, callback: void) => {
    // console.log(queryString)
    console.log(params)
    console.log('————— RUN QUERY! ————')
    return pool.query(queryString, params, callback)
          .then( (res: QueryResult<any>) => {
              // console.log(res.command)
              console.debug(`📬  Executed action ${queryString} OKAY.`)
              return res
              // return res.rows.length? res.rows : [res.command];
              })
          .catch((err: { message: any; }) => {
              console.log(err.message)
              console.log(`⛔️  Query failed: ${queryString} | PARAMS:${params}`)
              // throw err;
              // console.log(err.stack)    
              return [{}];
              })
  },
};
