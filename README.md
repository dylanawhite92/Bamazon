# Bamazon

## Description

Bamazon is a command line interface (CLI) app utilizing Node.js and mySQL. It presents a storefront that can be accessed either as a customer (`bamazonCustomer.js`), or as a manager of the store (`bamazonManager.js`).

The *products* table in the *Bamazon* database:

![Image of products Table]
(screenshots/products1.png)

### Customer View

1. The customer is shown the list of items that are available for sale. The list includes the item ID, product name, and prices.

![Image of Available Products]
(screenshots/itemsavailable.png)

2. They are then met with a prompt of 2 messages. The first asks them the ID of the item they want to buy, and the second asks the quantity. If the quantity in stock is sufficient their order is placed successfully, and they are asked if they would like to make another purchase.

![Image of Purchase]
(screenshots/purchase.png)

3. If the quantity is insufficient, they are asked to modify their order, and then shown the list of available items again.

![Image of Insufficient Quantity]
(screenshots/insufficientquantity.png)

### Manager View

1. The Manager level of the store presents managers with a list of available options.

![Image of Manager Level]
(screenshots/managerlevel.png)

2. **View Products For Sale** lists every available item, just as it would for the customer. However, this includes item ID, product name, prices, and quantities.

3. **View Low Inventory** lists the items that are under a `stock_quantity` count of 25.

![Image of Low Inventory]
(screenshots/lowinventory.png)

4. **Add to Inventory** displays a prompt that allows the manager to add more of any of the current available items to their inventory.

![Image of Add Inventory]
(screenshots/addinventory.png)

5. **Add New Product** allows the manager to create a new item and add it to the store. After adding, it tells the manager the ID of the item they added.

![Image of New Product]
(screenshots/newproduct.png)

6. The database is updated to reflect the new values of both the customer's and the manager's interactions with the store.

![Image of Updated Database]
(screenshots/updateddb.png)

## Installation

This project requires the use of the Node.js packages [Inquirer](https://www.npmjs.com/package/inquirer) and [mySQL](https://www.npmjs.com/package/mysql), as well as [mySQL](https://www.mysql.com/), a mySQL client such as [mySQL Workbench](https://www.mysql.com/products/workbench/), and [MAMP](https://www.mamp.info/en/).

Before running the program, you need to ensure that your database is set up and is already populated with data in `mySQL`. You can do this by running the `schema.sql` in mySQL Workbench or another client of your choice to create both the *Bamazon* database and the *products* table.