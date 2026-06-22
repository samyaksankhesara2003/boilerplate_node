export const pineconeConfig = {
    apiKey: process.env.PINECONE_API_KEY!,
    index: process.env.PINECONE_INDEX || 'restaurant-menu'
};
