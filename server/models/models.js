const sequelize = require("../db")
const {DataTypes} = require("sequelize")

// 1
const User = sequelize.define("user", {
    idUser: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    phoneNumber: {type: DataTypes.BIGINT, allowNull: false, unique:true},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, allowNull: false},
}, {
    timestamps: false,
    tableName: "user"
})
// 2
const OnlineStore = sequelize.define("onlinestore", {
    idStore: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    unpNumber: {type: DataTypes.INTEGER, allowNull: false},
    address: {type: DataTypes.STRING},
}, {
    timestamps: false,
    tableName: "onlinestore"
})
// 3
const Manufacturer = sequelize.define("manufacturer", {
    idManufacturer: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    unpNumberManufacturer: {type: DataTypes.INTEGER, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    idStore: {type: DataTypes.INTEGER, allowNull: false},
}, {
    timestamps: false,
    tableName: "manufacturer"
})
// 4
const Stock = sequelize.define("stock", {
    idStock: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    idSortingCenter: {type: DataTypes.INTEGER, allowNull: false},
    idStore: {type: DataTypes.INTEGER, allowNull: false},
    address: {type: DataTypes.ENUM("Minsk","Grodno","Brest")},
}, {
    timestamps: false,
    tableName: "stock"
})
// 5
const SortingCenter = sequelize.define("sortingcenter", {
    idSortingCenter: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    unpNumberSortingCenter: {type: DataTypes.INTEGER, allowNull: false},
    idStock: {type: DataTypes.INTEGER, allowNull: false},
    address: {type: DataTypes.ENUM("Minsk","Grodno","Brest")},
}, {
    timestamps: false,
    tableName: "sortingcenter"
})
// *6 (M-M)
const SortingCenterCarrier = sequelize.define( "sortingcentercarrier", {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    idCarrier: {type: DataTypes.INTEGER, primaryKey: true},
    idrSortingCenter: {type: DataTypes.INTEGER, primaryKey: true},
}, {
    timestamps: false,
    tableName: "sortingcentercarrier"
})
// 7 carrier
const Carrier = sequelize.define( "carrier", {
    idCarrier: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    unpNumberCarrier: {type: DataTypes.INTEGER, allowNull: false},
    carrierName: {type: DataTypes.STRING},
}, {
    timestamps: false,
    tableName: "carrier"
})
// *8 (M-M)
const CarrierPointOfIssue = sequelize.define( "carrierpointofissue", {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    idOrdersIssuePoint: {type: DataTypes.INTEGER, primaryKey: true},
    idCarrier: {type: DataTypes.INTEGER, primaryKey: true},
}, {
    timestamps: false,
    tableName: "carrierpointofissue"
})
// 9
const OrdersIssuePoint = sequelize.define( "ordersissuepoint", {
    idOrdersIssuePoint: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    unpNumberOrdersIssuePoint: {type: DataTypes.INTEGER, allowNull: false},
    address: {type: DataTypes.STRING},
}, {
    timestamps: false,
    tableName: "ordersissuepoint"
})
// 10
const Order = sequelize.define( "order", {
    idOrder: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    orderNumber: {type: DataTypes.INTEGER, allowNull: false},
    idUser: {type: DataTypes.INTEGER, allowNull: false},
    date: {type: DataTypes.DATE},
    isFinish: {type: DataTypes.TINYINT, defaultValue: 0},
    idOrdersIssuePoint: {type: DataTypes.INTEGER, defaultValue: 1},
    idCarrier: {type: DataTypes.INTEGER, defaultValue: 1},
    idSortingCenter: {type: DataTypes.INTEGER, defaultValue: 2},
    idStore: {type: DataTypes.INTEGER, defaultValue: 1},
    idStock: {type: DataTypes.INTEGER, defaultValue: 1},
    isDelivered: {type: DataTypes.TINYINT, defaultValue: 0},
}, {
    timestamps: false,
    tableName: "order"
})
// *11 (M-M)
const ProductOrder = sequelize.define( "productorder", {
    idProduct: {type: DataTypes.INTEGER, primaryKey: true},
    idOrder: {type: DataTypes.INTEGER, primaryKey: true},
    productCount: {type: DataTypes.INTEGER, allowNull: false},
}, {
    timestamps: false,
    tableName: "productorder"
})
// 12
const Product = sequelize.define( "product", {
    idProduct: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    weight: {type: DataTypes.DOUBLE, allowNull: false},
    size: {type: DataTypes.STRING, allowNull: false},
    idManufacturer: {type: DataTypes.INTEGER, allowNull: false},
    price: {type: DataTypes.DOUBLE, allowNull: false},
    category: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING},
}, {
    timestamps: false,
    tableName: "product"
})
// *13 (M-M)
const ProductStock = sequelize.define( "productstock", {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    idProduct: {type: DataTypes.INTEGER, primaryKey: true},
    idStock: {type: DataTypes.INTEGER, primaryKey: true},
    availableProductCount: {type: DataTypes.INTEGER, allowNull: false},
}, {
    timestamps: false,
    tableName: "productstock"
})


// Order.hasOne(OnlineStore)
// OnlineStore.hasMany(Order)

OnlineStore.hasMany(Order, {foreignKey: "idStore"})
Order.belongsTo(OnlineStore)

User.hasMany(Order, {foreignKey: "idUser"})
Order.belongsTo(User)

Stock.hasMany(Order, {foreignKey: "idStock"})
Order.belongsTo(Stock)

SortingCenter.hasMany(Order, {foreignKey: "idSortingCenter"})
Order.belongsTo(SortingCenter)

Carrier.hasMany(Order, {foreignKey: "idCarrier"})
Order.belongsTo(Carrier)

OrdersIssuePoint.hasMany(Order, {foreignKey: "idOrdersIssuePoint"})
Order.belongsTo(OrdersIssuePoint)

Manufacturer.hasMany(Product, {foreignKey: "idManufacturer"})
Product.belongsTo(Manufacturer)

OnlineStore.hasMany(Manufacturer, {foreignKey: "idStore"})
Manufacturer.belongsTo(OnlineStore)

OnlineStore.hasMany(Stock, {foreignKey: "idStock"})
Stock.belongsTo(OnlineStore)

SortingCenter.hasMany(Stock, {foreignKey: "idSortingCenter"})
Stock.belongsTo(SortingCenter)

Product.belongsToMany(Order, {through: ProductOrder, foreignKey: "idProduct", otherKey: "idOrder"})
Order.belongsToMany(Product, {through: ProductOrder, foreignKey: "idOrder", otherKey: "idProduct"})

Product.belongsToMany(Stock, {through: ProductStock, foreignKey: "idProduct", otherKey: "idStock"})
Stock.belongsToMany(Product, {through: ProductStock, foreignKey: "idStock", otherKey: "idProduct"})

SortingCenter.belongsToMany(Carrier, {through:SortingCenterCarrier, foreignKey: "idrSortingCenter", otherKey: "idCarrier"})
Carrier.belongsToMany(SortingCenter, {through:SortingCenterCarrier, foreignKey: "idCarrier", otherKey: "idrSortingCenter"})

Carrier.belongsToMany(OrdersIssuePoint, {through:CarrierPointOfIssue, foreignKey: "idCarrier", otherKey: "idOrdersIssuePoint"})
OrdersIssuePoint.belongsToMany(Carrier, {through:CarrierPointOfIssue, foreignKey: "idOrdersIssuePoint", otherKey: "idCarrier"})

module.exports = {
    User,
    OnlineStore,
    Manufacturer,
    Stock,
    SortingCenter,
    SortingCenterCarrier,
    Carrier,
    CarrierPointOfIssue,
    OrdersIssuePoint,
    Order,
    ProductOrder,
    Product,
    ProductStock
}
