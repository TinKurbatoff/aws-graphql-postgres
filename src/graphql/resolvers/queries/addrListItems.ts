import { DB, QueryConfig, APIResponse } from '../../../types';
import { AddressItem, AddressDbItem } from '../../../models';
require('console-stamp')(console, '[HH:MM:ss.l]');


export async function addrListItems(db: DB, args: any) {
  let query: QueryConfig = { text: 'SELECT * FROM addresses WHERE ID = 1;' };
  if (args && args.primary_lane) {
    let params = Object.keys(args);
    console.log(params)
    query = {
      // text: `SELECT * FROM addresses WHERE formatted_street_address LIKE '%' || $1 || '%'`,
      text: `SELECT * FROM addresses WHERE formatted_street_address LIKE $1 || '%'`,
      // text: `SELECT * FROM addresses WHERE formatted_street_address = $1`,
      values: [args?.primary_lane.toUpperCase()],
    };
    // Add other search params
    if (params.length > 1){
      let x = 1;
      for (let param of params) {
        if (param !== 'primary_lane') {
          x++;
          query.text += ` AND ${param} = \$${x}`
          query.values?.push(args[param].toUpperCase())
          }
        }}
  }
  // console.log(`❓ QUERY:${query}`)
  const result = await db.query(query.text, query.values);
  // console.log(result.rows) // ** DEBUG **
  console.log(`✅  Result:${result?.rowCount}`)
  const response: APIResponse<AddressItem[]> = {
    itemsCount: result.rowCount? result.rowCount : 0,
    status: 'fetching',
  };

  try {
    if (result.rowCount > 0) {
      const data = result.rows.map((item: AddressDbItem) => {
        return {
          id: item.id,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          fips: item.fips,
          apn: item.apn,
          street_number: item.street_number,
          street_pre_direction: item.street_pre_direction,
          street_name: item.street_name,
          street_suffix: item.street_suffix,
          street_post_direction: item.street_post_direction,
          unit_type: item.unit_type,
          unit_number: item.unit_number,
          formatted_street_address: item.formatted_street_address,
          primary_lane: item.formatted_street_address,
          city: item.city,
          state: item.state,
          zip_code: item.zip_code,
          zip_plus_four_code: item.zip_plus_four_code,
          latitude: item.latitude,
          longitude: item.longitude,
          geocoding_accuracy: item.geocoding_accuracy,
          census_tract: item.census_tract,
          carrier_code: item.carrier_code
        };
      });
      response.status = 'success';
      response.message = `rows: ${result?.rowCount}`;
      response.data = data;
    }
  } catch (e) {
    response.status = 'error';
  }
  return response;
}
