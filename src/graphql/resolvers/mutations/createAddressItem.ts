import { DB, QueryConfig, APIResponse } from '../../../types';
import { AddressItem, AddressDbItem } from '../../../models';

export async function createAddrItem(db: DB, args: any) {
  const {
    item: { content },
  } = args;

  const query: QueryConfig = {
    text: `INSERT INTO addresses(formatted_street_address) VALUES($1) RETURNING *`,
    values: [content],
  };

  const result = await db.query(query);
  const response: APIResponse<AddressItem> = {
    itemsCount: 0,
    status: 'fetching',
  };

  try {
    if (result.rowCount > 0) {
      const data = result.rows.map((item: AddressDbItem) => {
        return {
          id: item.id,
          primiary_line: item.formatted_street_address,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        };
      });
      console.log(data)
      response.status = 'success';
      response.data = data;
    }
  } catch (e) {
    console.error(e)
    response.status = 'error';
  }
  console.log(response)
  return response;
}
