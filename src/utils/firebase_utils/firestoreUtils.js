export const getDocsFromCollection = collection => collection.docs || [];
export const getRefIdFromDoc = doc => doc.ref.id || '';
export const getDataFromDoc = doc => doc.data() || {};
