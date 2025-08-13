export const users = [
  // Sellers
  { uid: 1, username: "farmer_john", email: "john@example.com", phone: "08011110001", role: "seller" },
  { uid: 2, username: "green_agro", email: "greenagro@example.com", phone: "08011110002", role: "seller" },
  { uid: 3, username: "benue_yam", email: "benueyam@example.com", phone: "08011110003", role: "seller" },
  { uid: 4, username: "nassarawa_corn", email: "cornking@example.com", phone: "08011110004", role: "seller" },
  { uid: 5, username: "middlebelt_farms", email: "mbfarms@example.com", phone: "08011110005", role: "seller" },

  // Buyers
  { uid: 6, username: "market_mama", email: "mama@example.com", phone: "08011110006", role: "buyer" },
  { uid: 7, username: "traderjoe", email: "joe@example.com", phone: "08011110007", role: "buyer" },
  { uid: 8, username: "retailmart", email: "retail@example.com", phone: "08011110008", role: "buyer" },
  { uid: 9, username: "citybuyer", email: "citybuyer@example.com", phone: "08011110009", role: "buyer" },
  { uid: 10, username: "bulkfoods_ng", email: "bulk@example.com", phone: "08011110010", role: "buyer" },
];


export const produce = [
  // Grains
  { pid: 1, uid: 2, pname: "Maize", price: 15000, qty: 100, category: "Grains", desc: "Dried yellow maize", time_stamp: "2025-08-12T09:00:00Z" },
  { pid: 2, uid: 4, pname: "Guinea Corn", price: 14000, qty: 80, category: "Grains", desc: "High quality guinea corn", time_stamp: "2025-08-10T12:00:00Z" },
  { pid: 3, uid: 2, pname: "Millet", price: 12000, qty: 90, category: "Grains", desc: "Clean millet grains", time_stamp: "2025-08-11T10:00:00Z" },
  { pid: 4, uid: 1, pname: "Rice (local)", price: 25000, qty: 50, category: "Grains", desc: "Unpolished local rice", time_stamp: "2025-08-09T15:00:00Z" },

  // Tubers
  { pid: 5, uid: 3, pname: "Yam", price: 30000, qty: 60, category: "Tubers", desc: "Benue big yam", time_stamp: "2025-08-08T10:00:00Z" },
  { pid: 6, uid: 3, pname: "Cassava", price: 12000, qty: 100, category: "Tubers", desc: "Fresh cassava tubers", time_stamp: "2025-08-12T11:00:00Z" },
  { pid: 7, uid: 5, pname: "Sweet Potato", price: 10000, qty: 70, category: "Tubers", desc: "Orange-flesh sweet potato", time_stamp: "2025-08-13T09:00:00Z" },

  // Legumes
  { pid: 8, uid: 1, pname: "Soybeans", price: 18000, qty: 90, category: "Legumes", desc: "Organic soybeans", time_stamp: "2025-08-07T14:00:00Z" },
  { pid: 9, uid: 2, pname: "Groundnut", price: 16000, qty: 110, category: "Legumes", desc: "Dry unshelled groundnut", time_stamp: "2025-08-13T10:30:00Z" },
  { pid: 10, uid: 5, pname: "Beans (White)", price: 22000, qty: 100, category: "Legumes", desc: "White Nigerian beans", time_stamp: "2025-08-06T16:00:00Z" },

  // Fruits
  { pid: 11, uid: 4, pname: "Mango", price: 8000, qty: 150, category: "Fruits", desc: "Fresh mangoes in bulk", time_stamp: "2025-08-01T08:00:00Z" },
  { pid: 12, uid: 5, pname: "Orange", price: 7000, qty: 130, category: "Fruits", desc: "Citrus sweet oranges", time_stamp: "2025-08-02T08:30:00Z" },
  { pid: 13, uid: 1, pname: "Pineapple", price: 10000, qty: 60, category: "Fruits", desc: "Juicy pineapples", time_stamp: "2025-08-03T07:45:00Z" },

  // Vegetables
  { pid: 14, uid: 3, pname: "Tomatoes", price: 9000, qty: 100, category: "Vegetables", desc: "Red tomatoes", time_stamp: "2025-08-04T06:00:00Z" },
  { pid: 15, uid: 2, pname: "Pepper", price: 8500, qty: 80, category: "Vegetables", desc: "Hot red peppers", time_stamp: "2025-08-05T10:00:00Z" },
  { pid: 16, uid: 4, pname: "Okra", price: 7500, qty: 70, category: "Vegetables", desc: "Fresh okra", time_stamp: "2025-08-06T08:00:00Z" },

  // Others
  { pid: 17, uid: 5, pname: "Shea Nuts", price: 20000, qty: 40, category: "Others", desc: "Raw shea nuts", time_stamp: "2025-08-07T07:00:00Z" },
  { pid: 18, uid: 1, pname: "Palm Oil", price: 27000, qty: 30, category: "Others", desc: "5L kegs of red palm oil", time_stamp: "2025-08-08T09:00:00Z" },
  { pid: 19, uid: 2, pname: "Honey", price: 15000, qty: 25, category: "Others", desc: "Pure local honey", time_stamp: "2025-08-09T11:00:00Z" },
  { pid: 20, uid: 4, pname: "Bambara Nuts", price: 14000, qty: 50, category: "Legumes", desc: "Local bambara groundnuts", time_stamp: "2025-08-10T13:00:00Z" },
];


export const sales = [
  { sid: 1, pid: 1, price: 15000, qty: 10, sell_to: 6, time_stamp: "2025-08-13T10:00:00Z" },
  { sid: 2, pid: 5, price: 30000, qty: 5, sell_to: 7, time_stamp: "2025-08-13T11:00:00Z" },
  { sid: 3, pid: 8, price: 18000, qty: 8, sell_to: 10, time_stamp: "2025-08-12T09:30:00Z" },
  { sid: 4, pid: 2, price: 14000, qty: 15, sell_to: 8, time_stamp: "2025-08-12T12:00:00Z" },
  { sid: 5, pid: 10, price: 22000, qty: 6, sell_to: 9, time_stamp: "2025-08-11T14:00:00Z" },
  { sid: 6, pid: 13, price: 10000, qty: 10, sell_to: 6, time_stamp: "2025-08-10T15:00:00Z" },
  { sid: 7, pid: 6, price: 12000, qty: 12, sell_to: 7, time_stamp: "2025-08-10T10:00:00Z" },
  { sid: 8, pid: 17, price: 20000, qty: 5, sell_to: 8, time_stamp: "2025-08-09T16:00:00Z" },
  { sid: 9, pid: 4, price: 25000, qty: 7, sell_to: 10, time_stamp: "2025-08-08T17:00:00Z" },
  { sid: 10, pid: 14, price: 9000, qty: 20, sell_to: 9, time_stamp: "2025-08-07T08:00:00Z" },
];


export const reviews = [
  { rid: 1, pid: 1, uid: 6, rating: 5, comment: "Great quality maize, very fresh!", time_stamp: "2025-08-14T10:00:00Z" },
  { rid: 2, pid: 5, uid: 7, rating: 4, comment: "Yam was good but a bit pricey.", time_stamp: "2025-08-14T11:00:00Z" },
  { rid: 3, pid: 8, uid: 10, rating: 5, comment: "Excellent soybeans, will buy again!", time_stamp: "2025-08-13T09:30:00Z" },
  { rid: 4, pid: 2, uid: 8, rating: 3, comment: "Guinea corn was okay but could be better.", time_stamp: "2025-08-13T12:00:00Z" },
  { rid: 5, pid: 10, uid: 9, rating: 4.5, comment: "Beans were fresh and well packaged.", time_stamp: "2025-08-12T14:00:00Z" },
];