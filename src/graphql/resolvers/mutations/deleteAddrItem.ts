import { DB, QueryConfig, APIResponse } from '../../../types';
import { AddressItem, AddressDbItem } from '../../../models';

export async function deleteAddrItem(db: DB, args: any) {
  const { id } = args;

  const query: QueryConfig = {
    text: `DELETE FROM addresses WHERE id = $1 RETURNING *`,
    values: [id],
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
      response.status = 'success';
      response.data = data;
    } else {
      response.status = 'error';
      response.message = 'Record is not found';
    }
  } catch (e) {
    response.status = 'error';
  }

  return response;
}
