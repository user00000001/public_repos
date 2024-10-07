
import PouchDB from "pouchdb-browser";
import PouchdbFind from "pouchdb-find";
PouchDB.plugin(PouchdbFind);
const TestDB = new PouchDB('http://admin:admin@somewhere.domain:30350/testdb');

export default TestDB;

export async function ClearDB() {
  let all_data = await TestDB.allDocs<any>({});
  all_data.rows.map(async (item) => {
    await TestDB.remove(item.key, item.value.rev);
  });
}

export async function GetAll() {
    let all_data = await TestDB.allDocs<any>({
        include_docs: true,
        attachments: true,
      });
    return all_data;
}
