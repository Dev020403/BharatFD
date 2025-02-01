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

const clearCache = async (pattern) => {
    try {
        const keys = await client.keys(pattern);
        if (keys.length) await client.del(keys);
    } catch (error) {
        console.error('Redis Clear Error:', error);
    }
};

module.exports = { getCache, setCache, clearCache };
