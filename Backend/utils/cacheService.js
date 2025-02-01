const { createClient } = require('redis');

const client = createClient();
client.connect();

const getCache = async (key) => {
    try {
        return await client.get(key);
    } catch (error) {
        console.error('Redis Get Error:', error);
        return null;
    }
};

const setCache = async (key, value, ttl = 3600) => {
    try {
        await client.setEx(key, ttl, value);
    } catch (error) {
        console.error('Redis Set Error:', error);
    }
};

// Improved `clearCache` using SCAN for large datasets
const clearCache = async (pattern) => {
    try {
        let cursor = 0;
        do {
            const reply = await client.scan(cursor, { MATCH: pattern, COUNT: 100 });
            cursor = reply.cursor;
            if (reply.keys.length) {
                await client.del(reply.keys);
            }
        } while (cursor !== 0);
    } catch (error) {
        console.error('Redis Clear Error:', error);
    }
};

module.exports = { getCache, setCache, clearCache };
