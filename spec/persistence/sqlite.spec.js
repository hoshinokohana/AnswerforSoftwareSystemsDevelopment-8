const db = require('../../src/persistence/sqlite');
const fs = require('fs');
const location = process.env.SQLITE_DB_LOCATION || '/etc/todos/todo.db';

const ITEM = {
    id: '7aef3d7c-d301-4846-8358-2a91ec9d6be3',
    name: 'Test',
    completed: false,
};

beforeEach(() => {
    if (fs.existsSync(location)) {
        fs.unlinkSync(location);
    }
});

test('it initializes correctly', async () => {
    await db.init();
});

test('it can store and retrieve items', async () => {
    await db.init();

    await db.storeItem(ITEM);

    const items = await db.getItems();
    expect(items.length).toBe(1);
    expect(items[0]).toEqual(ITEM);
});

test('it can update an existing item', async () => {
    await db.init();

    const initialItems = await db.getItems();
    expect(initialItems.length).toBe(0);

    await db.storeItem(ITEM);

    await db.updateItem(
        ITEM.id,
        Object.assign({}, ITEM, { completed: !ITEM.completed }),
    );

    const items = await db.getItems();
    expect(items.length).toBe(1);
    expect(items[0].completed).toBe(!ITEM.completed);
});

test('it can update an existing item', async () => {
    await db.init();

    await db.storeItem(ITEM);

    console.log('Before update:', ITEM);

    await db.updateItem(
        ITEM.id,
        Object.assign({}, ITEM, { completed: !ITEM.completed }),
    );

    const items = await db.getItems();
    console.log('After update:', items[0]);

    expect(items.length).toBe(1);
    expect(items[0].completed).toBe(!ITEM.completed);
});

const db = require('../../src/persistence/sqlite');

describe('Update functionality', () => {
  test('it updates the completed status of an item', async () => {
    // Step 1: Create a new item
    const newItem = await db.addItem({ name: 'Test Item', completed: false });

    // Step 2: Update the item
    await db.updateItem(newItem.id, { completed: true });

    // Step 3: Retrieve the updated item
    const updatedItem = await db.getItem(newItem.id);

    // Step 4: Assert that the completed status is updated
    expect(updatedItem.completed).toBe(true);
  });
});


test('it can get a single item', async () => {
    await db.init();
    await db.storeItem(ITEM);

    const item = await db.getItem(ITEM.id);
    expect(item).toEqual(ITEM);
});

test('it can remove an existing item', async () => {
    await db.init();
    await db.storeItem(ITEM);

    await db.removeItem(ITEM.id);

    const items = await db.getItems();
    expect(items.length).toBe(0);
});

test('debugging update functionality', async () => {
    await db.init();

    await db.storeItem(ITEM);

    const updatedItem = Object.assign({}, ITEM, { completed: !ITEM.completed });

    await db.updateItem(ITEM.id, updatedItem);

    const retrievedItem = await db.getItem(ITEM.id);

    expect(retrievedItem.completed).toBe(updatedItem.completed);
});


