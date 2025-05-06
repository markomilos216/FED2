const admin = require('firebase-admin');
const fs = require('fs');
// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
// Load JSON data
const data = JSON.parse(fs.readFileSync('firestoreData.json', 'utf8'));
async function importData() {
// Import categories
if (data.categories) {
    const categoriesCollection = db.collection('categories');
    for (const category of data.categories) {
    const categoryDoc = categoriesCollection.doc(category.id);
    await categoryDoc.set({
        name: category.name,
        escription: category.description,
        createdAt: admin.firestore.Timestamp.fromDate(new Date(category.createdAt)),
        });
}
    console.log('Categories imported!');
}

// Import products
if (data.products) {
    const productsCollection = db.collection('products');
    for (const product of data.products) {
    await productsCollection.add({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        categoryId: product.categoryId,
        imageUrl: product.imageUrl,
        createdAt: admin.firestore.Timestamp.fromDate(new Date(product.createdAt)),
    });
}
    console.log('Products imported!');
}
    console.log('All data imported successfully!');
}
importData().catch(console.error);