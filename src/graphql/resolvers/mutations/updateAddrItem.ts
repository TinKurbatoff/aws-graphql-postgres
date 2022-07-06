import { DB, QueryConfig, APIResponse } from '../../../types';
import { AddressItem, AddressDbItem } from '../../../models';

export async function updateAddrItem(db: DB, args: any) {
  const {
    id,
    item: { content },
  } = args;

  const query: QueryConfig = {
    text: `UPDATE addresses SET formatted_street_address = $2 WHERE id = $1 RETURNING *`,
    values: [id, content],
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
    }
  } catch (e) {
    response.status = 'error';
  }

  return response;
}
