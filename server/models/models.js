import sequelize from "../db.js";
import { DataTypes } from "sequelize";

//Модели данных и связи между ними
const User = sequelize.define('user', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	email: {type: DataTypes.STRING, unique: true},
	password: {type: DataTypes.STRING},
	role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Cart = sequelize.define('cart', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const CartItem = sequelize.define('cart_item', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	quantity: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 1}
})

const Item = sequelize.define('item', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING, unique: true, allowNull: false},
	price: {type: DataTypes.INTEGER, allowNull: false},
	rating: {type: DataTypes.FLOAT, defaultValue: 0},
	img: {type: DataTypes.STRING, allowNull: false}
})

const Type = sequelize.define('type', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Manufacturer = sequelize.define('manufacturer', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const ItemInfo = sequelize.define('item_info', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	prop: {type: DataTypes.STRING, allowNull: false},
	description: {type: DataTypes.STRING, allowNull: false}
})

const Rating = sequelize.define('rating', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	rate: {type: DataTypes.INTEGER, allowNull: false}
})

const TypeManufacturer = sequelize.define('type_manufacturer', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);


Type.hasMany(Item);
Item.belongsTo(Type);

Manufacturer.hasMany(Item);
Item.belongsTo(Manufacturer);

Item.hasMany(Rating);
Rating.belongsTo(Item);

Item.hasMany(CartItem);
CartItem.belongsTo(Item);

Item.hasMany(ItemInfo, {as: 'info'});
ItemInfo.belongsTo(Item);

Type.belongsToMany(Manufacturer, {through: TypeManufacturer});
Manufacturer.belongsToMany(Type, {through: TypeManufacturer});

export {
	User, 
	Cart,
	CartItem,
	Item,
	Type,
	Manufacturer,
	ItemInfo,
	Rating,
	TypeManufacturer
}